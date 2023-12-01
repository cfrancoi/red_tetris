const on = require('./event.constant');



const onError = (err) => {
    console.log(`[ROOM](err): ${err.message}`)
}


module.exports = (emiter) => {

    emiter.addListener(on.ERROR, onError);
}