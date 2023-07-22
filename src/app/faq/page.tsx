'use client';
import React, { useState } from 'react';

import './faq.scss';

const Page = () => {
    const paragraphs = useState([
        {
            id: 1,
            title: 'Где взять токен для регистрации?',
            isOpen: false,
            description: `Токен для регистрации можно получить у <a href="https://t.me/letoctfbot" style="color: #42d4ba; text-decoration: none; outline: none;">@ctfmarketbot</a>, если ты был участником
              Летней Школы CTF 2022. Мы выгрузили все данные <b style="color: #42d4ba;">(TelegramUserID, баллы)</b> из бота ЛШ и на их основе
              сделали те самые токены для регистрации. Баллы подтянутся автоматически`
        },
        {
            id: 2,
            isOpen: false,
            title: 'Я сделал заказ, что дальше?',
            description: `На данный момент все заказы мы обрабатываем в ручном режиме (ну впринципе как и любой
              интернет-магазин, не считая e-commerce), поэтому чуточку терпения. Мы будем <b style="color: #42d4ba;">звонить/писать/
              стучаться</b> в окно каждому, чтобы подтвердить заказ и все данные для отправки. <br> <br> Если ты
              проживаешь в <b style="color: #42d4ba;">Москве/Московской области - то ты можешь приехать и забрать заказ лично</b>
              (это же будет куда быстрее!). <br> <br> <b style="color: #42d4ba;">Для остальных</b> - мы организуем отправку, поэтому будьте внимательны
              при вводе адреса и его подтверждении`
        },
        {
            id: 3,
            isOpen: false,
            title: 'Почему так мало мерча?',
            description: `<b style="color: #42d4ba;">Всё что на сайте - отвоёвано с трудом</b>, за каждую футболку была нешуточная борьба
              с другими желающими, поэтому выложили всё что смогли. НО! Мы планируем постоянно обновлять ассортимент, а
              <b style="color: #42d4ba;">баллы</b> можно будет получить не только за ЛШ, так что...`
        },
        {
            id: 4,
            isOpen: false,
            title: 'Хочу много мерча и стать крутым багхантером!',
            description: `Отлично мы как раз запустили bugbounty на нашей платформе! <br><br> Что мы принимаем:<br>
              <bstyle="color: #42d4ba;">Мисконфиги</b>, уязвимости клиентской и серверной стороны, которые могут повлиять на функционирование
              сайта <b style="color: #42d4ba;" >(кроме DoS/DDoS)</b>, привести к произвольному исполнению кода (RCE), манипуляции с балансом,
              доступы по БД и так далее. <br><br> Каждый отчёт <b style="color: #42d4ba;">(в свободном виде)</b> будет рассматриваться отдельно,
              награда определяется по уровню критичности найденной проблемы. <br><br> По поводу найденных уязвимостей -
              пишите <a href="https://t.me/by_sm" style="color: #42d4ba; text-decoration: none; outline: none;">@by_sm</a>`
        },
        {
            id: 5,
            isOpen: false,
            title: 'У меня есть проблемы с отображением/функционированием сайта',
            description: `Не беда - пиши нам! <br> По всем вопросам - <a href="https://t.me/by_sm" style="color: #42d4ba; text-decoration: none; outline: none;">@by_sm</a>
              <br> Проблемы с фронтом/отображением - <a href="https://t.me/KorobkaBoris" style="color: #42d4ba; text-decoration: none; outline: none;">@KorobkaBoris</a>
              <br> Проблемы с функционалом/бэком - <a href="https://t.me/allelleo" style="color: #42d4ba; text-decoration: none; outline: none;">@allelleo</a>
              <br> Хочешь сказать много комплиментов по поводу дизайна - хвали <a href="https://t.me/fewiid" style="color: #42d4ba; text-decoration: none; outline: none;">@fewiid</a>`
        },
    ])

    return (
        <main>
            <h2>FAQ</h2>

            {paragraphs.map((paragraph:any) => (
                <div key={paragraph.id} className={`paragraph ${paragraph.isOpen ? 'openParagraph' : ''}`}>
                    <span>
                        <p className="paragraphTitle">{ paragraph.title }</p>

                        <img src="/static/assets/images/openMoreIcon.svg" alt="Открыть подробности" onClick={() => paragraph.isOpen = !paragraph.isOpen}/>
                    </span>

                    {paragraph.isOpen && <p className="paragraphDescription" v-html={paragraph.description}></p>}
                </div>
            ))}
        </main>
    );
};

export default Page;