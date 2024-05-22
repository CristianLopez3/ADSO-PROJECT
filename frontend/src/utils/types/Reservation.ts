import { z } from "zod";

export interface Reservation {
  id?: number | string | null;
  name: string;
  phoneNumber: string;
  email: string;
  reservationDate: string;
  description: string;
  numberOfPeople: number;
  checkedIn?: boolean;
}

export interface CheckReservation {
  id: number | string;
  checkedIn: boolean;
}

export const reservationSchema = z.object({
  id: z.union([z.number(), z.string(), z.null()]),
  name: z.string().min(1, "Please enter a name"),
  phoneNumber: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  reservationDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Please enter a valid date for the reservation",
  }),
  reservationTime: z.string().refine((value) => {
    const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timePattern.test(value);
  }, {
    message: "Please enter a valid time for the reservation",
  }),
  description: z.string(),
  numberOfPeople: z
    .union([
      z.string().transform(Number),
      z.number().min(1, "Please enter a valid number of people (at least 1)"),
    ])
    .refine((value) => value >= 1, {
      message: "Please enter a valid number of people (at least 1)",
    }),
});


export type ReservationForm = z.infer<typeof reservationSchema>;

export interface ReservationReducer {
  isLoading: boolean;
  data: Reservation[];
  count?: number | null;

  isError: boolean;
  meta?: {
    totalPages?: number | null;
    // Add here other properties that 'meta' may have
  };
}
