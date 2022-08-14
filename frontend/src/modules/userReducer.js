import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: null,
  userId: null,
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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const { login, logout, setToken, setUserId } = userSlice.actions;

export default userSlice.reducer;
