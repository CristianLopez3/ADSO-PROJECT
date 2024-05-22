import { EventReducerState } from "@/utils/types/Event";
import { createSlice } from "@reduxjs/toolkit";
import {
  getEventAction,
  getEventPictureAction,
  updateEventAction,
  updateEventPictureAction,
} from "./eventActions";

const initialState: EventReducerState = {
  isLoading: false,
  data: {
    title: "",
    description: "",
    discount: 0,
    url: "",
  },
  picture: null,
  isError: false,
};

const startLoading = (state: EventReducerState) => {
  state.isLoading = true;
  state.isError = false;
};

const loadingFailed = (state: EventReducerState) => {
  state.isLoading = false;
  state.isError = true;
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getEventAction.pending, startLoading)
      .addCase(getEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getEventAction.rejected, loadingFailed)

      .addCase(updateEventAction.pending, startLoading)
      .addCase(updateEventAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(updateEventAction.rejected, loadingFailed)

      .addCase(updateEventPictureAction.pending, startLoading)
      .addCase(updateEventPictureAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateEventPictureAction.rejected, loadingFailed)

      .addCase(getEventPictureAction.pending, startLoading)
      .addCase(getEventPictureAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.picture = payload;
      })
      .addCase(getEventPictureAction.rejected, loadingFailed);
  },
});

export default eventSlice.reducer;
