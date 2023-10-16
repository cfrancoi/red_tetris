module.exports = function(io) {

    io.on('userevent', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
}