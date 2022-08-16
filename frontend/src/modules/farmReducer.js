import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: 1,
  itemSeedId: 1,
  itemFertilizerId: 1,
  itemWaterId: 1,
  profileName: "프로필을 선택해주세요",
  profileDescription: "",
  profileUrl:
    "https://cdn-icons.flaticon.com/png/512/3985/premium/3985429.png?token=exp=1660664614~hmac=e3e32aa3474f593e8eec87bd6ab56b48",
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
  setProfile: (
    state,
    { payload: { profileName, profileDescription, profileUrl } }
  ) => {
    state.profileName = profileName;
    state.profileDescription = profileDescription;
    state.profileUrl = profileUrl;
  },
};

export const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers,
});

export const { setPosition, setSeed, setFertilizer, setWater, setProfile } =
  farmSlice.actions;

export default farmSlice.reducer;
