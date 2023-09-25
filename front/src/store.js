import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
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
        auth: authSlice.reducer
    }
})