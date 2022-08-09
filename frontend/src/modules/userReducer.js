import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    token: null,
};

const reducers = {
    login: (state) => {
        state.isLogin = true;
    },
    logout: (state) => {
        state.isLogin = false;
    },
    token: (state, { token }) => {
        state.token = token;
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers,
});

export const { login, logout, token } = userSlice.actions;

export default userSlice.reducer;
