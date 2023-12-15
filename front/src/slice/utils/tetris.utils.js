
export function getPlayer(players, id) {
    return players.find(p => p.id === id);
}


/**
 * redraw game grid with current piece
 * @param {*} gameGrid 
 * @param {*} currentPiece 
 * @param {*} newPieceGrid 
 * @param {*} fixed 
 */
export function updateGameGrid(gameGrid, currentPiece, newPieceGrid, fixed = false) {
    if (currentPiece.position) {
        // Récupérez la position de la pièce en cours
        const { x, y } = currentPiece.position;

        const target = getPreviewPieceDrop(gameGrid, currentPiece);


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

/**
 * Get preview position of a piece
 * @param {*} gameGrid 
 * @param {*} currentPiece 
 * @returns 
 */
export function getPreviewPieceDrop(gameGrid, currentPiece) {
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


export function drawShadowBoard(grid, shadowBoardGrid) {
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

export function downOneLine(index, grid) {
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
