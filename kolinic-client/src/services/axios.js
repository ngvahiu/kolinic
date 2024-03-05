import axios from 'axios';

function getToken() {
    return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
}

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN
});
const publicAxios = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN
});


authAxios.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
});

authAxios.interceptors.response.use(
    (response) => response,
    function (error) {
        if (error?.response?.status === 401) {
            // localStorage.setItem('token', null);
            authAxios.defaults.headers.Authorization = null;
        }
        return Promise.reject(error);
    },
);

publicAxios.interceptors.response.use(
    (response) => response,
    function (error) {
        return Promise.reject(error);
    }
);

export {authAxios, publicAxios};