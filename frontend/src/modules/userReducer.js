import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        edit: (state) => {
            state.value += 1;
        },
    },
});

export const { edit } = userSlice.actions;

export default userSlice.reducer;
