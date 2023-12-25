import { defaultHeight, defaultWidth } from "../../slice/tetrisSlice";

/**
 * PLAYER ID
 */
export const PLAYER_ID_0 = 'sample';
export const PLAYER_ID_1 = 'sample1';


/**
 * NAME
 */
export const NAME_0 = 'sample';

/**
 * RESULT
 */
export const RESULT_0 = [{ playerid: PLAYER_ID_0, score: 745, rank: 1 }];

/**
 * PIECE
*/

export const PIECE_0 = {
    grid: [[0, 'l', 'l']],
    position: { x: 0, y: 0 }
}


/**
 * PLAYER
 */
export const PLAYER_0 = {
    id: PLAYER_ID_0,
    grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({})),
    score: 0,
    currentPiece: {
        position: { x: 0, y: 0 },
        grid: null,
    }
}

export const PLAYER_WITH_PIECE_0 = {
    id: PLAYER_ID_0,
    grid: Array.from(Array(defaultHeight), () => new Array(defaultWidth).fill({})),
    score: 0,
    currentPiece: PIECE_0
}


/**
 * STATE
 */
export const emptyState = {};

export const defaultState = {
    roomId: 1,
    gameState: null,
    options: {
        height: defaultHeight,
        width: defaultHeight
    },
    players: []
};


export const StateWithOnePlayer = {
    roomId: 1,
    gameState: null,
    options: {
        height: defaultHeight,
        width: defaultWidth
    },
    players: [PLAYER_0]
};

/**
 * PIECE
 */




