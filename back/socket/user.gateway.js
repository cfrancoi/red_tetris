const { Socket } = require("socket.io");

/**
 * 
 * @param {Socket} socket 
 */
module.exports = function (socket) {

  socket.on('change_pseudo', (pseudo) => {

    console.log(`[USER](info)change_pseudo by ${socket.id} to ${pseudo}`);

    socket.data.pseudo = pseudo;


    socket.emit('change_pseudo', { playerId: socket.id, name: socket.data.pseudo });

    for (const dest of socket.rooms) {
      socket.to(dest).emit('change_pseudo', { playerId: socket.id, name: socket.data.pseudo });
    }
  });

}