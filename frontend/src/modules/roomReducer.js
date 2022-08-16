import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
