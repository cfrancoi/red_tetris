module.exports = function(io, socket) {

    socket.on('try', (arg) => {

        console.log('rcv event')
        socket.join(arg);
    });


    //TODO move
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