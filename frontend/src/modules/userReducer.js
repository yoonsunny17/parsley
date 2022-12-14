import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    isLogin: false,
    token: null,
    userId: null,
    user: {
        id: null,
        name: "",
        regDate: null,
        description: "",
        profileImgUrl: "",
        dDay: null,
        currentSley: 0,
        currentBookPoint: 0,
        interestRooms: [],
        herbBookName: "",
        herbBookType: "",
        herbBookDescription: "",
        herbBookImageUrl: "",
    },
};

const reducers = {
    login: (state) => {
        state.isLogin = true;
    },
    logout: (state) => {
        state.isLogin = false;
    },
    setToken: (state, { payload: token }) => {
        state.token = token;
    },
    setUserId: (state, { payload: id }) => {
        state.userId = id;
    },
    setUser: (state, { payload: user }) => {
        state.user = user;
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { login, logout, setToken, setUserId, setUser } =
    userSlice.actions;

export default userSlice.reducer;
