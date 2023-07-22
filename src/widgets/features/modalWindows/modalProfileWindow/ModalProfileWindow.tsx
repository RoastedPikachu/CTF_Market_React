'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { userSlice } from '@/store/storeReducers/UserSlice';
import { shoppingCartSlice } from '@/store/storeReducers/ShoppingCartSlice';
import { cookieSlice } from '@/store/storeReducers/CookieSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import './modalProfileWindow.scss';

interface ModalProfileWindowProps {
    phone: string,
    email: string,
    address: string,
    fullName: string,
    balance: number,
    isSignIn: boolean,
    isModalProfileWindowOpen: boolean,
    changeModalProfileOpen: Function,
    clearUserData: Function
}

const ModalProfileWindow: React.FC<ModalProfileWindowProps> = ({phone, email, address, fullName, balance, isSignIn, isModalProfileWindowOpen, changeModalProfileOpen, clearUserData}) => {
    const dispatch = useAppDispatch();

    const { changeIsAdmin, changeIsSignIn } = userSlice.actions;
    const { clearShoppingCartAction } = shoppingCartSlice.actions;
    const { clearIsCookieOpen } = cookieSlice.actions;

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(isModalProfileWindowOpen);

    const signOut = () => {
        clearUserData();

        if(useAppSelector((state:AppState) => state.user.isAdmin)) {
            dispatch(changeIsAdmin());
        }

        dispatch(changeIsSignIn());
        dispatch(clearShoppingCartAction());
        dispatch(clearIsCookieOpen());

        (function deleteAllCookies() {
            let cookies = document.cookie.split(";");

            for(let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        })();

        window.location.reload();
    }

    useEffect(() => {
        setIsMobile(window.innerWidth < 480);
    }, []);

    return (
        <div id="ModalProfileWindow">
            {!isMobile && <img src="/static/assets/images/x-markIcon.svg" alt="Закрыть" id="ModalProfileWindow_Close"
                               onClick={() => {changeModalProfileOpen(); setIsOpen(!isOpen)}}
            />}

            {isMobile && <img src="/static/assets/images/hamburgerIcon.svg" alt="Закрыть" id="ModalProfileWindow_HamburgerClose"
                              onClick={() => {changeModalProfileOpen(); setIsOpen(!isOpen)}}
            />}

            <div id="ModalProfileWindow_UserBrieflyInfo">
                <img src="/static/assets/images/userAvatar.svg" alt="Профиль"/>

                <span>
                  <p>{ fullName }</p>

                  <p>{ phone }</p>
              </span>
            </div>

            <div id="ModalProfileWindow_Email">
                <p>Почта</p>

                <p>{ email }</p>
            </div>

            {(isSignIn && isMobile) && <button className="hamburgerMenuRoute">
                <Link href="/" className="hamburgerMenuRoute_Text">Главная</Link>
            </button>}

            {(isSignIn && isMobile) && <button className="hamburgerMenuRoute">
                <Link href="/shopItems" className="hamburgerMenuRoute_Text">Товары</Link>
            </button>}

            {(isSignIn && isMobile) && <button className="hamburgerMenuRoute">
                <Link href="/signIn" className="hamburgerMenuRoute_Text">Вход</Link>
            </button>}

            {(isSignIn && isMobile) && <button className="hamburgerMenuRoute">
                <Link href="/signUp" className="hamburgerMenuRoute_Text">Регистрация</Link>
            </button>}

            <button onClick={() => signOut()}>Выйти из аккаунта</button>

            <span id="ModalProfileWindow_Balance">
                <p>Баланс: </p>

                <span>
                    <p>{ balance }</p>

                    <img src="/static/assets/images/ctfCoinIcon.svg" alt="CTFCoin"/>
                </span>
            </span>
        </div>
    );
};

export default ModalProfileWindow;