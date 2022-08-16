import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weekly: [],
    lastWeek: 0,
};

const reducers = {
    setWeekly: (state, actions) => {
        // state.weekly = weekly;
        console.log("---------------------");
        console.log(actions);
    },
    setLastWeek: (state, { payload: lastWeek }) => {
        state.lastWeek = lastWeek;
    },
};

export const studySlice = createSlice({
    name: "study",
    initialState,
    reducers,
});

export const { setWeekly, setLastWeek } = studySlice.actions;

export default studySlice.reducers;
