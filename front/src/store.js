import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tetrisSlice from "./slice/tetrisSlice";
import authSlice from "./slice/authSlice";

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        tetris: tetrisSlice.reducer
    })
})