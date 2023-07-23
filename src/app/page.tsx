'use client';
import React, { useState, useEffect, createRef } from 'react';
import Link from 'next/link';
import axios from "axios/index";

// @ts-ignore
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TheHeader from '@/widgets/shared/header/TheHeader';
import TheFooter from '@/widgets/shared/footer/TheFooter';
import TheCookie from '@/widgets/shared/cookie/TheCookie';

import ShopItemCard from '@/widgets/shared/shopItemCard/ShopItemCard';

import './home.scss';

interface Category {
    id: number,
    title: string,
    isActive: boolean
}

interface Banner {
    id: number,
    title: string,
    isActive: boolean,
    description: string,
    image: string,
    nodeRef: React.RefObject<HTMLInputElement>
}

interface ShopItem {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[]
}

export default function Home() {
    let [isNext, setIsNext] = useState(true);
    let [isPrevious, setIsPrevious] = useState(false);
    let [isPause, setIsPause] = useState(false);

    let [targetId, setTargetId] = useState(0);

    let [categories, setCategories] = useState([
        {
            id: 1,
            title: 'Кружки',
            isActive: true
        },
        {
            id: 2,
            title: 'Футболки',
            isActive: false
        },
        {
            id: 3,
            title: 'Толстовки',
            isActive: false
        },
        {
            id: 4,
            title: 'Книги',
            isActive: false
        }
    ] as Category[]);

    let [banners, setBanners] = useState([
        {
            id: 1,
            title: 'Кружки',
            isActive: true,
            description: 'Баннер кружек',
            image: '/static/assets/images/mugBanner.svg',
            nodeRef: createRef()
        },
        {
            id: 2,
            title: 'Футболки',
            isActive: false,
            description: 'Баннер футболок',
            image: '/static/assets/images/tshirtBanner.svg',
            nodeRef: createRef()
        },
        {
            id: 3,
            title: 'Толстовки',
            isActive: false,
            description: 'Баннер толстовок',
            image: '/static/assets/images/sweatshirtBanner.svg',
            nodeRef: createRef()
        },
        {
            id: 4,
            title: 'Книги',
            isActive: false,
            description: 'Баннер книжек',
            image: '/static/assets/images/bookBanner.svg',
            nodeRef: createRef()
        },
    ] as Banner[]);

    let [shopItems, setShopItems] = useState([] as ShopItem[]);

    let bannerInterval: ReturnType<typeof setInterval>;

    const setBanner = (category:Category) => {
        if(!isPause) {
            banners.forEach(item => {
                if(item.isActive) {
                    setIsNext(item.id < category.id);
                    setIsPrevious(item.id > category.id);

                    setTimeout(() => {
                        setIsNext(true);
                        setIsPrevious(false);
                    }, 1500);
                }

                if(item.title != category.title) {
                    item.isActive = false;
                } else {
                    item.isActive = true;
                    setTargetId(item.id - 1);
                }
            });

            categories.forEach(item => item.isActive = false);

            category.isActive = true;
            setIsPause(true);

            clearInterval(bannerInterval);
            bannerInterval = setInterval(() => getNextPhoto(), 5000);
            setTimeout(() => setIsPause(false), 1500);
        }
    }

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${start}/${stop}`);

        axios.get(url.toString(), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then((res:any) => {
                setShopItems(Object.values(res.data));
            })
            .catch((err:any) => {
                console.log(err);
            })
    }

    const getNextPhoto = () => {
        console.log(targetId);
        categories[targetId].isActive = false;
        banners[targetId].isActive = false;

        if(targetId === categories.length - 1) {
            setTargetId(-1);
        }

        setTargetId(targetId++);

        categories[targetId].isActive = true;
        banners[targetId].isActive = true;
    }

    useEffect(() => {
        bannerInterval = setInterval(() => getNextPhoto(), 5000);

        if(window.innerWidth < 480) {
            getShopItems(0, 1);
        } else {
            getShopItems(0, 2);
        }

        window.addEventListener('focus', () => {
            location.reload();
        });
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

                <div id="Categories">
                    {categories.map((category:Category) => (
                        <p key={category.id} className={ category.isActive ? 'active' : '' } onClick={() => setBanner(category)}>{ category.title }</p>
                    ))}
                </div>

                <div className={`bannerWrapper ${isNext ? 'nextSliderEl' : ''} ${isPrevious ? 'previousSliderEl' : ''}`}>
                    <TransitionGroup>
                        {banners.map((banner:Banner) => (
                            <CSSTransition
                                key={banner.id}
                                nodeRef={banner.nodeRef}
                                timeout={1500}
                                classNames='banner'
                            >
                                {banner.isActive && <div ref={banner.nodeRef}>
                                    <Link href={`/shopItems/${banner.title}`} className="bannerImgRoute">
                                        <img src={banner.image} alt={banner.description}/>
                                    </Link>
                                </div>}
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>

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

