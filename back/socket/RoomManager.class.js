const Room = require('./Room.class')

module.exports = class RoomManager {

    constructor() {
        this.rooms = [];
    }

    // Method to add a player to a room or create a new room
    addPlayerToRoom(id, player) {
        for (const room of this.rooms) {
            if (room.id === id) {
                return room;
            }
        }

        // If no suitable room is found, create a new one
        const newRoom = new Room(id, player);
        this.rooms.push(newRoom);
        return newRoom;
    }

    removePlayerFromRoom(id, player) {
        const room = this.rooms.find(room => room.id === id);

        if (room) {
            room.removePlayer(player);
            clearEmptyRoom();
        }
    }

    clearEmptyRoom() {
        this.rooms = this.rooms.filter(room => !room.isEmpty());

    }
}