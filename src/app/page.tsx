'use client';
import React, { useState, useEffect, createRef } from 'react';
import Link from 'next/link';
import axios from "axios/index";

import TheHeader from '@/widgets/shared/header/TheHeader';
import TheFooter from '@/widgets/shared/footer/TheFooter';
import TheCookie from '@/widgets/shared/cookie/TheCookie';

import ShopItemCard from '@/widgets/shared/shopItemCard/ShopItemCard';
import BannerCarousel from '@/widgets/BannerCarousel';

import './home.scss';

interface ShopItem {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[]
}

export default function Home() {
    const [isNext, setIsNext] = useState(true);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isPause, setIsPause] = useState(false);

    let [shopItems, setShopItems] = useState([] as ShopItem[]);

    let bannerInterval: ReturnType<typeof setInterval>;

    let targetId: number = 0;

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${start}/${stop}`);

        axios.get(url.toString(), {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .then((res: any) => {
                setShopItems(Object.values(res.data));
            })
            .catch((err: any) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(window.innerWidth < 480) {
            getShopItems(0, 1);
        } else {
            getShopItems(0, 2);
        }

        // window.addEventListener('focus', () => {
        //     location.reload();
        // });
    }, []);

    return (
        <>
            <TheHeader/>

            <main>
                <div id="MovingImgWrapper">
                    <div id="TopLogoText">
                        <span><p>CTF</p><img src="/static/assets/images/marketNeonText.svg" alt="MARKET"/><p>CTF</p><img src="/static/assets/images/marketNeonText.svg" alt="MARKET"/><p>CTF</p><img src="/static/assets/images/marketNeonText.svg" alt="MARKET"/><p>CTF</p><img src="/static/assets/images/marketNeonText.svg" alt="MARKET"/><p>CTF</p><img src="/static/assets/images/marketNeonText.svg" alt="MARKET"/></span>
                    </div>

                    <div id="BottomLogoText">
                        <p>ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023</p>
                    </div>
                </div>

                <img src="/static/assets/images/SignInBackground.svg" alt="Задний фон" id="BgImage"/>

                <img src="/static/assets/images/tagline.svg" alt="Привет! Мы - движение CTF, покупай фирменный мерч - оплачивай CTF-койнами" id="Tagline"/>

                <BannerCarousel/>

                <span id="PopularShopItem_Text">
                    <p>Популярные товары</p>

                    <Link href="/shopItems" className="seeMoreItemsRoute">Смотреть всe</Link>
                </span>

                <div id="PopularShopItemsWrapper">
                    <ShopItemCard
                        shopItems={shopItems}
                        initialShopItems={shopItems}
                    />
                </div>

                <img src="/static/assets/images/bugBountyBanner.svg" alt="BugBounty" id="BugBounty"/>
            </main>

            <TheFooter/>

            <TheCookie/>
        </>
    );
};

