"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { userSlice } from "@/store/storeReducers/UserSlice";
import { shoppingCartSlice } from "@/store/storeReducers/ShoppingCartSlice";
import { cookieSlice } from "@/store/storeReducers/CookieSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { AppState } from "@/store";

import "./modalProfileWindow.scss";

interface ModalProfileWindowProps {
  phone: string;
  email: string;
  address: string;
  fullName: string;
  balance: number;
  isSignIn: boolean;
  isModalProfileWindowOpen: boolean;
  changeModalProfileOpen: Function;
  clearUserData: Function;
}

const ModalProfileWindow: React.FC<ModalProfileWindowProps> = ({
  phone,
  email,
  address,
  fullName,
  balance,
  isSignIn,
  isModalProfileWindowOpen,
  changeModalProfileOpen,
  clearUserData,
}) => {
  const dispatch = useAppDispatch();

  const { changeIsAdmin, changeIsSignIn } = userSlice.actions;
  const { clearShoppingCartAction } = shoppingCartSlice.actions;
  const { clearIsCookieOpen } = cookieSlice.actions;

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(isModalProfileWindowOpen);

  const signOut = () => {
    clearUserData();

    if (useAppSelector((state: AppState) => state.user.isAdmin)) {
      dispatch(changeIsAdmin());
    }

    dispatch(changeIsSignIn());
    dispatch(clearShoppingCartAction());
    dispatch(clearIsCookieOpen());

    (function deleteAllCookies() {
      let cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    })();

    window.location.reload();
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 480);
  }, []);

  return (
    <div className="absolute top-[25px] mlarge:top-0 left-[5%] mlarge:left-0 py-[20px] mlarge:py-[30px] mlarge:px-[40px] w-[260px] mlarge:w-full h-[304px] mlarge:h-screen bg-[#1e1e1e] border-[2px] border-[#4b4b4b] rounded-[20px] mlarge:rounded-0">
      {!isMobile && (
        <img
          src="/static/assets/images/x-markIcon.svg"
          alt="Закрыть"
          className="absolute top-[30px] right-[20px] w-[15px] h-[15px] cursor-pointer"
          onClick={() => {
            changeModalProfileOpen();
            setIsOpen(!isOpen);
          }}
        />
      )}

      {isMobile && (
        <img
          src="/static/assets/images/hamburgerIcon.svg"
          alt="Закрыть"
          id="ModalProfileWindow_HamburgerClose"
          className="w-[25px] h-[25px] cursor-pointer"
          onClick={() => {
            changeModalProfileOpen();
            setIsOpen(!isOpen);
          }}
        />
      )}

      <div className="flex justify-between items-center pb-[15px] mlarge:py-[15px] px-[20px] mlarge:px-0 w-full height-[80px] border-b-[1px] mlarge:border-b-[2px] border-[#4b4b4b]">
        <img
          src="/static/assets/images/userAvatar.svg"
          alt="Профиль"
          className="w-[60px] h-[60px]"
        />

        <span className="flex items-center flex-wrap ml-[0px] w-full h-[35px] mlarge:h-auto">
          <p className="mt-[-2.5px] ml-[10px] w-full text-[#ffffff] text-[1rem] mlarge:text-[1.125rem] font-regular">
            {fullName}
          </p>

          <p className="mt-[2.5px] text-[0.875rem] mlarge:text-[1rem]">
            {phone}
          </p>
        </span>
      </div>

      <div className="py-[12.5px] mlarge:py-[10px] px-[20px] w-full h-[75px] border-y-[1px] mlarge:border-t-0 mlarge:border-b-[0.5px] border-[#4b4b4b]">
        <p className="text-[#ffffff] text-[1.125rem] font-regular">Почта</p>

        <p className="text-[1rem]">{email}</p>
      </div>

      {isSignIn && isMobile && (
        <button className="hamburgerMenuRoute">
          <Link href="/" className="hamburgerMenuRoute_Text">
            Главная
          </Link>
        </button>
      )}

      {isSignIn && isMobile && (
        <button className="hamburgerMenuRoute">
          <Link href="/shopItems" className="hamburgerMenuRoute_Text">
            Товары
          </Link>
        </button>
      )}

      {isSignIn && isMobile && (
        <button className="hamburgerMenuRoute">
          <Link href="/signIn" className="hamburgerMenuRoute_Text">
            Вход
          </Link>
        </button>
      )}

      {isSignIn && isMobile && (
        <button className="hamburgerMenuRoute">
          <Link href="/signUp" className="hamburgerMenuRoute_Text">
            Регистрация
          </Link>
        </button>
      )}

      <button
        onClick={() => signOut()}
        className="flex items-center mlarge:py-[10px] px-[20px] mlarge:px-0 w-full h-[60px] bg-transparent border-y-[1px] border-[#4b4b4b] text-[#fa3e3e] text-[1.125rem] font-bold cursor-pointer outline-none"
      >
        Выйти из аккаунта
      </button>

      <span className="flex justify-between items-center px-[20px] mlarge:p-0 w-full h-[60px] border-t-[0.5px] border-[#4b4b4b]">
        <p className="ml-0 text-[#ffffff] text-[1.125rem] font-bold">Баланс:</p>

        <span className="flex justify-end items-center">
          <p className="text-[1.25rem] ml-[20px]">{balance}</p>

          <img
            src="/static/assets/images/ctfCoinIcon.svg"
            alt="CTFCoin"
            className="ml-[5px] w-[25px] h-[25px] cursor-default"
          />
        </span>
      </span>
    </div>
  );
};

export default ModalProfileWindow;
