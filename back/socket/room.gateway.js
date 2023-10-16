module.exports = function(io, socket) {

    socket.on('requestRoom', (arg) => {
        
        //TODO all check system (permissions...)
        socket.join(arg);
        socket.emit('roomJoined', arg);

        //TODO send to room
    });
 
    
}