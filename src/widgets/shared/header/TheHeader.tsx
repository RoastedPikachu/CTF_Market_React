'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

import { shoppingCartSlice } from '@/store/storeReducers/ShoppingCartSlice';
import { userSlice } from '@/store/storeReducers/UserSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import axiosMixins from "@/mixins/axiosMixins";

import ModalProfileWindow from '@/widgets/features/modalWindows/modalProfileWindow/ModalProfileWindow';
import ModalShoppingCartWindow from '@/widgets/features/modalWindows/modalShoppingCardWindow/ModalShoppingCartWindow';

import './header.scss';

const TheHeader = () => {
    const dispatch = useAppDispatch();

    const { api, initAPI } = axiosMixins();

    const { changeTotalCostValue } = shoppingCartSlice.actions;
    const { changeIsAdmin } = userSlice.actions;

    const isSignIn = useAppSelector((state:AppState) => state.user.isSignIn);
    const [isModalProfileWindowOpen, setIsModalProfileWindowOpen] = useState(false);
    const [isModalShoppingCartOpen, setIsModalShoppingCartOpen] = useState(false);
    const [isOrderPayed, setIsOrderPayed] = useState(false);
    const [isPointsEnough, setIsPointsEnough] = useState(false);

    const totalCost = useAppSelector((state:AppState) => state.shoppingCart.totalCost);

    const countOfItemsInShoppingCart = useAppSelector((state:AppState) => state.shoppingCart.countOfItemsInShoppingCart);

    const shoppingCartItems = useAppSelector((state:AppState) => state.shoppingCart.shoppingCart);

    const [balance, setBalance] = useState(0);

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');

    useMemo(() => {
        if(shoppingCartItems.length) {
            const accumArr = shoppingCartItems.map(item => item.count > 1 ? +item.price * item.count : +item.price);

            dispatch(changeTotalCostValue(accumArr.reduce((accum, item) => accum += item)));
        } else {
            dispatch(changeTotalCostValue(0));
        }

        setIsPointsEnough(totalCost <= balance);
    }, [useAppSelector((state:AppState) => state.shoppingCart.shoppingCart)]);

    const changeIsModalShoppingCartOpenStatus = () => {
        if (isModalShoppingCartOpen) {
            setIsOrderPayed(false);
        }

        setIsModalShoppingCartOpen(!isModalShoppingCartOpen);
    }

    const getCookie = (name:string) => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return (matches ? decodeURIComponent(matches[1]) : undefined).toString();
    }

    const getInfoAboutUserByToken = () => {
        const url = new URL('https://ctfmarket.ru:8080/api/v1/user/get');

        const token = getCookie('token');

        api.post(url.toString(), { token: token })
            .then((res:any) => {
                setBalance(res.data.score);

                setEmail(res.data.email);
                setFullName(`${res.data.first_name} ${res.data.last_name}`);
                setPhone(res.data.phone);

                setIsPointsEnough(totalCost <= balance);

                if(res.data.is_admin) {
                    dispatch(changeIsAdmin());
                }
            });
    }

    function makeOrder() {
        setIsOrderPayed(true);
        getInfoAboutUserByToken();
    }

    function clearUserData() {
        setBalance(0);
        setEmail('');
        setFullName('');
        setPhone('');
    }

    useEffect(() => {
        if(isSignIn) {
            initAPI(true);

            getInfoAboutUserByToken();
        }

        window.addEventListener('click', event => {
            if(event.target !== null) {
                const target = event.target as HTMLElement;

                if(!target.closest('header') && !target.closest('.shoppingCartItem_Right')) {
                    if(isModalProfileWindowOpen && isModalShoppingCartOpen) {
                        setIsModalShoppingCartOpen(false);
                        setIsModalProfileWindowOpen(false);
                    } else if(isModalProfileWindowOpen && !isModalShoppingCartOpen) {
                        setIsModalProfileWindowOpen(false);
                    } else if (isModalShoppingCartOpen && !isModalProfileWindowOpen){
                        setIsModalShoppingCartOpen(false);
                    }
                }
            }
        });
    })

    return (
        <header>
            <img src="/static/assets/images/userAvatar.svg" alt="Профиль" id="ProfileImg"
                 onClick={() => setIsModalProfileWindowOpen(!isModalProfileWindowOpen)}
            />

            <img src="/static/assets/images/hamburgerIcon.svg" alt="Меню" id="HamburgerMenu"
                 onClick={() => setIsModalProfileWindowOpen(!isModalProfileWindowOpen)}
            />

            {(isModalProfileWindowOpen && isSignIn) && <ModalProfileWindow
                phone={phone}
                email={email}
                address={address}
                fullName={fullName}
                balance={balance}
                isSignIn={isSignIn}
                isModalProfileWindowOpen={isModalProfileWindowOpen}
                changeModalProfileOpen={setIsModalProfileWindowOpen}
                clearUserData={clearUserData}
            />}

            <nav>
                <Link href="/" className="route">Главная</Link>

                <Link href="/shopItems/all" className="route">Товары</Link>

                <span>
                    <Link
                        href="/signIn"
                        className={ `route ${isSignIn ? 'disabledRoute' : ''}`}
                    >
                        Вход/
                    </Link>

                    <Link
                        href="/signUp"
                        className={ `route ${isSignIn ? 'disabledRoute' : ''}`}
                    >
                        Регистрация
                    </Link>
                </span>
            </nav>

            <span>
                <img src="/static/assets/images/shoppingCartIcon.svg" alt="Корзина"
                     onClick={() => changeIsModalShoppingCartOpenStatus()}/>

                <p>{ countOfItemsInShoppingCart }</p>
            </span>

            {isModalShoppingCartOpen && <ModalShoppingCartWindow
                token={getCookie('token')}
                balance={balance}
                totalCost={totalCost}
                isPointsEnough={isPointsEnough}
                isOrderPayed={isOrderPayed}
                shoppingCartItems={shoppingCartItems}
                changeModalShoppingCartActive={changeIsModalShoppingCartOpenStatus}
                order={makeOrder}
            />}
        </header>
    );
};

export default TheHeader;