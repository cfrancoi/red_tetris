
module.exports = function (socket, roomManager) {
    socket.on('requestRoom', (arg) => {
        const room = roomManager.addPlayerToRoom(arg, socket);

        if (room) {
            socket.join(room.id);
            socket.to(room.id).emit('roomJoined', room.toJSON())
            socket.emit('roomJoined', room.toJSON())
            console.log(room);
        }
    });
}