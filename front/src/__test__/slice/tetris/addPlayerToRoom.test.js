import tetrisSlice, { addPlayerToRoom } from "../../../slice/tetrisSlice";
import { PLAYER_ID_0, defaultState } from "../../__mocks__/tetris-mock";


const reducer = tetrisSlice.reducer;

//TODO roomId must be add to payload ! (front and back and add to test next)
//FIXME roomId must be add to payload ! (front and back and add to test next)
//do for all needed action
test('[addPlayerToRoom]__should add player', () => {

    let state = defaultState;
    const playerToAdd = [{
        id: PLAYER_ID_0
    }]

    let payload = {
        players: playerToAdd,
    }
    state = reducer(state, addPlayerToRoom(payload));


    //We add one player, length must be one
    expect(state.players.length).toEqual(1);
})
