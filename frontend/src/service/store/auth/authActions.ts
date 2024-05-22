import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "./authService";

export const TOKEN_COOKIE = "token";
export const USER_COOKIE = "user" ;

export const loginAction = createAsyncThunk(
  "auth/login",
  loginService
);


