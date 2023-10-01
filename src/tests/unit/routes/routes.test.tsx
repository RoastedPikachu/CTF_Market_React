import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Routes from '@/widgets/testComponents/Routes';

describe('Проверка работоспособности всех роутов', () => {
    test('..', () => {
        render(
            <Routes/>
        );

        userEvent.click(screen.getByTestId('signUpLink'));
        expect(screen.getByTestId('signUp')).toBeInTheDocument();

        // userEvent.click(screen.getByTestId('signInLink'));
        // expect(screen.getByTestId('signIn')).toBeInTheDocument();
        //
        // userEvent.click(screen.getByTestId('shopItemsLink'));
        // expect(screen.getByTestId('shopItems')).toBeInTheDocument();
        //
        // userEvent.click(screen.getByTestId('shopItemLink'));
        // expect(screen.getByTestId('shopItem')).toBeInTheDocument();
    })
})