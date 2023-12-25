import { createSlice } from '@reduxjs/toolkit';
import { downOneLine, drawShadowBoard, getPlayer, updateGameGrid } from './utils/tetris.utils';
import { freezeCell } from './utils/cell.constant';

export const defaultHeight = 20;
export const defaultWidth = 10;
export const ERoomStatus = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  PAUSED: 2,
  GAME_OVER: 3,
};

export const initialState = {
  roomId: null,
  gameState: null,
  players: [],
  options: {
    height: defaultHeight,
    width: defaultWidth
  }
}


/**
 * //TODO add inGame (bool) to each player to differentiate between players joining in current game
 */
const tetrisSlice = createSlice({
  name: "tetris",
  initialState: initialState,
  reducers: {
    updatePiece: (state, action) => {
      if (action.payload.playerId !== undefined && action.payload.playerId !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (!player) {
          return;
        }
        player.currentPiece = action.payload.piece;
        updateGameGrid(player.grid, player.currentPiece, action.payload.piece.grid, action.payload.fixed);
      }
    },
    blockPiece: (state, action) => {
      let player = getPlayer(state.players, action.payload.playerId);
      updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, true);

      player.currentPiece = null;
    },
    newPiece: (state, action) => {

      let player = getPlayer(state.players, action.payload.playerId);
      // if (!player.currentPiece) {

      player.currentPiece = {
        position: action.payload.position,
        grid: action.payload.tetromino,
      }

      player.nextPiece = action.payload.nextPiece;

      updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);
      // }
    },

    /**
     *  SCORE
    */
    addScore: (state, action) => {
      if (action.payload.playerIndex !== undefined || action.payload.playerIndex !== null) {
        let player = getPlayer(state.players, action.payload.playerId);

        player.score += 1;
      }
    },
    setRoomId: (state, action) => {
      return ({ ...state, roomId: action.payload.id })
    },
    addPlayerToRoom: (state, action) => {
      let toAdd = action.payload.players.filter(player => player || player?.id);

      toAdd = toAdd.filter(item1 => !state.players.some(item2 => item2.id === item1.id));

      toAdd.forEach(p => {
        p.grid = Array.from(Array(state.options.height), () => new Array(state.options.width).fill({}))
        p.score = 0;
        p.currentPiece = {
          position: { x: 0, y: 0 },
          grid: null,
        }
      })

      const result = state.players.concat(toAdd);

      state.players = result;
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(p => p.id !== action.payload.playerId);
    },
    setGameState: (state, action) => {
      state.gameState = action.payload.gameState;
    },
    reset: () => {
      return initialState;
    },
    resetGrid: (state) => {
      state.players?.forEach(p => p.grid = Array.from(Array(state.options.height), () => new Array(state.options.width).fill({}))
      )
    },
    breakLine: (state, action) => {
      console.log("action = ", action);
      const lines = action.payload.listBreakline;
      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      lines.forEach(line => {
        player.grid[line].fill({})
      })

    },
    downGrid: (state, action) => {

      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      const lines = action.payload.listBreakline;

      lines.forEach(line => {
        downOneLine(line, player.grid);
      })
    },
    freezeLine: (state, action) => {
      const nbLine = action.payload.nbLine;
      const playerId = action.payload.playerId;
      const freezeLineIdx = action.payload.freezeLineIdx;

      let player = getPlayer(state.players, playerId);
      if (nbLine) {
        for (let i = 0; i < freezeLineIdx; i++)
          player.grid[i] = player.grid[i + nbLine];
        for (let i = freezeLineIdx; i < freezeLineIdx + nbLine; i++)
          player.grid[i] = new Array(player.grid[i].length).fill(freezeCell);

      }
    },
    updateShadowBoard: (state, action) => {
      const shadowboard = action.payload.shadowboard;
      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      drawShadowBoard(player.grid, shadowboard);
    },
    setGameResult: (state, action) => {
      if (action.payload?.result)
        state.result = action.payload.result;
    },
    setPlayerName: (state, action) => {
      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      if (player && action.payload.name) {
        player.name = action.payload.name;
      }
    }
  }

})

export const {
  updatePiece,
  blockPiece,
  newPiece,
  addScore,
  setRoomId,
  addPlayerToRoom,
  removePlayer,
  setGameState,
  setGameResult,
  changeGameState,
  reset,
  resetGrid,
  breakLine,
  downGrid,
  freezeLine,
  updateShadowBoard,
  setPlayerName
} = tetrisSlice.actions;

export default tetrisSlice;

