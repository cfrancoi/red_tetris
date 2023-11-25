import { createSlice, current } from '@reduxjs/toolkit';

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
      {
        score: 0,
        currentPiece: {
          position: { x: 0, y: 0 },
          grid: null,
        },
        grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({}))
      },
    ]
  },
  reducers: {
    /**
     * Si aucun playerIndex alors pour tout les joueurs. 
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
        console.log("line = ", line);
        player.grid[line].fill({})
      })

    },
    downGrid: (state, action) => {

      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      const lines = action.payload.listBreakline;

      lines.forEach(line => {
        console.log("line = ", line);
        downOneLine(line, player.grid);
      })
    },
    freezeLine: (state, action) => {
      const line = action.payload.index;
      const playerId = action.payload.playerId;

      let player = getPlayer(state.players, playerId);

      console.log("line = ", line);
      player.grid[line].fill({ type: 'f', fixed: true });
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