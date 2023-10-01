'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { userSlice } from '@/store/storeReducers/UserSlice';
import { cookieSlice } from '@/store/storeReducers/CookieSlice';
import { useAppDispatch } from '@/store/storeHooks';

import axiosMixins from "@/mixins/axiosMixins";

import './signIn.scss';

const Page = () => {
    let router = useRouter();

    let { api, errorMess, initAPI } = axiosMixins();

    const dispatch = useAppDispatch();

    const {changeIsSignIn} = userSlice.actions;
    const {changeIsCookieOpen} = cookieSlice.actions;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setSignInData = () => {
        const url = new URL('https://ctfmarket.ru:8080/api/v1/auth/login/');

        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        if(emailRegex.test(email)) {
            if(password.length) {
                api.post(url.toString(), {
                    email: email,
                    password: password
                })
                    .then((res:any) => {
                        if(res.data.error) {
                            throw res.data.error;
                        } else {
                            document.cookie =`token=${res.data.token}; path=/; max-age=2592000; secure=true`;
                            dispatch(changeIsSignIn());
                            dispatch(changeIsCookieOpen());

                            router.push('/');
                        }
                    });
            } else {
                errorMess = 'Введите пароль';
            }

        } else {
            errorMess = 'Почта введена в неправильном формате';

            setTimeout(() => errorMess = '', 5000);
        }
    }

    useEffect(() => {
        initAPI(true);
    }, [])

    return (
        <main style={{backgroundImage: `url('/static/assets/images/SignInBackground.svg')`}} data-testid='signIn'>
            <div id="SignIn">
                <Link href="/" className="signInLogoRoute">
                    <img src="/static/assets/images/Logo.svg" alt="CTFMarket"/>
                </Link>

                <form>
                    <div>
                        <img src="/static/assets/images/emailIcon.svg" alt="Почта"/>

                        <input type="text" placeholder="Почта" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <img src="/static/assets/images/passwordIcon.svg" alt="Пароль"/>

                        <input type="password" placeholder="Пароль" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    {errorMess && <p id="SignIn_Error">{ errorMess }</p>}

                    <p onClick={() => console.log('Больше не забывай, чмоки 𓂸')}>Забыли пароль?</p>

                    <button type="button" onClick={() => setSignInData()}>Войти</button>
                </form>

                <p id="SignIn_Register">У вас ещё нет аккаунта? <Link href="/signUp" className="route">Зарегистрироваться</Link></p>
            </div>
        </main>
    );
};

export default Page;