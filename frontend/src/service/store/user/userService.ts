import { usersService } from "@/service/users";
import { User } from "@/utils/types/User";


export const getUsers = async (page = 0) => {
  const response = await usersService.getAll(page);
  return response.data;
};


export const createUserService = async (user: User) => {
  const response = await usersService.add({ user });
  return response.data; // Assuming the response has a 'data' property containing the user data
};


export const deleteUserService = async (id: number | string) => {
  const response = await usersService.deleteUser({ id });
  return response.data;
};


export const updateUserService = async (user: User) => {
  const response = await usersService.update({ user });
  return response.data;
};


export const countUsers = async () => {
  const response = await usersService.countUsers();
  return response.data;
}