module.exports = class TetrisGame {

    id;
    players;
    // io;

    constructor(id, players, io) {
        this.id = id;
        this.io = io;
        this.players = new Map(players); // Map to store player instances

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

    init() {
        console.log('init');

    }

    start() {
        this.init();
        //INIT etc...

        setInterval(() => { this.gameLoop(this.io) }, 2000);
    }

    kill() {

    }


    gameLoop(io) {


        io.to(this.id).emit('moveDown');
        console.log('game en cours...');
    }
}