import React from 'react';
import Link from 'next/link';

const Routes = () => {
    return (
        <div>
            <Link href='/signUp' data-testid='signUpLink'>Регистрация</Link>

            <Link href='/signIn' data-testid='signInLink'>Вход</Link>

            <Link href='/shopItems' data-testid='shopItemsLink'>Товары</Link>

            <Link href='/shopItem/1' data-testid='shopItemLink'>Товар</Link>
        </div>
    );
};

export default Routes;