import { TOKEN_COOKIE } from "@/service/store/auth";
import { getCookies } from "@/utils/cookies";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_APP_API_URL as string;
export const IMAGES_URL = import.meta.env.VITE_APP_API_IMAGES as string;

export const ENDPOINTS = {
  MENU: "menus",
  CATEGORY: "category",
  RESERVATIONS: "reservations",
  USERS: "users",
  EVENTS: "events"
};

export const instance = axios.create({
  baseURL: BASE_URL,
});

const PROTECTED_ENDPOINTS = [
  ENDPOINTS.MENU,
  ENDPOINTS.CATEGORY,
  ENDPOINTS.RESERVATIONS,
  ENDPOINTS.USERS,
  ENDPOINTS.EVENTS
];

instance.interceptors.request.use(
  (config) => {
    const token = getCookies(TOKEN_COOKIE);

    if (
      config.url &&
      PROTECTED_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint)) &&
      token
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
