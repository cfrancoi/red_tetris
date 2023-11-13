const { get_tetrominos } = require('./generator_tetrominos.js');
const L_TETROMINO = [
    [0, 'L', 0],
    [0, 'L', 0],
    [0, 'L', 'L'],
]

function strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + (a + '').substr(1);
}


const TetrisPlayer = require('./Player.class');

module.exports = class TetrisGame {

    id;
    players;
    tetrominos = [];
    // io;

    constructor(id, players, io, options) {
        this.id = id;
        this.io = io;
        this.players = new Map(); // Map to store player instances


        players.forEach(player => {
            this.players.set(player.id, new TetrisPlayer(player, options));
        });
        console.log(this.players);
    }

    // ...

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

    update_sequence(){
        let tetro = [];
        get_tetrominos(tetro);
        this.players.forEach((player,key) => {
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
        this.players.forEach((player,key) => {
            console.log("player = ", player);
            player.spawnNewPiece(()=> {this.update_sequence()})
            this.io.to(this.id).emit('newPiece', {
                playerId: key,
                position: player.currentPiece.position,
                tetromino: player.currentPiece.grid,
            })
        });
        this.Interval = setInterval(() => { this.gameLoop(this.io, this.players) }, 750);
    }

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
            this.io.to(this.id).emit(`updatePiece`, { playerId: playerId, piece: piece, fixed: piece.isFixed });

            // this.io.to(this.id).emit(`move${strUcFirst(direction)}`, { id: playerId, fixed: move.isFixed });

            if (piece.isFixed) {
                player.spawnNewPiece(()=> {this.update_sequence()})
                this.io.to(this.id).emit('newPiece', {
                    playerId: playerId,
                    position: player.currentPiece.position,
                    tetromino: player.currentPiece.grid,
                })
            }
        }

    }

    rotatePlayer(playerId) {
        const player = this.players.get(playerId)
        const piece = player?.rotate();

        if (piece) {
            this.io.to(this.id).emit(`updatePiece`, { playerId: playerId, piece, fixed: piece.isFixed });

            if (piece.isFixed) {
                player.spawnNewPiece(()=> {this.update_sequence()})
                this.io.to(this.id).emit('newPiece', {
                    playerId: playerId,
                    position: player.currentPiece.position,
                    tetromino: player.currentPiece.grid,
                })
            }
        }
    }
}