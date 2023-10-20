const { estimatedDocumentCount } = require("../../models/role.model");

const TetrisGame = require("../Tetris/TetrisGame.class");

const EStatus = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    PAUSED: 2,
    GAME_OVER: 3,
};

const defaultHeight = 20;
const defaultWidth = 10;

module.exports = class Room {
    id;
    status;
    players = [];
    options = {
        height: defaultHeight,
        width: defaultWidth
    }
    game = null;

    constructor(id, player) {
        this.id = id;
        this.status = EStatus.NOT_STARTED;
        this.players.push(player);
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
    }

    isEmpty() {
        return (!(this.players) || this.players.length === 0)
    }

    toJSON() {
        let playersToSend = [];

        this.players.forEach(player => { return playersToSend.push({ id: player.id }) });

        return {
            id: this.id,
            status: this.status,
            players: playersToSend
        }
    }
    isOwner(player) {
        return (player === this.players[0]);

    }

    start(playerId, io) {

        //TODO isowner

        if (this.status === EStatus.NOT_STARTED) {


            this.game = new TetrisGame(this.id, this.players, io);
            this.status = EStatus.IN_PROGRESS;

            //io pour emit
            this.game.start();

            return true;
        }
    }

    leave(id) {
        for (let i = 0; this.player[i]; i++)
            if (this.player[i].id === id)
                this.removePlayer(this.players[i]);
    }

    updateOption(option) {

        this.options = { ...this.options, ...option }
        /*  if (option.height)
              this.options.height = option.height
          if (option.width)
              this.options.width = option.width */
    }
}