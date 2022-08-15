import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { roomApi } from "../services/room";
import { authApi } from "../services/auth";
import { userApi } from "../services/user";
import userReducer from "./userReducer";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const reducers = combineReducers({
    user: userReducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  reducers
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            roomApi.middleware,
            authApi.middleware,
            userApi.middleware,
        ]),
});

// setupListeners(store.dispatch);
