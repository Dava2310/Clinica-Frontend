import Cookies from "universal-cookie"
import { nameCookieSessionApp } from "../config";
import { PropsToken } from "../types";

const cookie = new Cookies;

export const getCookie = (name:string): string|PropsToken|undefined  => {
    //Extraemos el valor de la cookie
    const data = cookie.get(name);

    //Verificamos si la cookie es la de la sesión de la app
    if(name === nameCookieSessionApp){
        return data as PropsToken
    }

    //Retornamos el valor de la cookie
    return data;
}

export const deleteCookie = (name:string): void =>  {
    cookie.remove(name,{ path: '/' })
}

export const setCookie = (nameCookie:string, token:string, maxAge:number) :void => { 
    cookie.set(nameCookie, token, { maxAge : maxAge, path: '/' }); 
}