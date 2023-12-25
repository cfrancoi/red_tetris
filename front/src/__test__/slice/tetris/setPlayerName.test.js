import tetrisSlice, { initialState, setPlayerName } from "../../../slice/tetrisSlice";
import { getPlayer } from "../../../slice/utils/tetris.utils";
import { NAME_0, PLAYER_ID_0, StateWithOnePlayer } from "../../__mocks__/tetris-mock";

const reducer = tetrisSlice.reducer;


test('[setPlayerName]__should_do_nothing_with_bad_player_id', () => {

    let state = initialState;

    state = reducer(state, setPlayerName({ playerId: 'badPlayer', name: 'nothing' }));

    expect(state).toEqual(initialState);
})


test('[setPlayerName]__should_do_nothing_with_undefined_name', () => {

    let state = StateWithOnePlayer;

    state = reducer(state, setPlayerName({ playerId: PLAYER_ID_0, name: undefined }));

    expect(state).toEqual(StateWithOnePlayer);
})

test('[setPlayerName]__should_do_nothing_with_null_name', () => {

    let state = StateWithOnePlayer;

    state = reducer(state, setPlayerName({ playerId: PLAYER_ID_0, name: null }));

    expect(state).toEqual(StateWithOnePlayer);
})

test('[setPlayerName]__should_update_name', () => {

    let state = StateWithOnePlayer;

    state = reducer(state, setPlayerName({ playerId: PLAYER_ID_0, name: NAME_0 }));


    let player = getPlayer(state.players, PLAYER_ID_0);

    expect(player.name).toEqual(NAME_0);
})