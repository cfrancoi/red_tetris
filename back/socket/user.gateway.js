const { Socket } = require("socket.io");
const getSocketName = require("../user/getSocketName");
const setSocketName = require("../user/setSocketName");

/**
 * 
 * @param {Socket} socket 
 */
module.exports = function (io, socket) {

  socket.on('change_pseudo', (pseudo) => {

    console.log(`[USER](info)change_pseudo by ${socket.id} to ${pseudo}`);

    setSocketName(io, socket, pseudo).then(() => {
      socket.emit('change_pseudo', { playerId: socket.id, name: getSocketName(socket) });

      for (const dest of socket.rooms) {
        socket.to(dest).emit('change_pseudo', { playerId: socket.id, name: getSocketName(socket) });
      }
    })
  });

}