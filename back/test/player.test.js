const TetrisPlayer = require('../Tetris/game/Player.class');
const { L_TETROMINO } = require('../Tetris/game/tetrominos-constant');

describe('TetrisPlayer', () => {
    let tetrisPlayer;

    beforeEach(() => {
        // Mock socket object
        const socket = {

        };

        // Mock options object
        const options = {
            board: {
                height: 20,
                width: 10,
            },
        };


        tetrisPlayer = new TetrisPlayer(socket, options);


    });

    it("l'intance Tetris player c'est initialiser correctement ", () => {
        expect(tetrisPlayer.freezeLineIdx).toBe(20);
        expect(tetrisPlayer.grid).toEqual(expect.any(Array));
        expect(tetrisPlayer.grid).not.toHaveLength(0);
        expect(tetrisPlayer.currentPiece).toEqual({
            position: { x: 0, y: 0 },
            grid: L_TETROMINO,
        });
        expect(tetrisPlayer.score).toBe(0);
        expect(tetrisPlayer.gameOver).toBe(false);
        expect(tetrisPlayer.socket).toBeDefined();
    });

    it("la ligne a bientot été nettoyé par la fonction clearRows", () => {
        tetrisRowsIndex = 5;
        tetrisPlayer.grid[tetrisRowsIndex].fill({ type: 'f', isFixed: true });

        //Call the clearRows
        tetrisPlayer.clearRows(tetrisRowsIndex);

        const clearedRow = tetrisPlayer.grid[tetrisRowsIndex];
        expect(clearedRow.every(cell => cell.type === '' && cell.isFixed === false)).toBe(true);

        // Check that other rows are unaffected
        for (let i = 0; i < tetrisPlayer.grid.length; i++) {
            if (i !== tetrisRowsIndex) {
                expect(tetrisPlayer.grid[i].some(cell => cell.type === 'block' && cell.isFixed === true)).toBe(false);
            }
        }
    });
});


