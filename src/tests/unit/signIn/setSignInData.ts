// @ts-ignore
const axios = require('axios');

const setSignInData = (email:string, password:string) => {
    const url = new URL('https://ctfmarket.ru:8080/api/v1/auth/login/');

    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if(emailRegex.test(email)) {
        if(password.length) {
            axios.post(url.toString(), {
                email: email,
                password: password
            })
                .then((res:any) => {
                    if(res.data.error) {
                        throw res.data.error;
                    } else {
                        document.cookie =`token=${res.data.token}; path=/; max-age=2592000; secure=true`;
                        // dispatch(changeIsSignIn());
                        // dispatch(changeIsCookieOpen());

                        //router.push('/');
                    }
                });
        } else {
            return 'Введите пароль';
        }

    } else {
        return 'Почта введена в неправильном формате';

        //setTimeout(() => errorMess = '', 5000);
    }
}

module.exports = setSignInData;