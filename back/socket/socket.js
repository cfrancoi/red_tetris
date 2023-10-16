const {Server} = require("socket.io");
//const{Server} = require("socket.io");
const http = require('http');
// const io = new Server(server);
// xport const path = require('path');

module.exports = function(server) {

    const io = new Server(server);


    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

  require('./user.gateway')(io);
}

