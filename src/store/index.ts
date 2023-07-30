import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cookieReducer from '@/store/storeReducers/CookieSlice';
import shoppingCartReducer from '@/store/storeReducers/ShoppingCartSlice';
import userReducer from '@/store/storeReducers/UserSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    cookie: cookieReducer,
    shoppingCart: shoppingCartReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


