import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    hostUser: null,
    name: null,
    imgUrl: null,
    mode: null,
    description: null,
    maxPopulation: null,
    isPublic: null,
    members: [],
  },
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
