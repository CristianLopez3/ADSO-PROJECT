import Cookies from "universal-cookie"

export const cookies = new Cookies();

export const getCookies = (name: string) => {
    return cookies.get(name);
}

export const removeCookies = (name: string) => {
    return cookies.remove(name);
}