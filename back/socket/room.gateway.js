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

  socket.on('startRoom', (arg) => {
    const room = roomManager.
      if(room){

      }

  });

  socket.on('leaveRoom', (arg) => {
    const room = roomManager.removePlayerFromRoom(arg, socket);

    if (room) {
      socket.leave(room.id)
      socket.to(room.id).emit('roomLeft', { roomId: room.id, playerId: socket.id });
      socket.emit('roomLeft', { roomId: room.id, playerId: socket.id });
      console.log(room);
    }
  });

  socket.on('updateRoom', (arg) => {

  });
}