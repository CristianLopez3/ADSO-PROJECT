import { ENDPOINTS, instance } from "./base.api";


const ENDPOINT = ENDPOINTS.CATEGORY;

export const categoryService = {
  getCategories: function () {
    return instance.get(ENDPOINT);
  },
};
