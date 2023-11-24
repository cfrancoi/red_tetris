const L_TETROMINO = [
    [0, 'L', 0],
    [0, 'L', 0],
    [0, 'L', 'L'],
]

module.exports = class TetrisPlayer {

    socket;
    tetrominos = [];

    constructor(socket, options) {
        this.freezeLineIdx = options.height;
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
        this.grid = Array.from({ length: rows }, () => Array(columns).fill({ type: '', isFixed: false }));

    }

    clearRows(index) {
        this.grid[index].fill({ type: '', isFixed: false });
    }

    downGrid(index) {
        // Vérifier si l'index de la ligne est valide
        if (index < 0 || index >= this.grid.length) {
            console.error('Index de ligne invalide.');
            return;
        }

        // Descendre chaque élément au-dessus de la ligne spécifiée

        for (let i = index - 1; i >= 0; i--) {
            this.grid[i + 1] = this.grid[i];
        }

        this.grid[0] = Array(this.grid[0].length).fill({ type: '', isFixed: false });
    }

    freezeNextLine(onFreezeLine) {
        this.freezeLineIdx -= 1;

        this.freezeline(this.freezeLineIdx);

        onFreezeLine(this.socket.id, this.freezeLineIdx);
    }


    freezeline(index) {
        this.grid[index].fill({ type: 'f', isFixed: true });
    }


    checkBreakLine(onBreakLines) {
        let breakLines = [];
        for (let i = 0; i < this.grid.length; i++) {
            let cpt = 0;
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].isFixed && this.grid[i][j].type !== 'f') {
                    cpt++;
                }
                if (cpt === this.grid[i].length) {
                    breakLines.push(i);
                    this.clearRows(i);
                }
            }
        }

        if (breakLines && breakLines.length) {
            for (let i = 0; i < breakLines.length; i++)
                this.downGrid(breakLines[i]);

            return onBreakLines(this.socket.id, breakLines);

        }
    }
    //FIXME 
    checkGameRules(onLose) {
        for (let j = 0; j < this.grid[0].length; j++) {
            if (this.grid[0][j] && this.grid[0][j].isFixed)
                return onLose();
        }
    }




    /**
     * 
     * @param {(breakLines: [])} onBreakLines 
     * @param {(reason: string)} onLose call if game rules is broke 
     */
    checkTetris(onBreakLines, onLose) {
        this.checkBreakLine(onBreakLines);
        this.checkGameRules(onLose);
    }

    /**
     * 
     * @param {tetrominos:[][]} newTetromino 
     * @param {positionTetromino:{x,y}} positionTetromino 
     */
    checkPositionTetrominos(newTetromino, positionTetromino) {
        let newPosition = { x: positionTetromino.x, y: positionTetromino.y };
        for (let i = 0; i < newTetromino.length; i++) {
            for (let j = 0; j < newTetromino[i].length; j++) {
                if (this.grid[i][j] && this.grid[i][j].isFixed) {
                    newPosition.y = newPosition.y - newTetromino.length + i;
                    console.log('tetromino = ', newTetromino);
                    console.log("newPosition = ", newPosition);
                    return newPosition
                }
            }
        }
        return positionTetromino;
    }

    /**
     * 
     * @param {()} generateSequence function to generate tetromino sequence
     * @param {()} onSuccess call when tetromino placed

     * @returns 
     */
    spawnNewPiece(generateSequence, onSuccess) {
        if (!this.tetrominos.length)
            generateSequence();

        const newPiece = {
            grid: this.tetrominos[0],
            position: { x: 0, y: 0 }
        }
        newPiece.position = this.checkPositionTetrominos(newPiece.grid, newPiece.position);
        this.currentPiece = newPiece;
        this.tetrominos = this.tetrominos.splice(1);
        onSuccess(this.socket.id, this.currentPiece);
        return this.currentPiece;
    }

    canDown() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x, y: this.currentPiece.position.y + 1 } });
    }

    canMoveRight() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x + 1, y: this.currentPiece.position.y } });
    }

    canMoveLeft() {
        return !this.handleCollision(this.grid, { grid: this.currentPiece.grid, position: { x: this.currentPiece.position.x - 1, y: this.currentPiece.position.y } });
    }

    canBePlace(newPieceGrid, position) {
        return !this.handleCollision(this.grid, { grid: newPieceGrid, position: position });
    }

    // Move the current Tetrimino
    move(direction) {
        // Implement logic to move the Tetrimino left or right
        if (!this.currentPiece)
            return;

        if (direction === 'drop') {
            // Implement logic to drop the Tetrimino down
            let ret = this.move('down');

            while (!ret?.isFixed) {
                ret = this.move('down');
            }

            return ret;
        }

        if (direction === 'down') {

            if (this.canDown()) {
                this.currentPiece.position = { ...this.currentPiece.position, y: this.currentPiece.position.y + 1 }
                const isFixed = false;
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);
                return { ...this.currentPiece, isFixed: isFixed };
            }
            else {
                const isFixed = !this.canDown();
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

        if (direction === 'rotate') {
            return (this.rotate());
        }
    }

    // Rotate the current Tetrimino
    rotate() {
        if (this.currentPiece) {
            const newGrid = this.rotateMatrix(this.currentPiece.grid);

            //FIXME 
            if (this.canBePlace(newGrid, this.currentPiece.position)) {
                this.currentPiece.grid = newGrid;
                const isFixed = !this.canDown();
                this.updateGameGrid(this.grid, this.currentPiece, this.currentPiece.grid, isFixed);

                return { ...this.currentPiece, isFixed: isFixed };

            }

        }
    }

    // Drop the current Tetrimino down
    drop() {
        return this.move('drop');
    }

    // Handle collision detection
    handleCollision(gameGrid, currentPiece) {

        const pieceGrid = currentPiece.grid;
        let hasColision = false;

        if (currentPiece.position) {
            // Récupérez la position de la pièce en cours
            const { x, y } = currentPiece.position;

            // Parcourez la grille du jeu
            gameGrid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (pieceGrid[rowIndex - y] && pieceGrid[rowIndex - y][colIndex - x]) {
                        if (gameGrid[rowIndex][colIndex].isFixed) {
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

    updateGameGrid(gameGrid, currentPiece, newPieceGrid, isFixed = false) {
        if (currentPiece.position) {
            // Récupérez la position de la pièce en cours
            const { x, y } = currentPiece.position;

            // Parcourez la grille du jeu
            gameGrid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    // Effacez les cellules oùisFixed est false (ancienne pièce)
                    if (!cell.isFixed) {
                        gameGrid[rowIndex][colIndex] = { type: '', isFixed: false };
                    }

                    // Vérifiez si la cellule correspond à la pièce en cours et qu'elle est remplie
                    if (newPieceGrid[rowIndex - y] && newPieceGrid[rowIndex - y][colIndex - x]) {
                        // Mettez à jour la cellule dans la grille du jeu
                        gameGrid[rowIndex][colIndex] = {
                            type: newPieceGrid[rowIndex - y][colIndex - x],
                            isFixed: isFixed,
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