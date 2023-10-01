'use client';
import React, { useState, useEffect } from 'react';

import { shoppingCartSlice } from '@/store/storeReducers/ShoppingCartSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import touchMixins from "@/mixins/touchMixins";
import axiosMixins from "@/mixins/axiosMixins";

import TheHeader from '@/widgets/shared/header/TheHeader';
import TheFooter from '@/widgets/shared/footer/TheFooter';

import './shopItem.scss';

interface Size {
    id: number,
    name: string,
    prop: string,
    isActive: boolean,
    count: number
}

interface ShopItem {
    id: number,
    title: string,
    price: string,
    description: string,
    images: string[],
    sizes: Size[],
}

interface ShopItemProps {
    params: { id: number }
}

const Page: React.FC<ShopItemProps> = ({ params }) => {
    const { addItemToShoppingCartAction } = shoppingCartSlice.actions;
    const dispatch = useAppDispatch();

    let { firstTouchCoordinates, lastTouchCoordinates, changePhotoByTouch } = touchMixins();
    const { api, initAPI } = axiosMixins();

    const [item, setItem] = useState({
        id: 0,
        title: '',
        price: '',
        description: '',
        images: [] as string[],
        sizes: []
    } as ShopItem);

    const [sizes, setSizes] = useState([
        {
            id: 1,
            prop: 'XS',
            isActive: false,
            count: 0,
        },
        {
            id: 2,
            prop: 'S',
            isActive: false,
            count: 0,
        },
        {
            id: 3,
            prop: 'M',
            isActive: false,
            count: 0,
        },
        {
            id: 4,
            prop: 'L',
            isActive: false,
            count: 0,
        },
        {
            id: 5,
            prop: 'XL',
            isActive: false,
            count: 0,
        },
        {
            id: 6,
            prop: 'XXL',
            isActive: false,
            count: 0,
        }
    ] as Size[]);

    let isSignIn = useAppSelector((state:AppState) => state.user.isSignIn);
    let isAlertActive = useAppSelector((state:AppState) => state.user.isSignIn);
    const [isSizesActive, setIsSizesActive] = useState(false);

    const [targetSize, setTargetSize] = useState('');
    const [targetImageIndex, setTargetImageIndex] = useState(0);

    const changeSizeIsActive = (size:Size) => {
        if(size.count > 0) {
            sizes.forEach(item => item.isActive = false);

            setTargetSize(size.prop);

            size.isActive = true;
        }
    }

    const addItemToShoppingCart = (item:ShopItem) => {
        if(isSignIn) {
            let size:string;

            if(isSizesActive) {
                size = targetSize;
            } else {
                size = 'all';
            }

            dispatch(addItemToShoppingCartAction({
                id: item.id,
                photo: item.images[0],
                title: item.title,
                price: item.price,
                size: size,
                count: 1
            }));
        }
    }

    const getInfoAboutShopItem = () => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${params.id}`);

        api.get(url.toString())
            .then((res:any) => {
                console.log('Это что товар, а думал сова!');
                setItem(res.data);

                item.sizes.forEach(itemSize => {
                    sizes.forEach(item => {
                        if(item.prop === itemSize.name) {
                            item.count = itemSize.count;
                        }
                    });
                });

                let isSizeFinded = false;

                sizes.forEach(item => {
                    if(!isSizeFinded) {
                        if(item.count) {
                            item.isActive = true;
                            isSizeFinded = true;
                        }
                    }
                })

                switch(res.data.category) {
                    case 'Футболки': setIsSizesActive(true);
                        break;

                    case 'Толстовки': setIsSizesActive(true);
                        break;
                }
            });
    }

    const getPreviousPhoto = () => {
        if(targetImageIndex === 0) {
            setTargetImageIndex(item.images.length - 1);
        } else {
            setTargetImageIndex(targetImageIndex - 1);
        }
    };

    const getNextPhoto = () => {
        if(targetImageIndex === item.images.length - 1) {
            setTargetImageIndex(0);
        } else {
            setTargetImageIndex(targetImageIndex + 1);
        }
    };

    useEffect(() => {
        initAPI(false);

        getInfoAboutShopItem();
    }, [])

    return (
        <>
            <TheHeader/>

            <main data-testid='shopItem'>
                <img src="/static/assets/images/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo"/>

                    <div id="MainShopItemInfo">
                        <div id="MainShopItemInfo_Images">
                            <img
                                src={item.images[targetImageIndex]}
                                alt={item.description}
                                className="mainShopItemInfo_Images_Photo"
                                onTouchStart={(event) => firstTouchCoordinates = event.changedTouches[0].pageX}
                                onTouchEnd={(event) => changePhotoByTouch(event, getNextPhoto, getPreviousPhoto)}
                            />

                        <span>
                            <img src="/static/assets/images/arrowRightIcon.svg" alt="Назад" onClick={() => getPreviousPhoto()}/>

                            <img src="/static/assets/images/arrowRightIcon.svg" alt="Вперёд" onClick={() => getNextPhoto()}/>
                        </span>
                    </div>

                    <aside>
                        <h2>{ item.title }</h2>

                        <p>{ item.description }</p>

                        <p>Цена: { item.price } баллов</p>

                        {isSizesActive &&
                        <div>
                            <p>Размеры</p>

                            {sizes.map((size) => (
                                <button key={size.id} className={ size.isActive ? 'active' : '' } onClick={() => changeSizeIsActive(size)}>{ size.prop }</button>
                            ))}
                        </div>}


                        {isAlertActive &&
                            <div id="AlertAboutNotSignIn" >
                                <p>Невозможно добавить товар, войдите в аккаунт</p>

                                <img src="/static/assets/images/greyXMarkIcon.svg" alt="Закрыть" onClick={() => isAlertActive = !isAlertActive}/>
                            </div>
                        }

                        <button className={`addToShoppingCart ${!isSignIn ? 'activeAdding' : ''}`} onClick={() => addItemToShoppingCart(item)}>В корзину</button>
                    </aside>
                </div>
            </main>

            <TheFooter/>
        </>
    );
};

export default Page;