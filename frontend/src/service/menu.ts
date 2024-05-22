import { ENDPOINTS, instance } from "./base.api";
import { MenuPost, MenuStatePatch } from "@/utils/types/Menu";

const ENDPOINT = ENDPOINTS.MENU;

export const menusService = {
  getMenus: () => {
    return instance.get(ENDPOINT);
  },

  getMenuById: (id: number | string) => {
    return instance.get(`${ENDPOINT}/${id}`);
  },

  getMenusByCategory: (id: number | string) => {
    return instance.get(`${ENDPOINT}/category/${id}`);
  },

  addMenu: (formData: FormData) => {
    return instance.post(ENDPOINT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMenu: (id: number | string) => {
    return instance.delete(`${ENDPOINT}/${id}`);
  },

  updateMenu: (menu: MenuPost) => {
    return instance.put(`${ENDPOINT}/${menu.id!}`, menu);
  },

  changeState: ({ id, state }: MenuStatePatch) => {
    return instance.patch(ENDPOINT + `/state/` + id, { state });
  },

  countMenu: () => {
    return instance.get(ENDPOINT + "/count");
  },
};
