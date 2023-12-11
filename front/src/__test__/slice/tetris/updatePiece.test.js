import tetrisSlice, { addPlayerToRoom, updatePiece } from "../../../slice/tetrisSlice";
import { getPlayer } from "../../../slice/utils/tetris.utils";
import { PLAYER_ID_0, StateWithOnePlayer, defaultState, emptyState } from "../../__mocks__/tetris-mock";


const payload = {
    playerId: null,
    piece: {
        grid: [],
        position: { x: 0, y: 0 }
    }
};

const reducer = tetrisSlice.reducer;

test('updatePiece should do nothing', () => {
    expect(reducer(emptyState, updatePiece(payload))).toEqual(emptyState);
})


test('updatePiece should not find player', () => {
    let payload = {
        playerId: 0,
        piece: {
            grid: [],
            position: { x: 0, y: 0 }
        }
    }

    expect(reducer(defaultState, updatePiece(payload))).toEqual(defaultState);
})


test('updatePiece should update piece', () => {

    let state = StateWithOnePlayer;

    const piece = {
        grid: [[0, 'l', 0]],
        position: { x: 0, y: 0 }
    }

    let payload = {
        playerId: PLAYER_ID_0,
        piece: piece
    }
    state = reducer(state, updatePiece(payload));

    const player = getPlayer(state.players, PLAYER_ID_0);

    expect(player.currentPiece).toEqual(piece);
})



