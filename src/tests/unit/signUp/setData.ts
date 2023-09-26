const axios = require('axios');

function setData(phone:string, email:string, password:string, token:string) {
    const url = new URL('https://ctfmarket.ru:8080/api/v1/auth/register/');

    const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (phoneRegex.test(phone) && emailRegex.test(email)) {

        if (password.length && token.length) {
            axios.post(url.toString(), {
                secret_key: token,
                password: password,
                email: email,
                phone: phone
            })
                .then((res: any) => {
                    if (res.data.error) {
                        throw res.data.error;
                    } else {
                        //router.push('/signIn');
                    }
                });

        } else if (!password.length && token.length) {
            return 'Введите пароль';
        } else if (!token.length && password.length) {
            return 'Введите токен';
        } else {
            return 'Введите токен и пароль';
        }

    } else if (!phoneRegex.test(phone) && !emailRegex.test(email)) {
        return 'Телефон и почта введены в неправильном формате';
    } else if (!phoneRegex.test(phone)) {
        return 'Телефон введён в неправильном формате';
    } else if (!emailRegex.test(email)) {
        return 'Почта введена в неправильном формате';
    }
}

module.exports = setData;