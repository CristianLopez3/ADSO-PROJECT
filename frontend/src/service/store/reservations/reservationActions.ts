// menuActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReservations,
  createReservation,
  getUncheckedReservations,
  checkedInReservation,
  countReservations,
  updateReservation,
  deleteReservation,
  getReservationsByDate,
  //  getMonthlyReservations,
} from "./reservationService";

export const createReservationAction = createAsyncThunk(
  "reservations/createReservation",
  createReservation
);

export const getReservationsAction = createAsyncThunk(
  "reservations/getReservations",
  getReservations
);

export const getReservationsByDateAction = createAsyncThunk(
  "reservations/getReservationsByDate",
  getReservationsByDate
);

export const getUncheckedReservationsAction = createAsyncThunk(
  "reservations/getUncheckedReservations",
  getUncheckedReservations
);

export const checkedInReservationAction = createAsyncThunk(
  "reservations/checkedInReservation",
  checkedInReservation
);

export const countReservationsAction = createAsyncThunk(
  "reservations/countReservations",
  countReservations
);

export const updateReservationAction = createAsyncThunk(
  "reservations/updateReservation",
  updateReservation
);

export const deleteReservationAction = createAsyncThunk(
  "reservations/deleteReservation",
  deleteReservation
);


