import { InputField } from "@/components/Input";
import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventPictureForm, eventPictureSchema } from "@/utils/types/Event";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventAction, updateEventPictureAction } from "@/service/store/event";
import styles from "./styles.module.css";

type PictureFormProps = {
  image: File | null;
  handleImage: (image: File | null) => void;
};

const PictureForm: React.FC<PictureFormProps> = ({ image, handleImage }) => {
  const { handleSubmit, reset } = useForm<EventPictureForm>({
    resolver: zodResolver(eventPictureSchema),
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<EventPictureForm> = useCallback(
    async (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("image", image!);
      try {
        await dispatch(updateEventPictureAction(formData));
        await dispatch(getEventAction());
      } catch (error) {
        console.error("Error updating event picture", error);
      } finally {
        reset();
      }
    },
    [dispatch, image]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.pictureForm}>
      <InputField
        type="file"
        name="image"
        className="border-2 border-zinc-600 rounded-lg p-2  cursor-pointer flex justify-center items-center w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleImage(e.target.files![0] && e.target.files![0]);
        }}
      />
      <InputField
        className="bg-zinc-600 text-zinc-200 py-2 px-4  rounded-lg cursor-pointer"
        type="submit"
        value="Change Picture"
      />
    </form>
  );
};

export default PictureForm;
