import { store } from "../../store";


// https://bionicjulia.com/blog/writing-jest-tests-redux-toolkit-slice

describe("redux tetris slice tests", () => {
    it("should init with ", () => {
        const state = store.getState().tetris;

        expect(state).toEqual({
            roomId: null,
            gameState: null,
            options: {
                height: defaultHeight,
                width: defaultWidth
            },
            players: [
                {
                    score: 0,
                    currentPiece: {
                        position: { x: 0, y: 0 },
                        grid: null,
                    },
                    grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({}))
                },
            ]
        });
    })
})
