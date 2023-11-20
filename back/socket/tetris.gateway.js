module.exports = function (socket, roomManager, io) {

    socket.on('moveDown', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'down');
        }
    });

    //TODO impl.
    socket.on('moveLeft', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'left');
        }
    });

    //TODO impl.
    socket.on('moveRight', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'right');
        }
    });

    //TODO impl.
    socket.on('rotatePiece', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'rotate');
        }
    });

    socket.on('drop', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'drop');
        }
    });


};