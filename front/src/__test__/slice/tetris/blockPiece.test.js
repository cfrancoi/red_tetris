import tetrisSlice, { blockPiece, initialState } from "../../../slice/tetrisSlice";
import { getPlayer } from "../../../slice/utils/tetris.utils";
import { PLAYER_ID_0, PLAYER_WITH_PIECE_0, defaultState } from "../../__mocks__/tetris-mock";

const reducer = tetrisSlice.reducer;

const name = 'blockPiece'

test(`[${name}]__should_do_nothing_with_null_payload`, () => {

    let state = initialState;

    state = reducer(state, blockPiece(null));

    expect(state).toEqual(initialState);
})

test(`[${name}]__should_do_nothing_with_null_playerId`, () => {

    let state = initialState;

    state = reducer(state, blockPiece({ playerId: null }));

    expect(state).toEqual(initialState);
})

test(`[${name}]__should_do_nothing_with_undefined_playerId`, () => {

    let state = initialState;

    state = reducer(state, blockPiece({ playerId: undefined }));

    expect(state).toEqual(initialState);
})

test(`[${name}]__should_fixed_piece_and_set_null_to_currentPiece`, () => {

    let state = defaultState;
    state.players.push(PLAYER_WITH_PIECE_0);

    const piece = PLAYER_WITH_PIECE_0.currentPiece;

    state = reducer(state, blockPiece({ playerId: PLAYER_ID_0 }));

    const player = getPlayer(state.players, PLAYER_ID_0);

    expect(player.currentPiece).toEqual(null);


    piece.grid.forEach((line, index) => {
        const x = index;
        line.forEach((cell, index) => {
            if (cell) {
                expect(player.grid[piece.position.x + x][piece.position.y + index]).toEqual({ type: cell, fixed: true })
            }
        })
    })
})