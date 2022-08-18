import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    weekly: [],
    lastWeek: 0,
};

const reducers = {
    setWeekly: (state, { payload: weekly }) => {
        state.weekly = weekly;
        // console.log(actions);
    },
    setLastWeek: (state, { payload: lastWeek }) => {
        state.lastWeek = lastWeek;
    },
};

export const studySlice = createSlice({
    name: "study",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setWeekly, setLastWeek } = studySlice.actions;

export default studySlice.reducer;
