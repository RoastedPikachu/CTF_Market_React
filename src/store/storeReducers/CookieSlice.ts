import { createSlice } from "@reduxjs/toolkit";

interface CookieState {
    isCookieOpen: boolean;
}

const initialState: CookieState = {
    isCookieOpen: false
}

export const cookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        changeIsCookieOpen(state: CookieState) {
            state.isCookieOpen = !state.isCookieOpen;
        },
        clearIsCookieOpen(state: CookieState) {
            state.isCookieOpen = false;
        }
    }
});

export default cookieSlice.reducer;
