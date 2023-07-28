'use client';
import React, { useState, useEffect, createRef } from 'react';
import Link from 'next/link';
import axios from "axios/index";

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
    const [isNext, setIsNext] = useState(true);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const [targetId, setTargetId] = useState(0);

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
            title: 'mugs',
            isActive: true,
            description: 'Баннер кружек',
            image: '/static/assets/images/mugBanner.svg',
            nodeRef: createRef(null)
        },
        {
            id: 2,
            title: 't-shirts',
            isActive: false,
            description: 'Баннер футболок',
            image: '/static/assets/images/tshirtBanner.svg',
            nodeRef: createRef(null)
        },
        {
            id: 3,
            title: 'sweatshirts',
            isActive: false,
            description: 'Баннер толстовок',
            image: '/static/assets/images/sweatshirtBanner.svg',
            nodeRef: createRef(null)
        },
        {
            id: 4,
            title: 'books',
            isActive: false,
            description: 'Баннер книжек',
            image: '/static/assets/images/bookBanner.svg',
            nodeRef: createRef(null)
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
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .then((res: any) => {
                setShopItems(Object.values(res.data));
            })
            .catch((err: any) => {
                console.log(err);
            })
    }

    function getNextPhoto() {
        if(targetId < 3) {
            // categories[targetId].isActive = false;
            // banners[targetId].isActive = false;
            increaseTargetId();
        } else {
            clearTargetId();
        }
    }

    const increaseTargetId = () => {
        setTargetId(prev => prev + 1);
    }

    const clearTargetId = () => {
        console.log('bdbdfbdb');
        setTargetId(0);
    }

    useEffect(() => {
        console.log(targetId < 3);
        // categories[targetId].isActive = true;
        // banners[targetId].isActive = true;
    }, [targetId]);

    useEffect(() => {
        bannerInterval = setInterval(() => getNextPhoto(), 5000);

        if(window.innerWidth < 480) {
            getShopItems(0, 1);
        } else {
            getShopItems(0, 2);
        }

        // window.addEventListener('focus', () => {
        //     location.reload();
        // });
        return () => clearInterval(bannerInterval);
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

                <TransitionGroup className={`bannerWrapper ${isNext ? 'nextSliderEl' : ''} ${isPrevious ? 'previousSliderEl' : ''}`}>
                    {banners.map(({isActive, id, nodeRef, title, image, description}) => (
                        <CSSTransition
                            key={id}
                            nodeRef={nodeRef}
                            timeout={1500}
                            classNames='bannerSlider'
                            unmountOnExit
                        >
                            <>
                                {isActive && <div ref={nodeRef} className='banner'>
                                    <Link href={`/shopItems/${title}`} className="bannerImgRoute">
                                        <img src={image} alt={description}/>
                                    </Link>
                                </div>}
                            </>
                        </CSSTransition>
                    ))}
                </TransitionGroup>

                {/*<span id="PopularShopItem_Text">*/}
                {/*    <p>Популярные товары</p>*/}

                {/*    <Link href="/shopItems" className="seeMoreItemsRoute">Смотреть всe</Link>*/}
                {/*</span>*/}

                {/*<div id="PopularShopItemsWrapper">*/}
                {/*    <ShopItemCard*/}
                {/*        shopItems={shopItems}*/}
                {/*        initialShopItems={shopItems}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<img src="/static/assets/images/bugBountyBanner.svg" alt="BugBounty" id="BugBounty"/>*/}
            </main>

            <TheFooter/>

            <TheCookie/>
        </>
    );
};

