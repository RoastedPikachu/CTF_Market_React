"use client";
import React from "react";

import { cookieSlice } from "@/store/storeReducers/CookieSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { AppState } from "@/store";

import "./cookie.scss";

const TheCookie = () => {
  const dispatch = useAppDispatch();

  const { changeIsCookieOpen } = cookieSlice.actions;

  const isCookieOpen = useAppSelector(
    (state: AppState) => state.cookie.isCookieOpen
  );

  return (
    <>
      {isCookieOpen && (
        <div className="fixed flex mlarge:flex-wrap justify-between mlarge:justify-center items-center bottom-[20px] mlarge:bottom-0 left-[10%] mlarge:left-0 py-[5px] mlarge:py-[15px] pl-[30px] pr-[17.5px] mlarge:px-0 w-[80%] mlarge:w-[calc(100%-3px)] h-[70px] mlarge:h-[150px] bg-[#2c2d2d] border-[1.5px] border-[#707070] rounded-[45px] mlarge:rounded-0 z-20">
          <p className="text-[#ffffff] text-[1.5rem] mlarge:text-[1.25rem] mmedium:text-[1.125rem] msmall:text-[1rem] font-bold mlarge:font-regular mlarge:text-center">
            Мы используем файлы-cookie, чтобы пользоваться сайтом было удобно
          </p>

          <button
            onClick={() => dispatch(changeIsCookieOpen())}
            className="w-[170px] mlarge:w-[65%] h-[50px] mlarge:h-[40px] bg-[#42d4ba] hover:bg-[rgba(46,236,197,0.1)] border-0 hover:border-[1.5px] hover:border-[#2eecc5] rounded-[30px] text-[#ffffff] hover:text-[#42d4ba] text-[1.5rem] mlarge:text-[1.25rem] font-bold outline-none cursor-pointer duration-[250ms] ease-in-out"
          >
            Понятно
          </button>
        </div>
      )}
    </>
  );
};

export default TheCookie;
