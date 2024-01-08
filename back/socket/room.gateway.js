const { Socket } = require("socket.io");
const RoomManager = require("../Tetris/room/RoomManager.class");
const setSocketName = require("../user/setSocketName");

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
    onFinish: (roomId, room, result) => {
      io.to(roomId).emit('roomGameOver', { room: room.toJSON(), result });

      room.players.forEach(player => {
        offTetrisEvents(player);
      });

      room.game = null;
    },
    onLeave: (roomId, player, room) => {
      player.leave(roomId);
      offTetrisEvents(player);
      player.data.tetrisRoomId = undefined;

      if (room)
        player.to(roomId).emit('roomLeft', { roomId: roomId, playerId: player.id, owner: room.owner().id });
    },
    onStart: (roomId, player, room) => {
      console.log(`game ${roomId} started by ${player.id}`);

      room.players.forEach(player => {
        require('./tetris.gateway')(player, roomManager, io);
      });

      io.to(roomId).emit('roomStarted');
    },
    onJoin: (roomId, player, room) => {
      player.data.tetrisRoomId = room.id;
      player.to(room.id).emit('roomJoined', room.toJSON())
      player.join(room.id);
      player.emit('roomJoined', room.toJSON(player.id))
    },
    onRestartRoom: (roomId, player, room) => {
      console.log(`room ${roomId} restarted by ${player.id}`);
      io.to(roomId).emit('roomRestarted', room.toJSON());
    }
  }

  socket.on('requestRoom', (arg) => {

    console.log(`set name1 ${arg.name}`);

    setSocketName(io, socket, arg.name).then(() => {
      socket.emit('change_pseudo', { playerId: socket.id, name: socket.data.name });

      for (const dest of socket.rooms) {
        socket.to(dest).emit('change_pseudo', { playerId: socket.id, name: socket.data.name });
      }
    })

    roomManager.addPlayerToRoom(arg.roomId, socket);
  });

  //TODO CLEARME start game /!\
  socket.on('startRoom', (arg) => {
    roomManager.startRoom(arg, socket, io);
  });

  socket.on('leaveRoom', (roomId) => {
    roomManager.removePlayerFromRoom(roomId, socket);
  });

  //TODO clear difference between start and restart one is for the game this case it's to restart room cycle.
  socket.on('restartRoom', (roomId) => {
    roomManager.restartRoom(roomId, socket);
  });

  //TODO for bonnus change game options
  socket.on('updateRoom', (arg) => {
  });
}