import { reservationsService } from "@/service/reservations";
import { Reservation, ReservationsByDateDTO } from "@/utils/types/Reservation";
import { CheckReservation } from "@/utils/types/Reservation"; // Import the CheckReservation type



export const getReservations = async (page = 0) => {
  const response = await reservationsService.getResevations(page);
  return response.data;
};

export const getReservationsByDate = async (data: ReservationsByDateDTO) => {
  const response = await reservationsService.getResevationsByDate(data);
  console.log(response.data)
  return response.data;
}

export const createReservation = async (reservation: Reservation) => {
  const response = await reservationsService.addReservation(reservation);
  return response.data;
};

export const updateReservation = async (reservation: Reservation) => {
  const response = await reservationsService.updateReservation(reservation);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  const response = await reservationsService.deleteReservation(id);
  return response.data;
}

export const getUncheckedReservations = async () => {
  const response = await reservationsService.getUnCheckedReservations();
  return response.data;
};



export const checkedInReservation = async ({
  id,
  checkedIn,
}: CheckReservation) => {
  const response = await reservationsService.checkinReservation({
    id,
    checkedIn,
  });
  return response.data;
};



export const countReservations = async () => {
  const response = await reservationsService.countReservations();
  return response.data;
};



export const getMonthlyReservations = async () => {
  const response = await reservationsService.getMonthlyReservations();
  return response.data;
};



export const getReservationsBetweenDates = async (start: Date, end: Date) => {
  const response = await reservationsService.getReservationsBetweenDates(
    start.toISOString().substring(0, 19),
    end.toISOString().substring(0, 19)
  );
  return response;
};



export const getReservationsForCurrentMonth = async () => {
  const response = await reservationsService.getReservationsForCurrentMonth();
  return response.data;
};



export const getReservationsForPreviousMonth = async () => {
  const response = await reservationsService.getReservationsForPreviousMonth();
  return response.data;
};


export const getUncheckedInReserations = async () => {
  const response = await reservationsService.getUncheckedInReserations();
  return response.data;
}
