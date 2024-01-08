
const nameIsUsed = require('./nameIsUsed');

module.exports = async function generateUnusedName(io, name) {
    
    // while (await nameIsUsed(io, name)) {
    //     // generate new name 
    //     name += 'a'
    // }

    return 'guest';
}