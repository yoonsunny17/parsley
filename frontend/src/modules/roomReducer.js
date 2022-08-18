import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

// room: {
//             id: null,
//         hostUser: null,
//         members: [],
//         name: null,
//         imageUrl: null,
//         mode: null,
//         description: null,
//         maxPopulation: null,
//         isPublic: null,
//         hashtags: [],
// }

const initialState = {
    room: null,
};

const reducers = {
    setRoom: (state, { payload: room }) => {
        state.room = room;
    },
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
