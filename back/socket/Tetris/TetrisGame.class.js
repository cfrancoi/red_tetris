const { get_tetrominos } = require('./generator_tetrominos.js');

const TetrisPlayer = require('./Player.class');

module.exports = class TetrisGame {

    /** @type {number} */ id;
    /** @type {Map<string, player>} */ players;
    tetrominos = [];

    events = {
        onGameOver: () => {
            console.log('game over');
            this.kill();
            this.events.onFinish();
        },
        onFreezeLine: (id, index) => this.io.to(this.id).emit('freezeLine', { playerId: id, index }),
        onBreakLines: (id, listBreakline) => {
            if (listBreakline?.length) {
                this.io.to(this.id).emit('breakLine', { playerId: id, listBreakline })
                this.players.forEach((player, key) => {
                    if (key !== id)
                        player.freezeNextLine(this.events.onFreezeLine);
                })
            }

        },
        onNewPiece: (id, piece) => {
            this.io.to(this.id).emit('newPiece', {
                playerId: id,
                position: piece.position,
                tetromino: piece.grid,
            })
        }
    }

    /**
     * 
     * @param {*} id 
     * @param {Map<string, TetrisPlayer>} players list of players
     * @param {*} io 
     * @param {{height: number;}} options sets of options
     * @param {()} onFinish call when game is over
     */
    constructor(id, players, io, options) {
        this.id = id;
        this.io = io;
        this.players = new Map(); // Map to store player instances


        players.forEach(player => {
            this.players.set(player.id, new TetrisPlayer(player, options));
        });
        console.log(this.players);
    }

    // Add a method to create a new player
    addPlayer(playerId) {
        const player = new Player(playerId, this);
        this.players.set(playerId, player);
        return player;
    }

    // Add a method to remove a player
    removePlayer(playerId) {
        this.players.delete(playerId);
    }

    update_sequence() {
        let tetro = [];
        get_tetrominos(tetro);
        this.players.forEach((player, key) => {
            player.tetrominos.push(...tetro);
        })
    }

    init() {
        console.log('init');
        get_tetrominos(this.tetrominos);
    }

    start() {
        this.init();
        //INIT etc...
        this.players.forEach((player, key) => {
            player.spawnNewPiece(() => { this.update_sequence() },
                this.events.onNewPiece)
        });
        this.Interval = setInterval(() => { this.gameLoop(this.io, this.players) }, 750);
    }

    /**
     * used to stop current game loop
     */
    kill() {
        clearInterval(this.Interval);
    }

    gameLoop(io, players) {
        players.forEach((player, key) => {
            this.movePlayer(key, 'down');
        });
    }

    movePlayer(playerId, direction, i) {
        const player = this.players.get(playerId)
        const piece = player?.move(direction);

        if (piece) {
            // this.io.to(this.id).emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
            player.socket.emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
            if (piece.isFixed) {
                player.checkTetris(
                    this.events.onBreakLines,
                    this.events.onGameOver);
                player.socket.emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
                player.socket.to(this.id).emit('shadowBoard', { roomId: this.id, shadowboard: player.getShadowBoard() })
                player.spawnNewPiece(() => { this.update_sequence() },
                    this.events.onNewPiece
                )
            }
        }

    }

}