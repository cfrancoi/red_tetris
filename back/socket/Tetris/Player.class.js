const L_TETROMINO = [
    [0, 'L', 0],
    [0, 'L', 0],
    [0, 'L', 'L'],
]

module.exports = class TetrisPlayer {

    socket;
    tetrominos = [];

    constructor(socket, options) {
        this.grid = []; // Represents the game board (e.g., a 2D array)
        this.currentPiece = {
            position: { x: 0, y: 0 },
            grid: L_TETROMINO,
        }; // The currently falling Tetrimino
        this.score = 0;
        this.gameOver = false;
        this.socket = socket;
        this.initializeBoard(options.height, options.width);
    }

    initializeBoard(rows, columns) {
        // Initialize the board with empty cells
        this.grid = Array.from({ length: rows }, () => Array(columns).fill({ type: '', fixed: false }));

    }

    // Spawn a new Tetrimino
    spawnNewPiece(generateSequence) {
        if(!this.tetrominos.length)
            generateSequence();

        this.currentPiece = {
            grid: this.tetrominos[0],
            position: { x: 0, y: 0 }
        }
        this.tetrominos = this.tetrominos.splice(1);
        console.log("tertrominos=" , this.tetrominos);
        console.log("currentPiece=" , this.currentPiece);

      //  console.log("currentpiece =",this.currentPiece);
        return this.currentPiece;
    }

    canDrop() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x, y: this.currentPiece.position.y + 1 } });
    }

    canMoveRight() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x + 1, y: this.currentPiece.position.y } });
    }

    canMoveLeft() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x - 1, y: this.currentPiece.position.y } });
    }

    canBePlace(newPieceGrid) {
        return !this.handleCollision(this.grid, { grid: newPieceGrid, position: { x: this.currentPiece.position.x, y: this.currentPiece.position.y } });
    }

    // Move the current Tetrimino
    move(direction) {
        // Implement logic to move the Tetrimino left or right
        if (!this.currentPiece)
            return;

        if (direction === 'down') {

            if (this.canDrop()) {
                this.currentPiece.position = { ...this.currentPiece.position, y: this.currentPiece.position.y + 1 }
                const isFixed = false;
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);
                return { ...this.currentPiece, isFixed: isFixed };
            }
            else {
                const isFixed = !this.canDrop();
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);
                return { ...this.currentPiece, isFixed: isFixed };
            }
        }

        if (direction === 'right') {

            if (this.canMoveRight()) {
                this.currentPiece.position = { ...this.currentPiece.position, x: this.currentPiece.position.x + 1 }
                const isFixed = false;
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);
                return { ...this.currentPiece, isFixed: isFixed };
            }
        }

        if (direction === 'left') {
            if (this.canMoveLeft()) {
                this.currentPiece.position = { ...this.currentPiece.position, x: this.currentPiece.position.x - 1 }
                const isFixed = false;
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);
                return { ...this.currentPiece, isFixed: isFixed };
            }
        }
    }

    // Rotate the current Tetrimino
    rotate() {
        if (this.currentPiece) {
            const newGrid = this.rotateMatrix(this.currentPiece.grid);

            if (this.canBePlace(newGrid)) {
                this.currentPiece.grid = newGrid;
                const isFixed = !this.canDrop();
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);

                return { ...this.currentPiece, isFixed: isFixed };

            }

        }
    }

    // Drop the current Tetrimino down
    drop() {
        // Implement logic to drop the Tetrimino down
    }

    // Handle collision detection
    handleCollision(gameGrid, currentPiece) {

        const pieceGrid = currentPiece.grid;
        console.log("pieceGrid = ", pieceGrid);
        let hasColision = false;

        if (currentPiece.position) {
            // Récupérez la position de la pièce en cours
            const { x, y } = currentPiece.position;

            // Parcourez la grille du jeu
            gameGrid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (pieceGrid[rowIndex - y] && pieceGrid[rowIndex - y][colIndex - x]) {
                        if (gameGrid[rowIndex][colIndex].fixed) {
                            hasColision = true;
                        }
                    }
                });
            });

            pieceGrid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell && (!gameGrid[rowIndex + y] || !gameGrid[rowIndex + y][colIndex + x])) {
                        console.log(`colision: col: ${colIndex}  row: ${rowIndex}`)
                        hasColision = true;
                    }


                });
            });
        }


        return hasColision;
    }

    // Update the game state
    update() {
        // Implement game logic, including collision detection, scoring, and clearing rows
    }

    // Render the game state (for a command-line game, console.log is sufficient)
    render() {
        // Implement rendering logic to display the game state
    }

    updateGameGrid(gameGrid, currentPiece, newPieceGrid, fixed = false) {
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


    rotateMatrix(matrix) {
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

}