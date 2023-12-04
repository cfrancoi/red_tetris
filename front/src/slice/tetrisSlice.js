import { createSlice } from '@reduxjs/toolkit';

export const defaultHeight = 20;
export const defaultWidth = 10;


export const ERoomStatus = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  PAUSED: 2,
  GAME_OVER: 3,
};

/**
 * * * UTILS * * *
 */

function updateGameGrid(gameGrid, currentPiece, newPieceGrid, fixed = false) {
  if (currentPiece.position) {


    // Récupérez la position de la pièce en cours
    const { x, y } = currentPiece.position;

    const target = previewPieceDrop(gameGrid, currentPiece);


    // Parcourez la grille du jeu
    gameGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Effacez les cellules où fixed est false (ancienne pièce)
        if (!cell.fixed) {
          gameGrid[rowIndex][colIndex] = { type: '', fixed: false };
        }

        if (cell.preview) {
          gameGrid[rowIndex][colIndex] = { ...gameGrid[rowIndex][colIndex], preview: false };
        }

        // Vérifiez si la cellule correspond à la pièce en cours et qu'elle est remplie
        if (newPieceGrid[rowIndex - y] && newPieceGrid[rowIndex - y][colIndex - x]) {
          // Mettez à jour la cellule dans la grille du jeu
          gameGrid[rowIndex][colIndex] = {
            type: newPieceGrid[rowIndex - y][colIndex - x],
            fixed: fixed,
          };
        }
        if (newPieceGrid[rowIndex - target.y] && newPieceGrid[rowIndex - target.y][colIndex - target.x]) {
          // Mettez à jour la cellule dans la grille du jeu
          gameGrid[rowIndex][colIndex] = {
            ...gameGrid[rowIndex][colIndex],
            preview: true
          };
        }
      });
    });
  }
}

function printShadowBoard(grid, shadowBoardGrid) {
  grid.forEach((line, lineIndex) => {

    line.forEach((cell, cellIndex) => {

      if (!cell.fixed) {
        grid[lineIndex][cellIndex] = { type: '', fixed: false };
      }

      if (shadowBoardGrid[cellIndex] === lineIndex) {
        grid[lineIndex][cellIndex] = { type: 'L' }
      }
    })
  })
}



function previewPieceDrop(gameGrid, currentPiece) {
  const { x, y } = currentPiece.position;

  const grid = [...currentPiece.grid]
  let target = { dist: gameGrid.length + 1 }

  grid.forEach((line, lineIndex) => {
    line.forEach((cell, cellIndex) => {
      if (cell) {
        for (let i = lineIndex + y; i < (gameGrid.length); i++) {
          if (gameGrid[i]) {
            let currentCell = gameGrid[i][cellIndex + x];

            if (currentCell?.fixed || i + 1 === gameGrid.length) {
              const distance = (i - lineIndex - y) - (currentCell?.fixed ? 1 : 0)
              if ((distance < target.dist)) {
                target = { dist: distance, y: lineIndex, x: cellIndex };
              }
            }
          }
        }
      }
    })
  })

  if (target) {
    target = {
      // x: (x - (currentPiece.grid[0].length - target.x)),
      x: x,
      y: y + target.dist
    };
  }

  return target;
}

function getPlayer(players, id) {
  return players.find(p => p.id === id);
}

const tetrisSlice = createSlice({
  name: "tetris",
  initialState: {
    roomId: null,
    gameState: null,
    options: {
      height: defaultHeight,
      width: defaultWidth
    },
    players: [

    ]
  },
  reducers: {
    updatePiece: (state, action) => {
      if (action.payload.playerId !== undefined && action.payload.playerId !== null) {
        let player = getPlayer(state.players, action.payload.playerId);

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
          grid: null,
        }
      })

      const result = state.players.concat(toAdd);

      state.players = result;
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(p => p.id !== action.id);
    },
    changeGameState: (state, action) => {
      state.gameState = action.gameState;
    },
    reset: () => {
      return {
        players: [],
        options: {
          height: defaultHeight,
          width: defaultWidth
        }
      };
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
          player.grid[i] = new Array(player.grid[i].length).fill({ type: 'f', fixed: true });

      }
    },
    printShadowBoard: (state, action) => {
      const shadowboard = action.payload.shadowboard;
      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);


      printShadowBoard(player.grid, shadowboard);

    },
    setGameResult: (state, action) => {
      state.result = action.result;
    },
    changePseudo: (state, action) => {

      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      if (player) {
        player.name = action.payload.name;
      }
    }
  }

})

export default tetrisSlice;

function downOneLine(index, grid) {
  // Vérifier si l'index de la ligne est valide
  if (index < 0 || index >= grid.length) {
    console.error('Index de ligne invalide.');
    return;
  }

  // Descendre chaque élément au-dessus de la ligne spécifiée

  for (let i = index - 1; i >= 0; i--) {
    grid[i + 1] = grid[i];
  }

  grid[0] = Array(grid[0].length).fill({ type: '', fixed: false });
}