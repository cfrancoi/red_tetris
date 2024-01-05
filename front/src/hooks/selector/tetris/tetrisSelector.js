import { createSelector } from "@reduxjs/toolkit";

export const me = createSelector(
    (state) => state.tetris,
    (_, players) => players,
    (players) => {
        let me;
        players.forEach(p => {
            if (p.me)
                me = players;
        });
        return me;
    }
)