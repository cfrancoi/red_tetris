import { store } from "../../store";


// https://bionicjulia.com/blog/writing-jest-tests-redux-toolkit-slice

describe("redux auth slice tests", () => {
    it("should init with isLoggedIn false and user null", () => {

        const state = store.getState().auth;

        expect(state.isLoggedIn).toEqual(false);
        expect(state.user).toEqual(null);

    })
})
