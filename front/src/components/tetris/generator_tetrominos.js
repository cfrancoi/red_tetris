import { T_TETROMINO, J_TETROMINO, L_TETROMINO, O_TETROMINO, S_TETROMINO, Z_TETROMINO, I_TETROMINO } from "./tetrominos-constant";


function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
    const tabTetro = [T_TETROMINO, J_TETROMINO, L_TETROMINO, O_TETROMINO, S_TETROMINO, Z_TETROMINO, I_TETROMINO];

    while (tabTetro.length) {
        const rand = getRandInt(0, tabTetro.length - 1);
        const tetro = tabTetro.splice(rand, 1)[0];
        tetrominosSequence.push(tetro);
    }
}

