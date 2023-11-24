const { Socket } = require('socket.io');
const Room = require('./Room.class')

module.exports = class RoomManager {

    /** @type {[Room]} */
    rooms = [];

    // constructor() { }

    // Method to add a player to a room or create a new room
    addPlayerToRoom(id, player) {
        let joinedRoom = null;
        for (const room of this.rooms) {
            if (room.id === id) {
                room.addPlayer(player);
                joinedRoom = room;
            }
        }

        // If no suitable room is found, create a new one
        if (!joinedRoom) {
            joinedRoom = new Room(id, player);
            this.rooms.push(joinedRoom);
        }

        this.events?.onJoin(id, player, joinedRoom);
        return joinedRoom;
    }

    /**
     * @param {number} id 
     * @param {Socket} player 
     * @returns {Room | undefined | null} 
     */
    removePlayerFromRoom(id, player) {
        const room = this.rooms.find(room => room.id === id);

        if (room) {
            room.removePlayer(player);
            this.clearEmptyRoom();
            const nextRoom = this.rooms.find(room => room.id === id);
            this.events?.onLeave(id, player, nextRoom);
            return this.rooms.find(room => room.id === id);
        }
    }

    /**
     * Empty room are clear and if a game is in progress it's stoped
     */
    clearEmptyRoom() {
        this.rooms = this.rooms.filter(room => {
            if (room.isEmpty()) {
                if (room.game) {
                    room.game.kill();
                }

                room.game = null;
                return false;
            }
            return true;
        });
    }

    /**
     * 
     * @param {number} roomId 
     * @param {*} player 
     * @param {*} io 
     * @returns {Room}
     */
    startRoom(roomId, player, io) {
        const idx = this.rooms.findIndex(room => room.id === roomId);

        if (idx !== -1) {
            const room = this.rooms[idx];
            console.log(room);

            if (room.start(player, io, this.events.onFinish)) {
                this.events?.onStart(room.id, player, room);
                return room;
            };
        }
    }

    getRoomById(id) {
        for (const room of this.rooms) {
            if (room.id === id) {
                return room;
            }
        }
    }

    getGameById(id) {
        return this.getRoomById(id)?.game;
    }

}