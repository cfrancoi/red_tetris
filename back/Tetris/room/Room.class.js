const { estimatedDocumentCount } = require("../../models/role.model");

const TetrisGame = require("../game/TetrisGame.class");

const eventEmitter = require('../../events/GlobalEventEmitter');

const tetrisEvent = require('../events/event.constant');


const EStatus = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    PAUSED: 2,
    GAME_OVER: 3,
};

const defaultHeight = 20;
const defaultWidth = 10;


//TODO use isOwner() and add event to tell all errors
module.exports = class Room {
    id;
    status;
    players = [];
    game = null;

    constructor(id, player) {
        this.id = id;
        this.status = EStatus.NOT_STARTED;
        this.players.push(player);
    }

    addPlayer(player) {
        if (this.players.findIndex(p => p.id === player.id) === -1) {
            this.players.push(player);
        }
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
    }

    isEmpty() {
        return (!(this.players) || this.players.length === 0)
    }

    /**
     * 
     * @param {any | null | undefined} idToCheck - add a id if you wanna detect 'me' in player list.
     * @returns 
     */
    toJSON(idToCheck) {
        let playersToSend = [];

        this.players.forEach(player => {
            return playersToSend.push({
                id: player.id,
                name: (player?.data?.pseudo) ? player?.data?.pseudo : 'guest',
                me: (idToCheck && player.id === idToCheck)
            })
        });

        return {
            id: this.id,
            status: this.status,
            players: playersToSend,
            isOwner: this.isOwner(this)
        }
    }

    isOwner(player) {
        return (player === this.players[0]);
    }

    start(player, io, onEnd) {

        // NOT_OWNER
        if (!this.isOwner(player)) {
            eventEmitter.emit(tetrisEvent.ERROR, new Error('You must be an owner'));

            return false
        }

        // ROOM_BAD_STATUS
        if (this.status !== EStatus.NOT_STARTED) {

            eventEmitter.emit(tetrisEvent.ERROR, new Error(`Bad status ${this.status}, expected ${EStatus.NOT_STARTED}`));
            return false
        }


        this.game = new TetrisGame(this.id, this.players, io, this.options);

        this.game.events = {
            ...this.game.events, onFinish: (result) => {
                this.status = EStatus.GAME_OVER;
                onEnd(this.id, this, result);
            }
        }
        this.status = EStatus.IN_PROGRESS;

        this.game.start();


        return true;

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

    restartRoom(id, player) {
        if (this.status === EStatus.GAME_OVER) {
            this.status = EStatus.NOT_STARTED;

            return true;
        }
        return false
    }
}