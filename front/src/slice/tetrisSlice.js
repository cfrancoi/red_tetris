import { createSlice, current } from '@reduxjs/toolkit';
import { I_TETROMINO, L_TETROMINO } from '../components/tetris/tetrominos-constant.js';

const defaultHeight = 20;
const defaultWidth = 10;

// function draw(table, pos, color, tetromino) {
//     let x = pos.x;
//     let y = pos.y;
//     console.log(table.length)
//     console.log(tetromino[0].length)



//     for(let b = 0; b < tetromino.length; b++) {

//       for (let a = 0; tetromino[b].length > a; a++) {
        
//         if ( x < table.length && y < table[x].length) {
//           table[x][y].type = tetromino[b][a];
//         }
//         y++;
//       }
//       y = pos.y;
//       x++;
//     }

//     // return table;
//   }



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
  // return (currentPiece.position.x < grid[0].lenght - 1);
}

const tetrisSlice = createSlice({
    name: "tetris",
    initialState: {
        currentPiece: {
          position: { x:0, y:0 },
          grid: L_TETROMINO,
        },
        grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({}))
    },
    reducers: {
        moveDown: (state, action) => {
          if (canMoveDown(state.grid, state.currentPiece)) {
            
            state.currentPiece.position = { x: state.currentPiece.position.x, y: state.currentPiece.position.y + 1};

            updateGameGrid(state.grid, state.currentPiece, state.currentPiece.grid, false);

            console.log(current(state.currentPiece));
          }

        },
        moveLeft: (state, action) => {
          if (canMoveLeft(state.grid, state.currentPiece)) {
            
            state.currentPiece.position = { x: state.currentPiece.position.x -1, y: state.currentPiece.position.y};

            updateGameGrid(state.grid, state.currentPiece, state.currentPiece.grid);

            console.log(current(state.currentPiece));
          }

        },
        moveRight: (state, action) => {
          if (canMoveRight(state.grid, state.currentPiece)) {
            
            state.currentPiece.position = { x: state.currentPiece.position.x + 1, y: state.currentPiece.position.y};

            updateGameGrid(state.grid, state.currentPiece, state.currentPiece.grid);

            console.log(current(state.currentPiece));
          }

        },
        moveTetromino : (state, action) => {
          state.pos = action.payload.pos

          return state
        },
        rotatePiece: (state, action) => {
          if (state.currentPiece) {
            const { grid } = state.currentPiece;
            const newGrid = rotateMatrix(grid); // Appel à une fonction de rotation
    
            // Mettez à jour la grille de la pièce en cours avec la nouvelle grille pivotée
            state.currentPiece.grid = newGrid;
    
            // Utilisez la fonction réutilisable pour mettre à jour la grille du jeu
            updateGameGrid(state.grid, state.currentPiece, newGrid, false);
          }
        }
    }
})


export default tetrisSlice;