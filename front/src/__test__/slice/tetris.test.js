import { initialState } from "../../slice/tetrisSlice";
import { store } from "../../store";


// https://bionicjulia.com/blog/writing-jest-tests-redux-toolkit-slice

describe("redux tetris slice tests", () => {
    it("should init with ", () => {
        const state = store.getState().tetris;

        expect(state).toEqual(initialState);
    })
})
