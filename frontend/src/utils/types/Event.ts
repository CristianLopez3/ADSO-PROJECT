import { z } from "zod";

export interface Event {
  id?: number;
  title: string;
  description: string;
  discount: number;
  url?: string;
}

export const eventSchema = z.object({
  title: z.string().min(8, "Please, provide a more detailed title."),
  description: z
    .string()
    .min(20, "Please, provide a more detailed description."),
  discount: z.number().int().min(1).max(100),
  url: z.string(),
});


export type EventForm = z.infer<typeof eventSchema>;

export const eventPictureSchema = z.object({});

export type EventPictureForm = z.infer<typeof eventPictureSchema>;

export interface EventReducerState {
  isLoading: boolean;
  data: Event;
  isError: boolean;
  picture: string | null;
}
