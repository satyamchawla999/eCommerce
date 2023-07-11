import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import usersReducer from "../features/user/userSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);