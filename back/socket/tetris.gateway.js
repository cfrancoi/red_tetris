module.exports = function (socket, roomManager, io) {

    socket.on('moveDown', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'down');
        }
    });

    socket.on('moveLeft', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'left');
        }
    });

    socket.on('moveRight', (gameId) => {
        const game = roomManager.getGameById(gameId);

        if (game) {
            game.movePlayer(socket.id, 'right');
        }
    });

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