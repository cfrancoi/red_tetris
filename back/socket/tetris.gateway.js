module.exports = function (socket, roomManager, io) {

    socket.on('moveDown', (gameId) => {
        const game = getGameById(gameId);

        if (game) {
            game.moveDown();
        }
    });

    //TODO impl.
    socket.on('moveLeft', (arg) => {

    });

    //TODO impl.
    socket.on('moveRight', (arg) => {

    });

    //TODO impl.
    socket.on('rotatePiece', (arg) => {

    });


};