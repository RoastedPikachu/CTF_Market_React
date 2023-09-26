'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import axiosMixins from "@/mixins/axiosMixins";

import './signUp.scss';

const Page = () => {
    const router = useRouter();

    let { api, errorMess, initAPI } = axiosMixins();

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useMemo(() => {
        setTimeout(() => errorMess = '', 5000);
    }, [errorMess]);

    const setDataAboutUser = () => {
        const url = new URL('https://ctfmarket.ru:8080/api/v1/auth/register/');

        const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        if (phoneRegex.test(phone) && emailRegex.test(email)) {

            if (password.length && token.length) {
                api.post(url.toString(), {
                    secret_key: token,
                    password: password,
                    email: email,
                    phone: phone
                })
                    .then((res:any) => {
                        if (res.data.error) {
                            throw res.data.error;
                        } else {
                            router.push('/signIn');
                        }
                    });

            } else if (!password.length && token.length) {
                errorMess = 'Введите пароль';
            } else if (!token.length && password.length) {
                errorMess = 'Введите токен';
            } else {
                errorMess = 'Введите токен и пароль';
            }

        } else if (!phoneRegex.test(phone)) {
            errorMess = 'Телефон введён в неправильном формате';
        } else if (!emailRegex.test(email)) {
            errorMess = 'Почта введена в неправильном формате';
        } else {
            errorMess = 'Телефон и почта введены в неправильном формате';
        }
    }

    useEffect(() => {
        initAPI(true);
    }, []);

    return (
        <main style={{backgroundImage: `url('/static/assets/images/SignInBackground.svg')`}}>
            <div id="Register">
                <Link href="/" className="registerLogoRoute">
                    <img src="/static/assets/images/Logo.svg" alt="CTFmarket"/>
                </Link>

                <form>
                    <div>
                        <img src="/static/assets/images/manIcon.svg" alt="ФИО"/>

                        <input type="text" placeholder="ФИО" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>

                    <div>
                        <img src="/static/assets/images/passwordIcon.svg" alt="Токен"/>

                        <input type="text" placeholder="Введите Токен" value={token} onChange={(event) => setToken(event.target.value)}/>
                    </div>

                    <div>
                        <img src="/static/assets/images/emailIcon.svg" alt="Почта"/>

                        <input type="text" placeholder="Почта" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <img src="/static/assets/images/phoneIcon.svg" alt="Телефон"/>

                        <input type="text" placeholder="Телефон" value={phone} onChange={(event) => setPhone(event.target.value)}/>
                    </div>

                    <div>
                        <img src="/static/assets/images/passwordIcon.svg" alt="Пароль"/>

                        <input type="password" placeholder="Пароль" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    {errorMess && <p id="Register_Error">{ errorMess }</p>}

                    <button type="button" onClick={() => setDataAboutUser()}>Зарегистрироваться</button>
                </form>

                <p id="Register_SignIn">У вас уже есть аккаунт? <Link href="/signIn" className="route">Войти</Link></p>
            </div>
        </main>
    );
};

export default Page;