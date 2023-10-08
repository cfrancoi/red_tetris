import { configureStore, createSlice } from "@reduxjs/toolkit";
import tetrisSlice from "./slice/tetrisSlice";



const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name: "auth",
    initialState: user ? {
        isLoggedIn: true,
        user: user
    } :
    {
        isLoggedIn: false,
        user: null
    },
    reducers: {
        registerSuccess: (state, action) => {
            return {
                ...state,
                isLoggedIn: false
            }
        },
        registerFail: (state, action) => {
            return {
                ...state,
                isLoggedIn: false
            }
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                user: action?.payload?.user,
              };
        },
        loginFail: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
              };
        },
        logout: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
              };
        },
    }
})

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        tetris: tetrisSlice.reducer
    }
})