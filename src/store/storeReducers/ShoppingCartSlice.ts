import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShoppingCartItem } from "@/store/storeInterfaces";

interface ShoppingCartState {
    shoppingCart: IShoppingCartItem[];
    totalCost: number;
    countOfItemsInShoppingCart: number;
}

const initialState: ShoppingCartState = {
    shoppingCart: [],
    totalCost: 0,
    countOfItemsInShoppingCart: 0
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItemToShoppingCartAction(state: ShoppingCartState, action: PayloadAction<IShoppingCartItem>) {
            let duplicateItemId = 0;

            state.shoppingCart.forEach((item:IShoppingCartItem) => {
                if(item.id == action.payload.id) {
                    duplicateItemId = item.id;

                    item.count++;
                }
            });

            if(!duplicateItemId) {
                state.shoppingCart.push(action.payload);
                state.countOfItemsInShoppingCart++
            }
        },
        removeItemFromShoppingCart(state: ShoppingCartState, action: PayloadAction<number>) {
            state.countOfItemsInShoppingCart--;
            state.shoppingCart = state.shoppingCart.filter((item:IShoppingCartItem) => item.id != action.payload);
        },
        changeItemFromShoppingCart(state: ShoppingCartState, action: PayloadAction<IShoppingCartItem>) {
            state.shoppingCart.forEach((item:IShoppingCartItem) => {
                if(item.id === action.payload.id) {
                    item.count = action.payload.count;
                }
            });
        },
        clearShoppingCartAction(state: ShoppingCartState) {
            state.shoppingCart = [];
            state.countOfItemsInShoppingCart = 0;
        },
        changeTotalCostValue(state: ShoppingCartState, action: PayloadAction<number>) {
            state.totalCost = action.payload;
        },

    }
})

export default shoppingCartSlice.reducer;
