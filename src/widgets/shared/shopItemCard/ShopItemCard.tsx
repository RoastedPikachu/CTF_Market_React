"use client";
import React from "react";
import { useRouter } from "next/navigation";

import "./shopItemCard.scss";

interface ShopItem {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface ShopItemCardProps {
  shopItems: ShopItem[];
  initialShopItems: ShopItem[];
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({
  shopItems,
  initialShopItems,
}) => {
  const router = useRouter();

  const goToShopItemPage = (id: number | string) => {
    if (id > initialShopItems.length || typeof id === "string") {
      router.push("/404");
    } else {
      router.push(`/shopItem/${id}`);
    }
  };

  return (
    <>
      {shopItems.map((shopItem: ShopItem) => (
        <div
          className="relative mt-[20px] mlarge:mt-[15px] mlarge:pt-[10px] msmall:pt-[10px] mlarge:pb-[15px] msmall:pb-[15px] mmedium:py-[10px] mlarge:px-[2.5%] p-[20px] w-[366px] mlarge:w-[49%] h-[524px] mlarge:h-[285px] mmedium:h-[225px] msmall:h-[230px] bg-[#313134] border-[2px] border-[rgba(255,255,255,0.2)] rounded-[35px] mlarge:rounded-[20px] no-underline cursor-pointer"
          key={shopItem.id}
          onClick={() => goToShopItemPage(shopItem.id)}
        >
          <div className="mt-0 pb-0 w-full h-[77.5%] mlarge:h-[80%] rounded-[30px] mlarge:rounded-[15px] overflow-hidden">
            <img
              src={shopItem.images[0]}
              alt={shopItem.title}
              className="w-full h-full bg-[#ffffff] object-cover mlarge:rounded-[15px] duration-[400ms] ease-in-out hover:scale-[1.1]"
            />
          </div>

          <div className="mt-[10px] mlarge:mt-[7.5px] pb-[20px] mlarge:pb-[0px] w-full h-auto min-h-[120px] mlarge:min-h-[40px]">
            <p className="text-[#ffffff] text-[1.375rem] mlarge:text-[0.75rem] mmedium:text-[0.625rem] font-['Montserrat'] font-bold">
              {shopItem.title.length < 20
                ? shopItem.title
                : `${shopItem.title.slice(0, 17)}...`}
            </p>

            <div className="flex justify-between mlarge:items-center mt-[2.5px] pb-0 w-full mlarge:h-auto min-h-[55px] mlarge:min-h-[0px]">
              <p className="shopItemDescription w-[60%] mlarge:h-auto text-[rgba(255,255,255,0.4)] text-[1rem] mlarge:text-[0.5rem] mmedium:text-[0.375rem] mlarge:leading-[1.35] mlarge:text-justify mlarge:break-all font-regular">
                {shopItem.description}
              </p>

              <button className="flex justify-center items-center mt-[5px] mlarge:mt-0 pt-[5px] mmedium:pt-[2px] w-[35%] msmall:w-[37.5%] h-[45px] mlarge:h-[25px] mmedium:h-[22.5px] bg-[rgba(46,236,197,0.1)] border-[1.5px] border-[#2eecc5] rounded-[40px] mlarge:rounded-[30px] shadow-[0,0,38px,rgba(46,236,197,0.1)] pointer outline-none">
                <p className="text-[#ffffff] text-[1.25rem] mlarge:text-[0.625rem] mmedium:text-[0.5rem] font-regular">
                  {shopItem.price}
                </p>

                <img
                  src="/static/assets/images/ctfCoinIcon.svg"
                  alt="CTFCoin"
                  className="mt-[-7.5px] mlarge:mt-[-5px] mmedium:mt-[-2.5px] ml-[5px] mlarge:ml-[2.5px] w-[25px] mlarge:w-[15px] mmedium:w-[12.5px] h-[25px] mlarge:h-[15px] mmedium:h-[12.5px]"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopItemCard;
