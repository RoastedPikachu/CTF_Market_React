'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

import { useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import './footer.scss';

const TheFooter = () => {
    const isSignIn = useAppSelector((state:AppState) => state.user.isSignIn);

    useEffect(() => {
        console.log('А в подвале дети сидят(((');
    }, []);

    return (
        <footer style={{backgroundImage: `url('/static/assets/images/footerBackground.svg')`}}>
            <div id="BlurContacts">
                <h2>ИНФОРМАЦИЯ</h2>

                <p>ИНФОРМАЦИЯ</p>
            </div>

            <nav>
                <Link href="/" className="footerRoute">Главная</Link>

                <Link href="/shopItems" className="footerRoute">Товары</Link>

                <span>
                    <Link
                      href="/signIn"
                      className={ `footerRoute ${isSignIn ? 'disabledRoute' : ''}` }
                    >
                        Вход/
                    </Link>

                    <Link
                        href="/signUp"
                        className={`footerRoute ${isSignIn ? 'disabledRoute' : ''}`}
                    >
                        Регистрация
                    </Link>
                </span>
            </nav>

            <div id="BottomInfo">
                <div id="BottomInfo_Contacts">
                    <h3>КОНТАКТЫ</h3>

                    <span>
                        <p>Тел.</p>

                        <p> +7(495)640-53-30</p>
                    </span>

                    <span>
                        <p>Почта</p>

                        <p>info@aciso.ru</p>
                    </span>
                </div>

                <div id="BottomInfo_SocialNetworks">
                    <h3>СОЦИАЛЬНЫЕ СЕТИ</h3>

                    <span>
                        <p>CTF news</p>

                        <a href="https://t.me/ctfnews" id="BottomInfo_SocialNetworks_Tg">
                            <img src="/static/assets/images/tgIcon.svg" alt="Телеграм"/>
                        </a>

                        <a href="https://vk.com/ctfnews" id="BottomInfo_SocialNetworks_Vk">
                            <img src="/static/assets/images/vkIcon.svg" alt="Вконтакте"/>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default TheFooter;