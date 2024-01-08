const { Socket, Server } = require("socket.io");
const nameIsUsed = require("./nameIsUsed");
const generateUnusedName = require("./generateUnusedName");

/**
 * 
 * set name of socket (in data name) if name not specified or already used generate and set a new unused name
 * 
 * 
 * @param {Server} io 
 * @param {Socket} socket 
 * @param {string | null} name 
 * 
 * @returns 
 */
module.exports = async function setSocketName(io, socket, name) {

    if (name && socket.data.name === name)
        return true;

    if (name && !(await nameIsUsed(io, name))) {
        socket.data.name = name;
    }
    else {
        //TODO generate
        let name = await generateUnusedName(io, null);

        socket.data.name = name;
    }
    
}