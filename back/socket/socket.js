const { Server } = require("socket.io");
const http = require('http');
const RoomManager = require('../Tetris/room/RoomManager.class');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const globalEventEmitter = require('../events/GlobalEventEmitter');


module.exports = function (server) {

  const io = new Server(server, { path: "/api/socket.io" });

  const roomManager = new RoomManager();

  require('../Tetris/events/event.listerner')(globalEventEmitter, roomManager, io);

  io.on('connection', (socket) => {
    console.log('a user connected');

    require('./user.gateway')(io, socket);
    require('./room.gateway')(socket, roomManager, io);
    socket.on('authentication', (accessToken) => {
      console.log(`accessToken: ${accessToken}`);

      if (!accessToken) {
        socket.data.auth = null;
        //TODO remove authentication (maybe use an other event ?)
      }
      else {
        //TODO test token
        console.log(`accessToken: ${accessToken}`);
        jwt.verify(accessToken,
          config.secret,
          (err, decoded) => {
            if (err) {
              return;
            }
            socket.data.auth = decoded;
            socket.emit('authenticated');
          });
      }

    })

    socket.on("disconnecting", () => {
      if (socket.data.tetrisRoomId) {
        const room = roomManager.removePlayerFromRoom(socket.data.tetrisRoomId, socket);

        if (room) {
          socket.data.tetrisRoomId = undefined;
          socket.to(room.id).emit('roomLeft', { roomId: socket.data.tetrisRoomId, playerId: socket.id });
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });

  io.of("/").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was deleted`);
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });

  io.of("/").adapter.on("leave-room", (room, id) => {
    console.log(`socket ${id} has left room ${room}`);
  });

}


