import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  notificationCnt: 0,
};

const reducers = {
  setNotificationCnt: (state, { payload: notificationCnt }) => {
    state.notificationCnt = notificationCnt;
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setNotificationCnt } = notificationSlice.actions;

export default notificationSlice.reducer;
