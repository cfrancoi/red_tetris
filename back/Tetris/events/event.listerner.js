const on = require('./event.constant');



const onError = (err) => {
    console.err(`[ROOM](err): ${err.cause}`)
}


module.exports = (emiter) => {

    emiter.addListener(on.ERROR, onError);

}