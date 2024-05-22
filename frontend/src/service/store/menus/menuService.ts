import { menusService } from "@/service/menu";
import { MenuPost } from "@/utils/types/Menu";
import { MenuStatePatch } from '@/utils/types/Menu';

export const getMenus = async () => {
  const response = await menusService.getMenus();
  return response.data;
};

export const getMenusByCategory = async (id: number) => {
  const response = await menusService.getMenusByCategory(id);
  return response.data;
};

export const addMenu = async (menu: FormData) => {
  const response = await menusService.addMenu(menu);
  return response.data;
};

export const updateMenu = async (menu: MenuPost) => {
  const response = await menusService.updateMenu(menu);
  return response.data;
};

export const deleteMenu = async (id: number) => {
  const response = await menusService.deleteMenu(id);
  return response.data;
};

export const changeState = async (menu: MenuStatePatch) => {
  const response = await menusService.changeState(menu);
  return response.data;
}

export const countMenu = async () => {
  const response = await menusService.countMenu();
  return response.data;
}
