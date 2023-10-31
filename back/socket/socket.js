const { Server } = require("socket.io");
const http = require('http');
const RoomManager = require('./room/RoomManager.class');

module.exports = function (server) {

  const io = new Server(server, { path: "/api/socket.io" });

  const roomManager = new RoomManager();

  io.on('connection', (socket) => {
    console.log('a user connected');

    require('./user.gateway')(socket);
    require('./room.gateway')(socket, roomManager, io);

    socket.on("disconnecting", () => {


      console.log(socket.rooms); // the Set contains at least the socket ID
      socket.rooms.forEach(room => {
        socket.leave(room);
        console.log('leave room:' + room);
      })
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


