'use client';
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';


import { useAppSelector } from '@/store/storeHooks';
import { AppState } from '@/store';

import axiosMixins from "@/mixins/axiosMixins.js";

import './watch.scss';

interface OrderedPosition {
    id: number,
    title: string,
    size: string
}

interface UserInfo {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
}

interface Order {
    id: number,
    is_active: boolean,
    user: UserInfo,
    products: OrderedPosition[],
    address: string,
}

const Page = () => {
    const router = useRouter();

    const isAdmin = useAppSelector((state: AppState) => state.user.isAdmin);

    const { api, initAPI } = axiosMixins();

    let [targetOrder, setTarOrd] = useState({} as Order);
    let [orders, setOrders] = useState([] as Order[]);

    const getCookie = (name:string) => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const getAllOrders = () => {
        const url = new URL('https://ctfmarket.ru:8080/api/v1/order');

        const token = getCookie('token');

        api.post(url.toString(), { token: token })
            .then((res:any) => {
                setOrders(Object.values(res.data));

                setTargetOrder((Object.values(res.data) as Order[])[0]);
            });
    }

    const setTargetOrder = (order:Order) => {
        setTarOrd(order);

        orders.forEach(item => item.is_active = false)

        order.is_active = true;
        setTarOrd(() => ({...order, is_active: true}));
        console.log(orders.map(item => item.is_active));
    }

    const declineOrder = (targetOrder:Order) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/order/${targetOrder?.id}/cancellation/`);

        const token = getCookie('token');

        let decision = confirm('Вы точно хотите удалить заказ');

        if(decision) {
            api.post(url.toString(), { token: token })
                .then(() => {
                    getAllOrders();
                });
        }
    }

    useEffect(() => {
        initAPI(true);

        getAllOrders();

        // if(!isAdmin) {
        //     router.push('/');
        // }
    }, [])

    return (
        <main>
            <img src='/static/assets/images/Logo.svg' alt="CTFMarket"/>

                <section>
                    <div id="OrdersWrapper">
                        <h2>ЗАКАЗЫ</h2>

                        {orders.map((order:Order) => (
                            <div key={order.id} className={ order.is_active ? 'targetOrder' : '' } onClick={() => setTargetOrder(order)}>
                                <p>{`${order.user?.first_name} ${order.user?.last_name} ${ order.user?.phone.slice(0, 9)}`}&#8230;</p>
                            </div>
                        ))}
                    </div>

                    <aside>
                        <div id="MoreInfoAboutOrder">
                            <h2>Подробная информация о заказе</h2>

                            <p>{ `${targetOrder?.user?.first_name || 'IT'} ${targetOrder?.user?.last_name || 'Уточка'}` }</p>
                            <p>{ `+${targetOrder?.user?.phone.slice(0, 1)}(${targetOrder?.user?.phone.slice(1, 4)})${targetOrder?.user?.phone.slice(4, 7)}-${targetOrder?.user?.phone.slice(7, 9)}-${targetOrder?.user?.phone.slice(9, 11)}`}</p>
                            <p>{ targetOrder?.user?.email || 'крякря@duck.ru'}</p>
                            <p>{ targetOrder?.address || 'пруд около горы Маттерхорн' }</p>
                            {targetOrder?.products?.map((item:any) => (
                                <p key={item.id}>{ item.title } размер: { item.size }</p>
                            ))}
                        </div>

                        <button id="Accept">Подтвердить</button>

                        <button id="Decline" onClick={() => declineOrder(targetOrder)}>Отменить</button>
                    </aside>
                </section>
        </main>
    );
};

export default Page;