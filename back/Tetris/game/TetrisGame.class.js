const defaultOptions = require('./defaultOptions.js');
const { get_tetrominos } = require('./generator_tetrominos.js');

const TetrisPlayer = require('./Player.class.js');

module.exports = class TetrisGame {

    /** @type {number} */ id;
    /** @type {Map<string, player>} */ players;

    tetrominos = [];


    events = {
        onGameOver: (player) => {
            player.gameOver = true;
            console.log('game over');

            player.rank = this.nextRank;

            this.nextRank = +this.nextRank - 1;

            if (this.isEnd()) {
                this.setRankToLastsPlayers();
                this.kill();
                this.events.onFinish(this.getResult());
            }
        },
        onFreezeLine: (id, nbLine, freezeLineIdx) => this.io.to(this.id).emit('freezeLine', { playerId: id, nbLine, freezeLineIdx }),
        onBreakLines: (id, listBreakline) => {
            console.log(`[GAME](info): break lines: [${listBreakline}]`)
            if (listBreakline?.length) {
                this.io.to(this.id).emit('breakLine', { playerId: id, listBreakline })
                if (this.options.freeze === true) {
                    this.players.forEach((player, key) => {
                        if (key !== id)
                            this.freezeLines(key, (listBreakline.length - 1));
                    })
                }
            }

        },
        onNewPiece: (id, piece) => {

            //    console.log(piece);
            //  console.log(id);

            this.io.to(id).emit('newPiece', {
                playerId: id,
                position: piece.position,
                tetromino: piece.grid,
                nextPiece: piece.nextPiece
            })
        },
        onError: (err) => {
            console.err(`[GAME](err): ${err.cause}`)
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

        this.options = { ...defaultOptions, ...options }

        players.forEach(player => {
            this.players.set(player.id, new TetrisPlayer(player, this.options));
        });
        this.nextRank = this.players.size;
    }

    addPlayer(playerId) {
        const player = new Player(playerId, this);
        this.players.set(playerId, player);
        return player;
    }

    removePlayer(playerId) {
        this.players.delete(playerId);
    }

    leave(playerId) {
        if (playerId) {
            this.events.onGameOver(this.players.get(playerId));
        }
    }

    update_sequence() {
        let tetro = [];
        get_tetrominos(tetro);
        this.players.forEach((player, key) => {
            player.tetrominos.push(...tetro);
        })
    }

    init() {
        // console.log('init');
        // get_tetrominos(this.tetrominos);
    }

    start() {
        this.init();
        //INIT etc...
        this.players.forEach((player, key) => {
            player.spawnNewPiece(() => { this.update_sequence() },
                this.events.onNewPiece)
        });
        this.Interval = setInterval(() => { this.gameLoop(this.io, this.players) }, this.options.gameDelay);
    }

    /**
     * used to stop current game loop
     */
    kill() {
        clearInterval(this.Interval);
    }

    gameLoop(io, players) {
        players.forEach((player, key) => {
            if (!player.gameOver)
                this.movePlayer(key, 'down');
        });
    }

    movePlayer(playerId, direction, i) {
        const player = this.players.get(playerId);
        const piece = player?.move(direction);

        if (piece) {
            // this.io.to(this.id).emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
            player.socket.emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
            if (piece.isFixed) {
                player.checkTetris(
                    this.events.onBreakLines,
                    this.events.onGameOver);
                player.socket.emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });
                player.socket.to(this.id).emit('shadowBoard', { roomId: this.id, playerId: player.socket.id, shadowboard: player.getShadowBoard() })
                player.spawnNewPiece(() => { this.update_sequence() },
                    this.events.onNewPiece
                )
            }
        }

    }

    freezeLines(playerId, nbLinesToFreeze) {
        const player = this.players.get(playerId);
        player.freezeNextLines(nbLinesToFreeze);

        //TODO get list of index freeze instead it's more clear than to values
        this.events.onFreezeLine(playerId, nbLinesToFreeze, player.freezeLineIdx);

        //TRIGGER events
    }

    isEnd() {
        let loosers = 0;

        this.players.forEach((p, key) => {
            if (p.gameOver) {
                loosers += 1
            }
        });
        console.log(`${loosers}/${this.players.size} players`);
        if (this.players.size === 1) {
            return (loosers === 1);
        }
        else if (this.players.size > 1) {
            return (loosers === (this.players.size - 1))
        }

        return false
    }

    setRankToLastsPlayers() {
        this.players.forEach((p, key) => {
            if (!p.rank) {
                p.rank = 1;
            }
        });
    }

    getResult() {
        let result = [];

        this.players.forEach((p, key) => {
            result.push({
                playerId: key,
                rank: p.rank,
                score: p.score
            })
        });
        return result;
    }
}