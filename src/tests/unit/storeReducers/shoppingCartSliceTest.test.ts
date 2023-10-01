import shoppingCartSlice, { addItemToShoppingCartAction, removeItemFromShoppingCart, changeItemFromShoppingCart, clearShoppingCartAction, changeTotalCostValue } from '@/store/storeReducers/ShoppingCartSlice';
// import { useAppDispatch, useAppSelector } from '@/store/storeHooks';

import { IShoppingCartItem } from "@/store/storeInterfaces";
import { AppState } from "@/store";


interface ShoppingCartState {
    shoppingCart: IShoppingCartItem[];
    totalCost: number;
    countOfItemsInShoppingCart: number;
}

describe('Тестирование редюсера для корзины', () => {
    // let shoppingCart:IShoppingCartItem[];
    // let totalCost:number;
    // let countOfItemsInShoppingCart:number;

    beforeAll(() => {

        // shoppingCart = useAppSelector((state:AppState) => state.shoppingCart.shoppingCart);
        // totalCost = useAppSelector((state:AppState) => state.shoppingCart.totalCost);
        // countOfItemsInShoppingCart = useAppSelector((state:AppState) => state.shoppingCart.countOfItemsInShoppingCart);
    })

    test('Проверка добавления товара в корзину', () => {

        const shoppingCartItem:IShoppingCartItem = {
            id: 1,
            title: 'Футболка',
            price: '4000',
            size: 'XL',
            count: 1,
            photo: 'no photo',
        }

        expect(shoppingCartSlice({shoppingCart: [], totalCost: 0, countOfItemsInShoppingCart: 0}, addItemToShoppingCartAction(shoppingCartItem))).toEqual({shoppingCart: [{id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 1, photo: 'no photo',}], totalCost: 0, countOfItemsInShoppingCart: 1});
    })

    test('Проверка удаления товара из корзины', () => {
        expect(shoppingCartSlice({shoppingCart: [{id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 1, photo: 'no photo',}], totalCost: 4000, countOfItemsInShoppingCart: 1}, removeItemFromShoppingCart(1))).toEqual({shoppingCart: [], totalCost: 4000, countOfItemsInShoppingCart: 0});
    })

    test('Проверка изменения кол-ва товара в корзине', () => {
        expect(shoppingCartSlice({shoppingCart: [{id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 1, photo: 'no photo',}], totalCost: 4000, countOfItemsInShoppingCart: 1}, changeItemFromShoppingCart({id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 3, photo: 'no photo',}))).toEqual({shoppingCart: [{id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 3, photo: 'no photo',}], totalCost: 4000, countOfItemsInShoppingCart: 1});
    })

    test('Проверка очистки корзины', () => {
        expect(shoppingCartSlice({shoppingCart: [{id: 1, title: 'Футболка', price: '4000', size: 'XL', count: 1, photo: 'no photo',}], totalCost: 4000, countOfItemsInShoppingCart: 1}, clearShoppingCartAction())).toEqual({shoppingCart: [], totalCost: 4000, countOfItemsInShoppingCart: 0});
    })

    test('Проверка изменения полной стоимости товаров в корзине', () => {
        expect(shoppingCartSlice({shoppingCart: [], totalCost: 0, countOfItemsInShoppingCart: 0}, changeTotalCostValue(4000))).toEqual({shoppingCart: [], totalCost: 4000, countOfItemsInShoppingCart: 0});
    })
})