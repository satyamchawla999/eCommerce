import { configureStore, combineReducers } from "@reduxjs/toolkit";
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



// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// import usersReducer from "../features/user/userSlice";
// import cartReducer from "../features/user/cartSlice";

// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, usersReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

// export const persistor = persistStore(store);