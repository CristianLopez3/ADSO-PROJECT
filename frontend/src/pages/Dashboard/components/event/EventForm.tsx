import { InputField } from "@/components/Input";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Event,
  EventForm as EventFormTypes,
  eventSchema,
} from "@/utils/types/Event";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventAction, updateEventAction } from "@/service/store/event";
import PictureForm from "./PictureForm";

type EventFormProps = {
  handleModal: () => void;
  event: Event;
};

const EventForm: React.FC<EventFormProps> = ({ handleModal, event }) => {
  const [image, setImage] = useState<File | null>(null);
  const { title, description, discount, url } = event;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EventFormTypes>({
    defaultValues: {
      title,
      discount,
      description,
      url,
    },
    resolver: zodResolver(eventSchema),
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await dispatch(getEventAction());
      } catch (error) {
        throw new Error("Error fetching events");
      }
    };
    fetchEvents();
  }, [dispatch]);

  const onSubmit: SubmitHandler<EventFormTypes> = useCallback(
    async (data) => {
      const formData = new FormData();
      const event: Event = {
        title: data.title,
        description: data.description,
        discount: Number(data.discount),
      };
      formData.append("event", JSON.stringify(event));
      try {
        await dispatch(updateEventAction(formData));
        dispatch(getEventAction());
      } catch (error) {
        console.error("Error creating or updating menu", error);
      } finally {
        reset();
      }
    },
    [dispatch, handleModal]
  );

  const renderErrorMessage = (error: { message?: string }) => {
    return error && <p className="p-1 text-red-700">{error.message}</p>;
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Update The event</h1>
      </div>
      <PictureForm image={image} handleImage={setImage} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <InputField
              {...register("title")}
              placeholder="title"
              className={styles.input}
            />
            {renderErrorMessage(errors.title!)}

            <InputField
              {...register("discount", { valueAsNumber: true })}
              type="number"
              placeholder="Discount"
              className={styles.input}
            />
            {renderErrorMessage(errors.discount!)}
          </div>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mx-auto w-32 h-32 border mt-6"
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_APP_API_URL}events/1/picture`}
              alt="events image"
              className="w-56 h-56 mx-auto"
            />
          )}
        </div>
        <textarea
          {...register("description")}
          className={styles.textarea}
          rows={15}
        ></textarea>
        {renderErrorMessage(errors.description!)}

        <div className={styles.footer}>
          <Button
            onClick={handleModal}
            variant="light"
            className="border border-zinc-800"
            content="CANCEL"
            type="button"
          />
          <Button variant="dark" content="UPDATE" type="submit" />
        </div>
      </form>
    </>
  );
};

export default EventForm;
