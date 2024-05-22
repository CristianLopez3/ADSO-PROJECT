import { eventService } from "@/service/events";


export const getEvent = async () => {
    const response = await eventService.getEvent();
    return response.data;
}

export const updateEvent = async (formData: FormData) => {
    const response = await eventService.updateEvent(formData);
    return response.data;
}

export const updateEventPicture = async (formData: FormData) => {
    const response = await eventService.updateEventPicture(formData);
    return response.data;
}

export const getEventPicture = async () => {
    const response = await eventService.getEventPicture();
    return response.data;
}