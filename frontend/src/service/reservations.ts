import { instance } from "./base.api";
import { CheckReservation, ReservationsByDateDTO, type Reservation } from "@/utils/types/Reservation";

const ENDPOINT = "reservations";

export const reservationsService = {
  addReservation:  (reservation: Reservation)=> {
    return instance.post(ENDPOINT, reservation);
  },

  updateReservation:  (reservation: Reservation)=> {
    return instance.put(`${ENDPOINT}/${reservation.id!}`, reservation);
  },

  deleteReservation:  (id: number)=> {
    return instance.delete(`${ENDPOINT}/${id!}`);
  },
  
  getResevations:  (page = 0 ) => {
    return instance.get(`${ENDPOINT}?page=${page}`);
  },

  getResevationsByDate:  ({page = 0, date}: ReservationsByDateDTO) => {
    return instance.get(`${ENDPOINT}/date?date=${date}&page=${page}`);
  },

  getUnCheckedReservations:  () => {
    return instance.get(`${ENDPOINT}/unchecked-in`);
  },

  checkinReservation:  ({ id, checkedIn }: CheckReservation) => {
    return instance.patch(`${ENDPOINT}/check/` + id, { checkedIn });
  },

  countReservations: () => {
    return instance.get(ENDPOINT + "/count");
  },

  getMonthlyReservations: () => {
    return instance.get(ENDPOINT + "/mes");
  },

  getReservationsBetweenDates: (start: string, end: string) => {
    return instance.get(ENDPOINT + `/between-dates?start=${start}&end=${end}`);
  },

  getReservationsForGivenMonths: (start: string, end: string) => {
    return instance.get(ENDPOINT + `/compare-months?start=${start}&end=${end}`);
  },

  getReservationsForCurrentMonth: () => {
    return instance.get(ENDPOINT + "/current-month");
  },

  getReservationsForPreviousMonth: () => {
    return instance.get(ENDPOINT + "/previous-month");
  },

  getUncheckedInReserations: () => {
    return instance.get(ENDPOINT + "/unchecked-in-count");
  },
};
