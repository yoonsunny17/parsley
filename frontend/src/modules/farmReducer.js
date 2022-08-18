import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    position: 1,
    itemSeedId: 1,
    itemFertilizerId: 1,
    itemWaterId: 1,
    herbBook: [],
};

const reducers = {
    setPosition: (state, { payload: position }) => {
        state.position = position;
    },
    setSeed: (state, { payload: itemSeedId }) => {
        state.itemSeedId = itemSeedId;
    },
    setFertilizer: (state, { payload: itemFertilizerId }) => {
        state.itemFertilizerId = itemFertilizerId;
    },
    setWater: (state, { payload: itemWaterId }) => {
        state.itemWaterId = itemWaterId;
    },
    setHerbBook: (state, { payload: herbBook }) => {
        state.herbBook = herbBook;
    },
};

export const farmSlice = createSlice({
    name: "farm",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setPosition,
    setSeed,
    setFertilizer,
    setWater,
    setProfile,
    setHerbBook,
} = farmSlice.actions;

export default farmSlice.reducer;
