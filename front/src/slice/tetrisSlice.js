import { createSlice, current } from '@reduxjs/toolkit';
import { I_TETROMINO, L_TETROMINO } from '../components/tetris/tetrominos-constant.js';

const defaultHeight = 20;
const defaultWidth = 10;


export const ERoomStatus = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  PAUSED: 2,
  GAME_OVER: 3,
};

/**
 * * * UTILS * * *
 */

function rotateMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotatedMatrix = [];

  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = rows - 1; j >= 0; j--) {
      newRow.push(matrix[j][i]);
    }
    rotatedMatrix.push(newRow);
  }

  return rotatedMatrix;
}

function updateGameGrid(gameGrid, currentPiece, newPieceGrid, fixed = false) {
  if (currentPiece.position) {
    // Récupérez la position de la pièce en cours
    const { x, y } = currentPiece.position;

    // Parcourez la grille du jeu
    gameGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Effacez les cellules où fixed est false (ancienne pièce)
        if (!cell.fixed) {
          gameGrid[rowIndex][colIndex] = { type: '', fixed: false };
        }

        // Vérifiez si la cellule correspond à la pièce en cours et qu'elle est remplie
        if (newPieceGrid[rowIndex - y] && newPieceGrid[rowIndex - y][colIndex - x]) {
          // Mettez à jour la cellule dans la grille du jeu
          gameGrid[rowIndex][colIndex] = {
            type: newPieceGrid[rowIndex - y][colIndex - x],
            fixed: fixed,
          };
        }
      });
    });
  }
}

/**
 *  MOVE CHECK //TODO
*/

function canMoveDown(grid, currentPiece) {
  return true;
}

function canMoveLeft(grid, currentPiece) {
  return (currentPiece.position.x && currentPiece.position.x > 0);
}

function canMoveRight(grid, currentPiece) {
  return true
}

function getPlayer(players, id) {
  return players.find(p => p.id === id);
}

const tetrisSlice = createSlice({
  name: "tetris",
  initialState: {
    roomId: null,
    gameState: ERoomStatus.NOT_STARTED,
    options: {
      height: defaultHeight,
      width: defaultWidth
    },
    players: [
      {
        score: 0,
        currentPiece: {
          position: { x: 0, y: 0 },
          grid: L_TETROMINO,
        },
        grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({}))
      },
    ]
  },
  reducers: {
    /**
     * Si aucun playerIndex alros pour tout les joueurs. 
     */
    moveDown: (state, action) => {
      console.log(action);
      if (action.payload.playerId !== undefined && action.payload.playerId !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (canMoveDown(player.grid, player.currentPiece)) {

          player.currentPiece.position = { x: player.currentPiece.position.x, y: player.currentPiece.position.y + 1 };

          updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);

        }
      }
      else {
        state.players.forEach(player => {
          if (canMoveDown(player.grid, player.currentPiece)) {

            player.currentPiece.position = { x: player.currentPiece.position.x, y: player.currentPiece.position.y + 1 };

            updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);
          }
        })
      }
    },
    moveLeft: (state, action) => {
      if (action.payload.playerIndex !== undefined || action.payload.playerIndex !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (canMoveLeft(player.grid, player.currentPiece)) {

          player.currentPiece.position = { x: player.currentPiece.position.x - 1, y: player.currentPiece.position.y };

          updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);

          console.log(current(player.currentPiece));
        }
      }
    },
    moveRight: (state, action) => {
      if (action.payload.playerIndex !== undefined || action.payload.playerIndex !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (canMoveRight(player.grid, player.currentPiece)) {

          player.currentPiece.position = { x: player.currentPiece.position.x + 1, y: player.currentPiece.position.y };

          updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);

          console.log(current(player.currentPiece));
        }
      }

    },
    rotatePiece: (state, action) => {
      if (action.payload.playerIndex !== undefined || action.payload.playerIndex !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (player.currentPiece) {
          const { grid } = player.currentPiece;
          const newGrid = rotateMatrix(grid); // Appel à une fonction de rotation

          player.currentPiece.grid = newGrid;

          updateGameGrid(player.grid, player.currentPiece, newGrid, false);
        }
      }
    },
    updatePiece: (state, action) => {
      if (action.payload.playerId !== undefined || action.payload.playerId !== null) {
        let player = getPlayer(state.players, action.payload.playerId);
        if (player.currentPiece) {

          player.currentPiece.grid = action.payload.piece.grid;

          updateGameGrid(player.grid, player.currentPiece, action.payload.piece.grid, false);
        }
      }
    },
    blockPiece: (state, action) => {

      let player = getPlayer(state.players, action.payload.playerId);
      updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, true);

      player.currentPiece = null;
    },
    newPiece: (state, action) => { //TODO add new piece to payload

      let player = getPlayer(state.players, action.payload.playerId);

      if (!player.currentPiece) {

        player.currentPiece = {
          position: action.payload.position,
          grid: action.payload.tetromino,
        }

        updateGameGrid(player.grid, player.currentPiece, player.currentPiece.grid, false);
      }
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
      return ({ ...state, roomId: action.id })
    },
    addPlayerToRoom: (state, action) => {
      let toAdd = action.players.filter(player => player || player?.id);
      toAdd = toAdd.filter(item1 => !state.players.some(item2 => item2.id === item1.id));


      toAdd.forEach(p => {
        p.grid = Array.from(Array(state.options.height), () => new Array(state.options.width).fill({}))
        p.currentPiece = null;
        p.score = 0;
        p.currentPiece = {
          position: { x: 0, y: 0 },
          grid: L_TETROMINO,
        }
      })

      const result = state.players.concat(toAdd);
      console.log(result);
      console.log(toAdd);

      state.players = result;
    },
    changeGameState: (state, action) => {
      state.gameState = action.gameState;
    }
  }
})


export default tetrisSlice;