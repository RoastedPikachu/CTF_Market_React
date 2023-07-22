'use client';
import React from 'react';

import { cookieSlice } from '@/store/storeReducers/CookieSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import './cookie.scss';

const TheCookie = () => {
    const dispatch = useAppDispatch();

    const { changeIsCookieOpen } = cookieSlice.actions;

    const isCookieOpen = useAppSelector((state:AppState) => state.cookie.isCookieOpen);

    return (
        <>
            {isCookieOpen && <div id="Cookie">
                <p>Мы используем файлы-cookie, чтобы пользоваться сайтом было удобно</p>

                <button onClick={() => dispatch(changeIsCookieOpen())}>Понятно</button>
            </div>}
        </>
    );
};

export default TheCookie;