const RoomManager = require("./room/RoomManager.class");


/**
 * @param {RoomManager} roomManager
 */
module.exports = function (socket, roomManager, io) {
  socket.on('requestRoom', (arg) => {
    const room = roomManager.addPlayerToRoom(arg, socket);

    if (room) {
      socket.join(room.id);
      socket.data.tetrisRoomId = room.id;
      socket.to(room.id).emit('roomJoined', room.toJSON())
      socket.emit('roomJoined', room.toJSON(socket.id))
      console.log(room);
    }
  });

  socket.on('startRoom', (arg) => {
    console.log(arg);
    const room = roomManager.startRoom(arg, socket, io);

    //TODO payload
    console.log(room);

    if (room) {
      socket.emit('roomStarted');
      socket.to(room.id).emit('roomStarted');
    }
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId)

    const room = roomManager.removePlayerFromRoom(roomId, socket);

    if (room) {
      socket.data.tetrisRoomId = undefined;
      socket.to(room.id).emit('roomLeft', { roomId: room.id, playerId: socket.id });
    }
  });

  socket.on('updateRoom', (arg) => {

  });

}