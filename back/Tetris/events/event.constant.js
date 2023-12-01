
const events = require('events');
const eventEmitter = new events.EventEmitter();


const TETRIS_EVENT = {
    /**
     * ERROR
     */

    ERROR: 'tetris/error',

    /**
    * ROOM
    */
    REQUEST_ROOM: 'request_room',
    JOIN_ROOM: 'request_room',

    /**
     * GAME_EVENT
     */
}




module.exports = TETRIS_EVENT;