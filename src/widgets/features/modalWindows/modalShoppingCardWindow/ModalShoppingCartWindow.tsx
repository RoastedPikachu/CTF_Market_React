"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { shoppingCartSlice } from "@/store/storeReducers/ShoppingCartSlice";
import { useAppDispatch } from "@/store/storeHooks";

import axiosMixins from "@/mixins/axiosMixins";

import "./modalShoppingCartWindow.scss";

interface ModalShoppingCartWindowProps {
  token: string | null;
  balance: number;
  totalCost: number;
  isPointsEnough: boolean;
  isOrderPayed: boolean;
  shoppingCartItems: ShoppingCartItem[];
  changeModalShoppingCartActive: Function;
  order: Function;
}

interface ShoppingCartItem {
  id: number;
  title: string;
  price: string;
  size: string;
  count: number;
  photo: string;
}

const ModalShoppingCartWindow: React.FC<ModalShoppingCartWindowProps> = ({
  token,
  balance,
  totalCost,
  isPointsEnough,
  isOrderPayed,
  shoppingCartItems,
  changeModalShoppingCartActive,
  order,
}) => {
  const dispatch = useAppDispatch();

  const {
    removeItemFromShoppingCart,
    clearShoppingCartAction,
    changeItemFromShoppingCart,
    changeTotalCostValue,
  } = shoppingCartSlice.actions;

  const { api, initAPI } = axiosMixins();

  const [isFAQApproved, setIsFAQApproved] = useState(false);

  const [address, setAddress] = useState("");

  const removeShoppingCartItem = (id: number) => {
    dispatch(removeItemFromShoppingCart(id));
  };

  const clearShoppingCart = () => {
    dispatch(clearShoppingCartAction());
  };

  const increaseShoppingCartItemCount = (item: any) => {
    item.count++;

    dispatch(changeItemFromShoppingCart(item));
    dispatch(changeTotalCostValue(totalCost + +item.price));
  };

  const decreaseShoppingCartItemCount = (item: any) => {
    if (item.count > 1) {
      item.count--;

      dispatch(changeItemFromShoppingCart(item));
      dispatch(changeTotalCostValue(totalCost - +item.price));
    } else {
      dispatch(removeItemFromShoppingCart(item.id));
    }
  };

  const makeAnOrder = () => {
    if (shoppingCartItems.length && address) {
      const url = new URL("https://ctfmarket.ru:8080/api/v1/product/buy");

      api
        .post(url.toString(), {
          token: token,
          address: address,
          products: shoppingCartItems,
        })
        .then((res: any) => {
          order();

          setAddress("");
          dispatch(clearShoppingCartAction());
          console.log(res);
        });
    } else {
      console.log("Нельзя сделать заказ с пустой корзиной");
    }
  };

  useEffect(() => {
    initAPI(true);
  }, []);

  return (
    <div
      id="ModalShoppingCart"
      className="absolute top-[70px] right-[5%] py-[20px] px-[35px] w-[379px] h-auto min-h-[650px] bg-[#1e1e1e] border-[rgba(255,255,255,0.2)] rounded-[20px] z-10"
    >
      <span className="flex justify-between items-center w-full h-[70px]">
        <img
          src="/static/assets/images/x-markIcon.svg"
          alt="Назад"
          onClick={() => changeModalShoppingCartActive()}
          className="w-[22px] h-[22px] cursor-pointer"
        />

        <p className="text-[#ffffff] text-[1.125rem] font-['Montserrat'] font-bold">
          Корзина
        </p>

        <img
          src="/static/assets/images/binIcon.svg"
          alt="Очистить корзину"
          onClick={() => clearShoppingCart()}
          className="w-[26px] cursor-pointer"
        />
      </span>

      <div
        id="shoppingCartItemsWrapper"
        className="mt-[20px] w-full h-[280px] overflow-scroll overflow-x-hidden"
      >
        {shoppingCartItems.map((shoppingCartItem) => (
          <div
            key={shoppingCartItem.id}
            className="shoppingCartItem flex justify-between items-center mt-[20px] w-full h-[85px]"
          >
            <img
              src={shoppingCartItem.photo}
              alt={shoppingCartItem.title}
              className="shoppingCartItemImage w-[85px] h-full bg-[#ffffff] rounded-[10px]"
            />

            <div className="shoppingCartItem_Right w-[67.5%] h-full">
              <span className="flex items-center flex-wrap w-full h-[50%] text-[#ffffff] text-[0.875rem]">
                <p className="ml-0 w-full font-normal">
                  {shoppingCartItem.title}
                </p>

                <p className="ml-0 w-full font-bold">
                  {+shoppingCartItem.price * shoppingCartItem.count} баллов
                </p>
              </span>

              <div className="flex justify-between items-center mt-[5px] w-full h-[50%]">
                <span className="flex justify-between items-center flex-nowrap w-[60%] h-full">
                  <button
                    onClick={() =>
                      decreaseShoppingCartItemCount(shoppingCartItem)
                    }
                    className="flex justify-center items-center w-[60px] h-[30px] bg-[#ffffff] border-0 rounded-[10px] text-[1.125rem] cursor-pointer"
                  >
                    &mdash;
                  </button>

                  <p className="text-center">{shoppingCartItem.count}</p>

                  <button
                    onClick={() =>
                      increaseShoppingCartItemCount(shoppingCartItem)
                    }
                    className="text-[1.375rem]"
                  >
                    +
                  </button>
                </span>

                <img
                  src="/static/assets/images/itemBinIcon.svg"
                  alt="Удалить"
                  onClick={() => removeShoppingCartItem(shoppingCartItem.id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        id="ShoppingCart_Bottom"
        className="mt-[10px] w-full h-auto min-h-[160px]"
      >
        <span id="ShoppingCart_BottomBalance" className="h-[40px] font-bold">
          <p className="ml-0 text-[rgba(255,255,255,0.6)] text-[1.5rem]">
            Баланс
          </p>

          <p className="text-[#ffffff] text-[1rem]">{balance || 0} баллов</p>
        </span>

        <span className="h-[40px] font-bold">
          <p className="ml-0 text-[rgba(255,255,255,0.6)] text-[1.5rem]">
            К ОПЛАТЕ
          </p>

          <p className="text-[#ffffff] text-[1rem]">{totalCost} баллов</p>
        </span>

        <input
          type="checkbox"
          style={{ display: "none" }}
          value={isFAQApproved}
          onClick={() => setIsFAQApproved(!isFAQApproved)}
          id="FAQApproveInput"
        />

        <div
          id="FAQApprove"
          className="flex justify-between items-start pt-[15px] pb-[10px] w-full h-auto"
        >
          <label
            htmlFor="FAQApproveInput"
            className={`w-[25px] h-[25px] bg-[#1e1e1e] border-[#42d4ba] border-[1px] rounded-[5px] duration-[250ms] ease-in-out cursor-pointer ${
              isFAQApproved
                ? "flex justify-center items-center bg-[#42d4ba]"
                : ""
            }`}
          >
            <img
              src="/static/assets/images/checkmarkIcon.svg"
              alt="Принять условия FAQ"
              className={isFAQApproved ? "block" : "hidden"}
            />
          </label>

          <p className="w-[85%] text-[#ffffff] text-[1.125rem] font-bold">
            Я прочитал{" "}
            <Link href="/faq" className="text-[#42d4ba]">
              FAQ и согласен с условиями доставки
            </Link>
          </p>
        </div>

        <input
          type="text"
          placeholder="г. Москва, ул. Моросейка, д. 10, кв. 40"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="mt-[10px] px-[20px] w-full h-[45px] bg-[#434343] border-[rgba(255,255,255,0.6)] border-[1px] rounded-[10px] text-[#bababa] text-[0.875rem] font-bold outline-none"
        />

        <button
          onClick={() => makeAnOrder()}
          className={`flex justify-between items-center mt-[10px] px-[20px] w-full h-[50px] border-0 rounded-[10px] text-[1rem] font-bold duration-[250ms] ease-in-out cursor-pointer ${
            isPointsEnough && isFAQApproved
              ? "bg-[#42d4ba] text-[#ffffff]"
              : "bg-[#434343] text-[#9a9a9a]"
          }`}
        >
          Оплатить
          <img src="/static/assets/images/arrowRightIcon.svg" alt="Оплатить" />
        </button>

        {isOrderPayed && (
          <span
            id="OrderIsPayed"
            className="flex justify-between items-center pt-[15px] px-[23%] h-[20px] w-[54%]"
          >
            <p className="text-[#a5a5a5] text-[1.125rem] font-bold">
              Заказ оплачен
            </p>

            <img
              src="/static/assets/images/orderIsPayedIcon.svg"
              alt="Заказ Оплачен"
              className="w-[20px] h-[20px]"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ModalShoppingCartWindow;
