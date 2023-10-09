"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import { useAppSelector } from "@/store/storeHooks";
import { AppState } from "@/store";

import "./footer.scss";

const TheFooter = () => {
  const isSignIn = useAppSelector((state: AppState) => state.user.isSignIn);

  useEffect(() => {
    console.log("А в подвале дети сидят(((");
  }, []);

  return (
    <footer className='relative bottom-[0px] w-full h-[400px] mlarge:h-[250px] mmedium:h-[200px] bg-[url("/static/assets/images/footerBackground.svg")] bg-no-repeat bg-cover'>
      <div className="relative pt-[30px] mlarge:pt-[20px] px-[35%] mlarge:px-[0%] w-[30%] mlarge:w-full mlarge:h-[35px] mmedium:h-[50px] text-center">
        <h2 className="absolute w-[30%] mlarge:w-full text-[#9afbe7] text-[3rem] mlarge:text-[1.5rem] text-center font-bold z-[9]">
          ИНФОРМАЦИЯ
        </h2>

        <p className="w-full text-[rgba(154,251,231,0.5)] text-[3rem] mlarge:text-[1.5rem] text-center font-bold blur-[8px]">
          ИНФОРМАЦИЯ
        </p>
      </div>

      <nav className="flex justify-between items-center mt-[40px] mlarge:mt-[25px] mmedium:mt-[15px] ml-[32.5%] mr-[37.5%] mlarge:mx-[7.5%] w-[35%] mlarge:w-[85%]">
        <Link href="/" className="footerRoute">
          Главная
        </Link>

        <Link href="/shopItems" className="footerRoute">
          Товары
        </Link>

        <span>
          <Link
            href="/signIn"
            className={`footerRoute ${isSignIn ? "pointer-events-none" : ""}`}
          >
            Вход/
          </Link>

          <Link
            href="/signUp"
            className={`footerRoute ${isSignIn ? "disabledRoute" : ""}`}
          >
            Регистрация
          </Link>
        </span>
      </nav>

      <div className="flex justify-between mt-[80px] mmedium:mt-[20px] mx-[30%] mmedium:ml-[7.5%] mmedium:mr-[10%] w-[42.5%]">
        <div className="w-[45%] h-[80px] mlarge:w-[42.5%] mmedium:w-[45%]">
          <h3 className="text-[#9afbe7] text-[1.625rem] mlarge:text-[1rem] mmedium:text-[0.875rem] font-bold">
            КОНТАКТЫ
          </h3>

          <span className="flex justify-between mt-[15px] mmedium:mt-[12.5px] w-[95%] mmedium:w-[85%]">
            <p className="text-[#ffffff] text-[1.375rem] mlarge:text-[1.2rem] mmedium:text-[0.625rem] font-bold">
              Тел.
            </p>

            <p className="text-[#ffffff] text-[1.375rem] mlarge:text-[1.2rem] mmedium:text-[0.625rem] font-bold">
              +7(495)640-53-30
            </p>
          </span>

          <span className="flex justify-between mt-[7.5px] mlarge:mt-[15px] mmedium:mt-[12.5px] w-[95%] mmedium:w-[85%]">
            <p className="text-[#ffffff] text-[1.375rem] mlarge:text-[0.75rem] mmedium:text-[0.625rem] font-bold">
              Почта
            </p>

            <p className="text-[#ffffff] text-[1.375rem] mlarge:text-[0.75rem] mmedium:text-[0.625rem] font-bold">
              info@aciso.ru
            </p>
          </span>
        </div>

        <div className="w-[45%] mlarge:w-[50%] mmedium:w-[42.5%] h-[80px]">
          <h3 className="text-[#9afbe7] text-[1.625rem] mlarge:text-[1rem] mmedium:text-[0.875rem] font-bold">
            СОЦИАЛЬНЫЕ СЕТИ
          </h3>

          <span className="flex justify-between items-end mlarge:mt-[15px] mmedium:mt-[5px] w-[65%] mmedium:w-[70%] mlarge:h-[15px]">
            <p className="mt-[15px] text-[#ffffff] text-[1.375rem] mlarge:text-[0.75rem] mmedium:text-[0.625rem] font-bold">
              CTF news
            </p>

            <a
              href="https://t.me/ctfnews"
              className="w-[25px] mlarge:w-[15px] mmedium:w-[12.5px] h-[25px] mlarge:h-[15px] mmedium:h-[12.5px]"
            >
              <img
                src="/static/assets/images/tgIcon.svg"
                alt="Телеграм"
                className="w-[25px] mlarge:w-[15px] mmedium:w-[12.5px] h-[25px] mlarge:h-[15px] mmedium:h-[12.5px]"
              />
            </a>

            <a
              href="https://vk.com/ctfnews"
              className="w-[25px] mlarge:w-[15px] mmedium:w-[12.5px] h-[25px] mlarge:h-[15px] mmedium:h-[12.5px]"
            >
              <img
                src="/static/assets/images/vkIcon.svg"
                alt="Вконтакте"
                className="w-[25px] mlarge:w-[15px] mmedium:w-[12.5px] h-[25px] mlarge:h-[15px] mmedium:h-[12.5px]"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
