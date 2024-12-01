// axiosInstance.ts
import axios from "axios";
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp } from "../config";
// import { readError } from "../utils/readErrors";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000',
});

instance.interceptors.request.use((request) => {
    if (request.url?.includes('login') || request.url?.includes('signUp')) return request;

    const token = getCookie(nameCookieSessionApp);
    request.headers.Authorization = `Bearer ${token?.accessToken}`;
    return request;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // const customError = readError(error);
        return Promise.reject(error);
    }
);

export default instance;
