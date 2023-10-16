const {Server} = require("socket.io");
//const{Server} = require("socket.io");
const http = require('http');
// const io = new Server(server);
// xport const path = require('path');

module.exports = function(server) {

    const io = new Server(server);


    io.on('connection', (socket) => {
        console.log('a user connected');

        require('./user.gateway')(socket);
        require('./room.gateway')(io, socket);
        socket.on("hello", (arg) => {
          console.log(arg); // world
        });

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

}


