import { z } from "zod";
import {  UserAuthResponse } from "./User";

export interface Auth {
    username: string;
    password: string;
}

export const  schema = z.object({
    username: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});


export type AuthTypes = z.infer<typeof schema>;

// REDUCER STATE
export interface AuthState {
    isLoading: boolean;
    user: AuthPayload | null;
    isError: boolean;
}

export interface AuthPayload {
    accessToken: string;
    user: UserAuthResponse;
    expiresIn: Date;
}