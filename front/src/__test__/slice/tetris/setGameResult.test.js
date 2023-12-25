import tetrisSlice, { initialState, setGameResult } from "../../../slice/tetrisSlice";
import { RESULT_0 } from "../../__mocks__/tetris-mock";

const reducer = tetrisSlice.reducer;


test('[setGameResult]__should_do_nothing_with_null_payload', () => {

    let state = initialState;

    state = reducer(state, setGameResult(null));

    expect(state).toEqual(initialState);
})

test('[setGameResult]__should_do_nothing_with_undefined_result', () => {

    let state = initialState;

    state = reducer(state, setGameResult({ result: undefined }));

    expect(state).toEqual(initialState);
})


test('[setGameResult]__should_do_nothing_with_null_result', () => {

    let state = initialState;

    state = reducer(state, setGameResult({ result: null }));

    expect(state).toEqual(initialState);
})


test('[setGameResult]__should_update_result', () => {

    let state = initialState;

    state = reducer(state, setGameResult({ result: RESULT_0 }));

    expect(state.result).toEqual(RESULT_0);
})



