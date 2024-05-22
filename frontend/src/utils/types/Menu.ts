import { z } from "zod";

// * This is the type of the data that we are going to show in the table
export interface Menu {
  id? : number | string | null;
  title: string;
  description: string;
  price: number;
  state: boolean;
  imageName: string;
  category: Category;
}

// * This is the type of the data that we are going to send to the server
export interface MenuPost {
  id?: number | string | null;
  title: string;
  description: string;
  price: number;
  state: boolean;
  idCategory: number | string;
}

// * This is the type of the data that we are going to use in the reducer in order to change the state of the menu
export interface MenuStatePatch {
  id: number | string;
  state: boolean;
}

// * This is the schema that we are going to use to validate the data
export const menuSchema = z.object({
  id: z.union([z.string(), z.number(), z.null()]),
  title: z.string(),
  price: z.union([z.string(), z.number()]),
  description: z.string(),
  state: z.string(),

  idCategory: z.union([z.string(), z.number()]),
});

// * This is the type of the data that we are going to send to the server
export type MenuForm = z.infer<typeof menuSchema>;

// * This is the type of the data that we are going to show in the table
export type Category = {
  id: number | string;
  name: string;
}


// * This is the type of the data that we are going to use in the reducer

export interface MenuReducer {
  isLoading: boolean;
  data: Menu[];
  count?: number | null;
  isError: boolean;
  meta?: {
    totalPages?: number | null;
  }
}
