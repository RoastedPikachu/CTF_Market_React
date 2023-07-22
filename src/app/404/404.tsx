import React from 'react';
import Link from 'next/link';

import './404.scss';

const Page = () => {
    return (
        <div>
            <div id="Text404Wrapper">
                <h1>404</h1>

                <p id="Text404Wrapper_ErrorText">ОШИБКА</p>

                <Link href="/" className="route404">вернуться на главную</Link>

                <p id="Text404Wrapper_Apologies">Извините, страница не найдена</p>
            </div>
        </div>
    );
};

export default Page;