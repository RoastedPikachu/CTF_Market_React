import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {shoppingCartSlice} from "@/store/storeReducers/ShoppingCartSlice";

interface UserState {
    isSignIn: boolean;
    isAdmin: boolean;
    fullName: string;
}

const initialState: UserState = {
    isSignIn: false,
    isAdmin: false,
    fullName: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeIsSignIn(state: UserState) {
            state.isSignIn = !state.isSignIn;
        },
        changeIsAdmin(state: UserState) {
            state.isAdmin = !state.isAdmin;
        },
        addUserFullName(state: UserState, action: PayloadAction<string>) {
            state.fullName = action.payload;
        }
    }
});

export default userSlice.reducer;
