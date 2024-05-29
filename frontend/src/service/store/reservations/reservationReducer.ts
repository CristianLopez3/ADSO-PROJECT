import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getReservationsAction,
  createReservationAction,
  checkedInReservationAction,
  countReservationsAction,
  updateReservationAction,
  deleteReservationAction,
  getReservationsByDateAction,
} from "./reservationActions";
import { Reservation, ReservationReducer } from "@/utils/types/Reservation";
import { getUncheckedReservationsAction } from "./reservationActions";

const initialState: ReservationReducer = {
  isLoading: false,
  data: [],
  meta: {
    totalPages: null,
  },
  count: null,
  isError: false,
};

const startLoading = (state: ReservationReducer) => {
  state.isLoading = true;
  state.isError = false;
};

const loadingFailed = (state: ReservationReducer) => {
  state.isLoading = false;
  state.isError = true;
};

const reservationSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * Add the getAllMenusAction reducer
      .addCase(getReservationsAction.pending, startLoading)
      .addCase(
        getReservationsAction.fulfilled,
        (
          state,
          action: PayloadAction<{ content: Reservation[]; totalPages: number }>
        ) => {
          state.isLoading = false;
          state.data = action.payload.content;
          state.meta!.totalPages = action.payload.totalPages ?? null;
        }
      )
      .addCase(getReservationsAction.rejected, loadingFailed)

      .addCase(getReservationsByDateAction.pending, startLoading)
      .addCase(
        getReservationsByDateAction.fulfilled,
        (
          state,
          action: PayloadAction<{ content: Reservation[]; totalPages: number }>
        ) => {
          state.isLoading = false;
          state.data = action.payload.content;
          state.meta!.totalPages = action.payload.totalPages ?? null;
        }
      )
      .addCase(getReservationsByDateAction.rejected, loadingFailed)

      // * Add the addMenu reducer
      .addCase(createReservationAction.pending, startLoading)
      .addCase(
        createReservationAction.fulfilled,
        (state, action: PayloadAction<Reservation>) => {
          state.isLoading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(createReservationAction.rejected, loadingFailed)
      .addCase(getUncheckedReservationsAction.pending, startLoading)
      .addCase(getUncheckedReservationsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        );
      })
      .addCase(getUncheckedReservationsAction.rejected, loadingFailed)

      .addCase(checkedInReservationAction.pending, startLoading)
      .addCase(checkedInReservationAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        );
      })
      .addCase(checkedInReservationAction.rejected, loadingFailed)
      /**
       * ADD COUNT RESERVATIONS
       */
      .addCase(countReservationsAction.pending, startLoading)
      .addCase(countReservationsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(countReservationsAction.rejected, loadingFailed)
      /**
       * UPDATE RESERVATION
       */
      .addCase(updateReservationAction.pending, startLoading)
      .addCase(updateReservationAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        );
      })
      .addCase(updateReservationAction.rejected, loadingFailed)
      /**
       * DELETE RESERVATION
       */
      .addCase(deleteReservationAction.pending, startLoading)
      .addCase(deleteReservationAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg; // Obtiene el ID del menú eliminado de action.meta.arg
        state.data = state.data.filter(
          (reservation) => reservation.id !== deletedId
        );
      })
      .addCase(deleteReservationAction.rejected, loadingFailed);
  },
});

export default reservationSlice.reducer;
