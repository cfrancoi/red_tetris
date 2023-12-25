import tetrisSlice, { ERoomStatus, initialState, setGameState } from "../../../slice/tetrisSlice";

const reducer = tetrisSlice.reducer;


test('[setGameState]__should_do_nothing_with_null_payload', () => {

    let state = initialState;

    state = reducer(state, setGameState(null));

    expect(state).toEqual(initialState);
})


test('[setGameState]__should_do_nothing_with_null_gameState', () => {

    let state = initialState;

    state = reducer(state, setGameState({ gameState: null }));

    expect(state).toEqual(initialState);
})

test('[setGameState]__should_do_nothing_with_undefined_gameState', () => {

    let state = initialState;

    state = reducer(state, setGameState({ gameState: undefined }));

    expect(state).toEqual(initialState);
})

test('[setGameState]__should_update_gameState', () => {

    let state = initialState;

    state = reducer(state, setGameState({ gameState: ERoomStatus.GAME_OVER }));

    expect(state.gameState).toEqual(ERoomStatus.GAME_OVER);
})