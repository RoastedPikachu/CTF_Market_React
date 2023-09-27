const setData = require('./setSignInData');

interface SignInData {
    email: string,
    badEmail: string,
    password: string,
    badPassword: string
}

describe('Тестирование функции входа', () => {
    let data:SignInData;

    beforeAll(() => {
        data = {
            email: 'b.karabyt@gmail.com',
            badEmail: '',
            password: 'qwertyuiop1234567890',
            badPassword: ''
        }
    })

    test('Проверка регулярки для почты', () => {
        expect(setData(data.badEmail, data.password)).toBe('Почта введена в неправильном формате');
    })

    test('Проверка регулярки для пароля', () => {
        expect(setData(data.email, data.badPassword)).toBe('Введите пароль');
    })
})