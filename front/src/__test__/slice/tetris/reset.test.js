import tetrisSlice, { initialState, reset } from "../../../slice/tetrisSlice";
import { defaultState } from "../../__mocks__/tetris-mock";

const reducer = tetrisSlice.reducer;


test('[reset]__should reset', () => {

    let state = defaultState;

    expect(state).not.toEqual(initialState);

    state = reducer(state, reset());

    expect(state).toEqual(initialState);
})
