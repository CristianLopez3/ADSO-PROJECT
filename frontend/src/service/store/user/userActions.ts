import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  countUsers,
  createUserService,
  deleteUserService,
  getUsers,
  updateUserService,
} from "./userService";

export const createUserAction = createAsyncThunk(
  "users/createUser",
  createUserService
);

export const getAllUsersAction = createAsyncThunk(
  "users/getAllUsers",
  getUsers
);

export const deleteUserAction = createAsyncThunk(
  "users/deleteUser",
  deleteUserService
);

export const updateUserAction = createAsyncThunk(
  "users/updateUser",
  updateUserService
);

export const countUsersAction = createAsyncThunk(
  "users/countUsers",
  countUsers
);
