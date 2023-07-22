'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { shoppingCartSlice } from '@/store/storeReducers/ShoppingCartSlice';
import { useAppDispatch } from '@/store/storeHooks';

import axiosMixins from "@/mixins/axiosMixins";

import './modalShoppingCartWindow.scss';

interface ModalShoppingCartWindowProps {
    token: string,
    balance: number,
    totalCost: number,
    isPointsEnough: boolean,
    isOrderPayed: boolean,
    shoppingCartItems: ShoppingCartItem[],
    changeModalShoppingCartActive: Function,
    order: Function
}

interface ShoppingCartItem {
    id: number,
    title: string,
    price: string,
    size: string,
    count: number,
    photo: string
}

const ModalShoppingCartWindow: React.FC<ModalShoppingCartWindowProps> = ({token, balance, totalCost, isPointsEnough, isOrderPayed, shoppingCartItems, changeModalShoppingCartActive, order}) => {
    const dispatch = useAppDispatch();

    const { removeItemFromShoppingCart, clearShoppingCartAction, changeItemFromShoppingCart, changeTotalCostValue } = shoppingCartSlice.actions;

    const { api, initAPI } = axiosMixins();

    const [isFAQApproved, setIsFAQApproved] = useState(false);

    const [address, setAddress] = useState('');

    const removeShoppingCartItem = (id:number) => {
        dispatch(removeItemFromShoppingCart(id));
    }

    const clearShoppingCart = () => {
        dispatch(clearShoppingCartAction());
    }

    const increaseShoppingCartItemCount = (item:any) => {
        item.count++;

        dispatch(changeItemFromShoppingCart(item));
        dispatch(changeTotalCostValue(totalCost + +(item.price)));
    }

    const decreaseShoppingCartItemCount = (item:any) => {
        if (item.count > 1) {
            item.count--;

            dispatch(changeItemFromShoppingCart(item));
            dispatch(changeTotalCostValue(totalCost - +(item.price)));
        } else {
            dispatch(removeItemFromShoppingCart(item.id));
        }
    }

    const makeAnOrder = () => {
        if(shoppingCartItems.length && address) {
            const url = new URL('https://ctfmarket.ru:8080/api/v1/product/buy');

            api.post(url.toString(), {
                token: token,
                address: address,
                products: shoppingCartItems
            })
                .then((res:any) => {
                    order();

                    setAddress('');
                    dispatch(clearShoppingCartAction());
                    console.log(res);
                });
        } else {
            console.log('Нельзя сделать заказ с пустой корзиной');
        }
    }

    useEffect(() => {
        initAPI(true);
    }, []);


    return (
        <div id="ModalShoppingCart">
            <span>
                <img src="/static/assets/images/x-markIcon.svg" alt="Назад" onClick={() => changeModalShoppingCartActive()}/>

                <p>Корзина</p>

                <img src="/static/assets/images/binIcon.svg" alt="Очистить корзину" onClick={() => clearShoppingCart()}/>
            </span>

            <div id="shoppingCartItemsWrapper">
                {shoppingCartItems.map((shoppingCartItem) => (
                    <div className="shoppingCartItem" key={shoppingCartItem.id}>
                        <img src={shoppingCartItem.photo} alt={shoppingCartItem.title} className="shoppingCartItemImage"/>

                        <div className="shoppingCartItem_Right">
                        <span>
                            <p>{ shoppingCartItem.title }</p>

                            <p>{ +(shoppingCartItem.price) * shoppingCartItem.count } баллов</p>
                        </span>

                            <div>
                            <span>
                                <button onClick={() => decreaseShoppingCartItemCount(shoppingCartItem)}>&mdash;</button>

                                <p>{ shoppingCartItem.count }</p>

                                <button onClick={() => increaseShoppingCartItemCount(shoppingCartItem)}>+</button>
                            </span>

                                <img src="/static/assets/images/itemBinIcon.svg" alt="Удалить" onClick={() => removeShoppingCartItem(shoppingCartItem.id)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="ShoppingCart_Bottom">
                <span id="ShoppingCart_BottomBalance">
                    <p>Баланс</p>

                    <p>{ balance || 0 } баллов</p>
                </span>

                <span>
                    <p>К ОПЛАТЕ</p>

                    <p>{ totalCost } баллов</p>
                </span>

                <input type="checkbox" style={{display: 'none'}} value={isFAQApproved} onChange={(event) => setIsFAQApproved(event.target.value)} id="FAQApproveInput"/>

                <div id="FAQApprove">
                    <label htmlFor="FAQApproveInput" className={ isFAQApproved ? 'checkmarkActive' : '' }>
                        <img src="/static/assets/images/checkmarkIcon.svg" alt="Принять условия FAQ"/>
                    </label>

                    <p>Я прочитал <Link href="/faq" className="faqRoute">FAQ и согласен с условиями доставки</Link></p>
                </div>

                <input type="text" placeholder="г. Москва, ул. Моросейка, д. 10, кв. 40" value={address} onChange={(event) => setAddress(event.target.value)}/>

            <button className={ (isPointsEnough && isFAQApproved) ? 'active' : '' } onClick={() => makeAnOrder()}>
                    Оплатить

                    <img src="/static/assets/images/arrowRightIcon.svg" alt="Оплатить"/>
                </button>

                {isOrderPayed && <span id="OrderIsPayed">
                    <p>Заказ оплачен</p>

                    <img src="/static/assets/images/orderIsPayedIcon.svg" alt="Заказ Оплачен"/>
                </span>}
            </div>
        </div>
    );
};

export default ModalShoppingCartWindow;