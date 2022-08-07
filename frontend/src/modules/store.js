import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { roomApi } from "../services/room";
import { userApi } from "../services/user";
import userReducer from "./userReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            roomApi.middleware,
            userApi.middleware,
        ]),
});

// setupListeners(store.dispatch);
