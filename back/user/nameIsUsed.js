module.exports = async function nameIsUsed(io, name) {
    const sockets = await io.fetchSockets();

    for (const socket of sockets) {
        if (socket.data.name === name)
            return true;
    }

    return false;
}