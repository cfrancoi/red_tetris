const { Socket } = require("socket.io");
const RoomManager = require("./room/RoomManager.class");


/**
 * @param {RoomManager} roomManager
 * @param {Socket} socket
 */
module.exports = function (socket, roomManager, io) {

  const offTetrisEvents = (socket) => {
    socket.removeAllListeners('moveDown');
    socket.removeAllListeners('moveLeft');
    socket.removeAllListeners('moveRight');
    socket.removeAllListeners('rotatePiece');
    socket.removeAllListeners('drop');
  }

  roomManager.events = {
    onFinish: (roomId, room) => {
      io.to(roomId).emit('roomGameOver', room.toJSON());

      room.players.forEach(player => {
        offTetrisEvents(player);
      });
    },
    onLeave: (roomId, player, room) => {
      player.leave(roomId);
      offTetrisEvents(player);
      player.data.tetrisRoomId = undefined;
      player.to(roomId).emit('roomLeft', { roomId: roomId, playerId: player.id });
    },
    onStart: (roomId, player, room) => {
      console.log(`game ${roomId} started by ${player.id}`);

      room.players.forEach(player => {
        require('./tetris.gateway')(player, roomManager, io);
      });

      io.to(roomId).emit('roomStarted');
    },
    onJoin: (roomId, player, room) => {
      player.join(room.id);
      player.data.tetrisRoomId = room.id;
      player.to(room.id).emit('roomJoined', room.toJSON())
      player.emit('roomJoined', room.toJSON(socket.id))
    }
  }

  socket.on('requestRoom', (arg) => {
    roomManager.addPlayerToRoom(arg, socket);
  });

  socket.on('startRoom', (arg) => {
    roomManager.startRoom(arg, socket, io);
  });

  socket.on('leaveRoom', (roomId) => {
    roomManager.removePlayerFromRoom(roomId, socket);
  });

  socket.on('updateRoom', (arg) => {
  });
}