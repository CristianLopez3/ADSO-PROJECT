import { z } from "zod";

export interface User {
  id?: string | number | null;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  identification: string;
  cellphone: string;
  role: string;
}

export const USER_ROLES = {
  ADMIN: "ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
  WAITRESS: "WAITRESS",
  BARTENDER: "BARTENDER",
  COOK: "COOK",
};



export interface UserAuthResponse {
  id: string | number;
  name: string;
  lastname: string;
  email: string;
  identification: string;
  cellphone: string;
  role: string;
}

export interface UserReducerState {
  isLoading: boolean;
  data: User[];
  count?: number | null;
  isError: boolean;
  meta?: {
    totalPages?: number | null;
  };
}

export const userSchema = z.object({
  id: z.union([z.string(), z.number(), z.null()]),
  name: z.string().min(3, "Name is required"),
  lastname: z.string().min(3, "Lastname is required"),
  email: z.string().email("Invalid email address"),
  password: z.union([z.string(), z.null()]),
  identification: z
    .string()
    .min(7, "Identification have at least 7 characters"),
  cellphone: z.string().min(7, "Cellphone is required"),
  role: z.string().min(4, "Role is required"),
});

export type UserFormTypes = z.infer<typeof userSchema>;
