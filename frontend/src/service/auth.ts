import { Auth } from "@/utils/types/Auth";
import { instance } from "./base.api";

const ENDPOINT = "auth";

export const authService = {
    login: (data: Auth) => instance.post(`${ENDPOINT}/login`, data),
    register: (data: Auth) => instance.post(`${ENDPOINT}/register`, data),
}