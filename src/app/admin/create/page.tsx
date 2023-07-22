'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import axiosMixins from "@/mixins/axiosMixins.js";

import './create.scss';

interface Photo {
    id: number,
    isShowed: boolean,
    isLoaded: boolean,
    file: string
}

const Page = () => {
    const router = useRouter();
    const { api, initAPI } = axiosMixins();

    const isAdmin = useAppSelector((state: AppState) => state.user.isAdmin);

    let [targetId, setTargetId] = useState(0);
    const [photos] = useState([
        {
            id: 0,
            isShowed: true,
            isLoaded: false,
            file: ''
        },
        {
            id: 1,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 2,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 3,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 4,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 5,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 6,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 7,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 8,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 9,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
    ] as Photo[])
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState('Категории:');
    let [price, setPrice] = useState('');
    const sizes = useState([
        {
            id: 0,
            prop: 'XS',
            value: ''
        },
        {
            id: 1,
            prop: 'S',
            value: ''
        },
        {
            id: 2,
            prop: 'M',
            value: ''
        },
        {
            id: 3,
            prop: 'L',
            value: ''
        },
        {
            id: 4,
            prop: 'XL',
            value: ''
        }
    ]);

    const getCookie = (name:string) => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const sendPhoto = (id:number) => {
        const url = new URL('http://5.188.178.143:8080/api/v1/create');

        // const formData = new FormData();
        // formData.append('shopItemImg', this.image, 'item.png');
        let targetPhoto: Photo = photos[id];

        api.post(url.toString(), {[`file${id}`]: targetPhoto.file});
    };

    const setPhoto = (event:any) => {
        const FR = new FileReader();

        FR.addEventListener('load', (event:any) => {
            photos[targetId].file = event.target.result;
            photos[targetId].isLoaded = true;

            sendPhoto(targetId);
        })
        FR.readAsDataURL(event.target.files[0]);
    };

    const getPreviousPhoto = () => {

        photos[targetId].isShowed = false;

        if(targetId === 0) {
            setTargetId(photos.length);
        }

        setTargetId(targetId--);

        photos[targetId].isShowed = true;
    };

    const getNextPhoto = () => {

        photos[targetId].isShowed = false;

        if(targetId === photos.length - 1) {
            setTargetId(-1);
        }

        setTargetId(targetId++);

        photos[targetId].isShowed = true;
    };

    const addProductCard = () => {
        const url = new URL('http://5.188.178.143:8080/api/v1/create');

        const token = getCookie('token');

        api.post(url.toString(), {
            token: token,
            title: title,
            description: description,
            category: category,
            price: price
        })
        console.log(category);
        console.log(price);
        console.log(sizes.map(item => item));
    };

    useEffect(() => {
        initAPI(true);

        // if(!isAdmin) {
        //     router.push('/');
        // }
    }, []);

    return (
        <main>
            <img src="/static/assets/images/Logo.svg" alt="CTFMarket"/>

                <section>
                    <form>
                        {photos.map((item:any) => {
                            return (
                                item.isShowed && <div id="LoadPhoto">
                                    <div key={item.id}></div>

                                    { !item.isLoaded && <label className="photoLoader" htmlFor="Photo">Загрузить <br/>фото { item.id }</label> }

                                    { item.isLoaded && <img src={item.file} alt="Карточка товара"/> }

                                    <input type="file" id="Photo" onChange={event => setPhoto(event)}/>
                                </div>
                            )
                        })}

                        <span>

                            <button type="button" onClick={getPreviousPhoto}>
                                <img src="/static/assets/images/backIcon.svg" alt="Назад"/>
                            </button>

                            <p>Назад</p>

                            <p>Вперёд</p>

                            <button type="button" onClick={getNextPhoto}>
                                <img src="/static/assets/images/forwardIcon.svg" alt="Вперёд"/>
                            </button>
                        </span>

                    <aside>
                        <textarea id="Title" placeholder="Заголовок" value={title} onChange={(event) => setTitle(event.target.value)}></textarea>

                        <textarea id="Description" placeholder="Описание" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                        <select value={category} onChange={(event) => setCategory(event.target.value)}>
                            <option disabled>Категории:</option>
                            <option value="Толстовки">Толстовки</option>
                            <option value="Футболки">Футболки</option>
                            <option value="Кружки">Кружки</option>
                            <option value="Браслеты">Браслеты</option>
                        </select>

                        <div id="Price">
                            <label htmlFor="PriceInput">Цена:</label>
                            <input type="text" id="PriceInput" placeholder="Баллы" value={price} onChange={(event) => setPrice(event.target.value)}/>
                        </div>

                        <div id="Sizes">
                            <span>
                                <p>Размеры в <br/>наличии:</p>

                                {sizes.map((item:any) => (
                                    <div className="sizesText" key={item.id}>
                                        <p>{ item.prop }</p>
                                    </div>
                                ))}
                            </span>
                            <span>
                                <p>Кол-во шт.</p>

                                {sizes.map((item:any) => (
                                    <input type="text" className="sizesInput"
                                           key={item.id} value={item.value}
                                           onChange={(event) => item.value = event.target.value}/>
                                ))}
                            </span>
                        </div>

                        <button type="button" onClick={addProductCard}>Сохранить</button>
                    </aside>
                </form>
            </section>
        </main>
    );
};

export default Page;