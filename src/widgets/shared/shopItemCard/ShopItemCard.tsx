'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import './shopItemCard.scss';

interface ShopItem {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[]
}

interface ShopItemCardProps {
    shopItems: ShopItem[],
    initialShopItems: ShopItem[]
}

const ShopItemCard:React.FC<ShopItemCardProps> = ({shopItems, initialShopItems}) => {

    const router = useRouter();

    const goToShopItemPage = (id:number | string) => {
        if(id > initialShopItems.length || typeof id === 'string') {
            router.push('/404');
        } else {
            router.push(`/shopItem/${id}`);
        }
    }

    return (
        <>
            {shopItems.map((shopItem:ShopItem) => (
                <div
                    className="shopItem"
                    key={shopItem.id}
                    onClick={() => goToShopItemPage(shopItem.id)}
                >
                    <div className="shopItem_ImgContainer">
                        <img src={shopItem.images[0]} alt={shopItem.title}/>
                    </div>

                    <div>
                        <p className="shopItemTitle">{ shopItem.title.length < 20 ? shopItem.title : `${shopItem.title.slice(0, 17)}...` }</p>

                        <div>
                            <p className="shopItemDescription">{ shopItem.description }</p>

                            <button className="shopItemPrice">
                                <p>{ shopItem.price }</p>

                                <img src="/static/assets/images/ctfCoinIcon.svg" alt="CTFCoin"/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShopItemCard;