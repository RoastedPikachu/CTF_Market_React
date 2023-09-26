const setDataAboutUser = require('./setData');

interface Data {
    phone: string;
    badPhone: string;
    email: string;
    badEmail: string;
    password: string;
    badPassword: string;
    token: string;
    badToken: string;
}

describe('Тестирование функции регистрации', () => {
    let data:Data;
    beforeAll(() => {
        data = {
            phone: '+7 895 707 55 62',
            badPhone: 'gfgdfgdgdgd',
            email: 'b.karabyt@gmail.com',
            badEmail: '123456789fdffd',
            password: 'qwertyuiop1234567890',
            badPassword: '',
            token: 'q1w23r14y21u41j4io21412u412f4e12r41',
            badToken: ''
        }
    })
    test('Проверка регулярки для телефона', () => {
        expect(setDataAboutUser(data.badPhone, data.email, data.password, data.token)).toBe('Телефон введён в неправильном формате');
    })
    test('Проверка регулярки для почты', () => {
        expect(setDataAboutUser(data.phone, data.badEmail, data.password, data.token)).toBe('Почта введена в неправильном формате');
    })
    test('Проверка регулярки для почты и телефона', () => {
        expect(setDataAboutUser(data.badPhone, data.badEmail, data.password, data.token)).toBe('Телефон и почта введены в неправильном формате');
    })
    test('Проверка ввода пароля', () => {
        expect(setDataAboutUser(data.phone, data.email, data.badPassword, data.token)).toBe('Введите пароль');
    })
    test('Проверка ввода токена', () => {
        expect(setDataAboutUser(data.phone, data.email, data.password, data.badToken)).toBe('Введите токен');
    })
    test('Проверка ввода пароля и токена', () => {
        expect(setDataAboutUser(data.phone, data.email, data.badPassword, data.badToken)).toBe('Введите токен и пароль');
    })
})