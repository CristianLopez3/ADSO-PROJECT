import { ENDPOINTS, instance } from "./base.api";
import { User } from "../utils/types/User";

const ENDPOINT = ENDPOINTS.USERS;

export const usersService = {
  
  getAll: function (page = 0) {
    return instance.get(`${ENDPOINT}?page=${page}`);
  },

  add: function ({ user }: { user: User }) {
    return instance.post(ENDPOINT, user);
  },

  getUserById: function ({ id }: { id: number | string }) {
    return instance.get(`${ENDPOINT}/${id}`);
  },

  deleteUser: function ({ id }: { id: number | string }) {
    return instance.delete(`${ENDPOINT}/${id}`);
  },

  update:  ({ user }: { user: User }) => {
    return instance.put(`${ENDPOINT}/${user.id!}`, user);
  },

  countUsers: () => {
    return instance.get(ENDPOINT + "/count");
  },
};
