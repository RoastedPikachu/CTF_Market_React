import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cookieReducer from '@/store/storeReducers/CookieSlice';
import shoppingCartReducer from '@/store/storeReducers/ShoppingCartSlice';
import userReducer from '@/store/storeReducers/UserSlice';

const rootReducer = combineReducers({
    cookie: cookieReducer,
    shoppingCart: shoppingCartReducer,
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


