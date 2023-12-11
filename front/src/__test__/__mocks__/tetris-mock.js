import { defaultHeight, defaultWidth } from "../../slice/tetrisSlice";

/**
 * PLAYER ID
 */
export const PLAYER_ID_0 = 'sample';
export const PLAYER_ID_1 = 'sample1';


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




