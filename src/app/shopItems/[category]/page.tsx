'use client';
import React, { useState, useEffect, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import axiosMixins from "@/mixins/axiosMixins";

import TheHeader from '@/widgets/shared/header/TheHeader';
import TheFooter from '@/widgets/shared/footer/TheFooter';
import ShopItemCard from '@/widgets/shared/shopItemCard/ShopItemCard';

import './shopItems.scss';

interface ShopItem {
    id: number,
    title: string,
    price: number,
    description: string,
    engCategory: string,
    category: string,
    images: string[]
}

interface Category {
    id: number,
    engTitle: string,
    title: string,
    isActive: boolean,
}

interface Size {
    id: number,
    prop: string,
    isActive: boolean,
}

interface ShopItemsProps {
    params: { category: string }
}

const Page: React.FC<ShopItemsProps> = ({params}) => {
    const { api, initAPI } = axiosMixins();

    const nodeRef = useRef(null)

    const [isModalFilterActive, setIsModalFilterActive] = useState(false);
    const [isArrsLoaded, setIsArrsLoaded] = useState(false);

    const [initialShopItems, setInitialShopItems] = useState([] as ShopItem[]);
    const [shopItems, setShopItems] = useState([] as ShopItem[]);

    const [categories, setCategories] = useState([
        {
            id: 1,
            engTitle: 'mugs',
            title: 'Кружки',
            isActive: false,
        },
        {
            id: 2,
            engTitle: 't-shirts',
            title: 'Футболки',
            isActive: false,
        },
        {
            id: 3,
            engTitle: 'sweatshirts',
            title: 'Толстовки',
            isActive: false,
        },
        {
            id: 4,
            engTitle: 'books',
            title: 'Книги',
            isActive: false,
        },
    ] as Category[]);

    const [sizes, setSizes] = useState([
        {
            id: 1,
            prop: 'XS',
            isActive: false,
        },
        {
            id: 2,
            prop: 'S',
            isActive: false,
        },
        {
            id: 3,
            prop: 'M',
            isActive: false,
        },
        {
            id: 4,
            prop: 'L',
            isActive: false,
        },
        {
            id: 5,
            prop: 'XL',
            isActive: false,
        },
        {
            id: 6,
            prop: 'XXL',
            isActive: false
        }
    ] as Size[]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filterShopItems = (category?:string) => {
        console.log('');
        setInitialShopItems(initialShopItems.map(item => {
            switch(item.category) {
                case 'Кружки':
                    item['engCategory'] = 'mugs';
                    break;
                case 'Футболки':
                    item['engCategory'] = 't-shirts';
                    break;
                case 'Толстовки':
                    item['engCategory'] = 'sweatshirts';
                    break;
                case 'Книги':
                    item['engCategory'] = 'books';
                    break;
            }
            return item;
        }));

        if(minPrice && maxPrice) {
            setShopItems(initialShopItems);

            setShopItems(shopItems.filter(item => item.price >= +minPrice && item.price <= +maxPrice));
        } else if(maxPrice) {
            setShopItems(initialShopItems);

            setShopItems(shopItems.filter(item => item.price <= +maxPrice));
        } else if(minPrice) {
            setShopItems(initialShopItems);

            setShopItems(shopItems.filter(item => item.price >= +minPrice));
        }

        const targetCategories = [] as string[];

        if(category) {
            targetCategories.push(category);
        } else {
            categories.forEach(item => {
                if(item.isActive) {
                    targetCategories.push(item.engTitle);
                }
            })
        }

        if(targetCategories.length) {
            setShopItems(initialShopItems);

            setShopItems(shopItems.filter(item => targetCategories.includes(item.engCategory)));
        }
    };

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${start}/${stop}`);

        api.get(url.toString())
            .then((res:any) => {
                setShopItems(Object.values(res.data));
                setInitialShopItems(Object.values(res.data));

                setIsArrsLoaded(true);
            });
    }

    useEffect(() => {
        if(shopItems.length && params.category !== 'all') {
            filterShopItems(params.category);
        }
    }, [isArrsLoaded])

    useEffect(() => {
        initAPI(false);

        getShopItems(0, 9);
    }, []);

    return (
        <>
            <TheHeader/>

            <main data-testid='shopItems'>
                <img src="/static/assets/images/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo"/>

                <div id="ShopItemsNav">
                    <button onClick={() => setIsModalFilterActive(!isModalFilterActive)}>

                        <img src="/static/assets/images/filterIcon.svg" alt="Фильтры"/>
                        Фильтры
                    </button>
                </div>

                <CSSTransition
                    in={isModalFilterActive}
                    nodeRef={nodeRef}
                    timeout={250}
                    classNames='modalFilter'
                    unmountOnExit
                >
                    <div id="ModalFilterWindow" ref={nodeRef}>
                        <div id="ModalFilterWindow_Categories">

                            <p>Категория</p>

                            <span>
                                {categories.map((category:Category) => (
                                    <p
                                        key={category.id}
                                        className={ category.isActive ? 'categoryActive' : '' }
                                        onClick={() => {category.isActive = !category.isActive; setCategories([...categories])}}
                                    >
                                        { category.title }
                                    </p>
                                ))}
                            </span>
                        </div>

                        {(categories[1].isActive || categories[2].isActive) &&
                            <div id="ModalFilterWindow_Sizes">
                                <p>Размеры</p>

                                <div>
                                    {sizes.map((size) => (
                                        <button
                                            key={size.id}
                                            className={ size.isActive ? 'active' : '' }
                                            onClick={() => {size.isActive = !size.isActive; setSizes([...sizes])}}
                                        >
                                            { size.prop }
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }

                        <div id="ModalFilterWindow_Price">
                            <p>Цена</p>

                            <div>
                                <input type="text" placeholder="Мин. цена" value={minPrice} onChange={(event) => setMinPrice(event.target.value)}/>

                                <input type="text" placeholder="Макс. цена" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}/>
                            </div>
                        </div>

                        <button id="ModalFilterWindow_Accept" onClick={() => filterShopItems()}>Применить</button>

                        <button id="ModalFilterWindow_Reset" onClick={() => { setShopItems(initialShopItems); setMinPrice(''); setMaxPrice('')}}>Сбросить фильтры</button>
                    </div>
                </CSSTransition>

                <section id="ShopItemsContainer">
                    <ShopItemCard
                        shopItems={shopItems}
                        initialShopItems={initialShopItems}
                    />
                </section>
            </main>

            <TheFooter/>
        </>
    );
};

export default Page;