
module.exports = (emiter) => {

    emiter.addListener('tetrisError', (Err) => {
        console.log(`error reçu`);
    })

}