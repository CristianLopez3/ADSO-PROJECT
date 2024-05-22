import { ENDPOINTS, instance } from "@/service/base.api";


const ENDPOINT = ENDPOINTS.EVENTS;

export const eventService = {
  getEvent: function () {
    return instance.get(`${ENDPOINT}/1`);
  },

  updateEvent: (formData: FormData) => {
    return instance.put(`${ENDPOINT}/1`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateEventPicture: (formData: FormData) => {
    return instance.put(`${ENDPOINT}/1/picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getEventPicture: () => {
    return instance.get(`${ENDPOINT}/1/picture`);
  }

};
