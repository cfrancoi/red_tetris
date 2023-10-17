
const EStatus = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    PAUSED: 2,
    GAME_OVER: 3,
};

module.exports = class Room {
    id;
    status;
    players = [];

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
}