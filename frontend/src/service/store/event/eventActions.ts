import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEvent, getEventPicture, updateEvent, updateEventPicture } from "./eventService";

export const getEventAction = createAsyncThunk("event/getEvent", getEvent);

export const updateEventAction = createAsyncThunk(
  "event/updateEvent",
  updateEvent
);

export const updateEventPictureAction = createAsyncThunk(
  "event/updateEventPicture",
  updateEventPicture
);

export const getEventPictureAction = createAsyncThunk(
  "event/getEventPicture",
  getEventPicture
);