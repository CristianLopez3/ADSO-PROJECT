import Button from "@/components/Button";
import { InputField } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { createReservationAction } from "@/service/store/reservations";
import { AppDispatch } from "@/service/store/store";
import {
  Reservation,
  ReservationForm,
  reservationSchema,
} from "@/utils/types/Reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FormBooking = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReservationSuccess, setIsReservationSuccess] =
    useState<boolean>(false); // Nuevo estado

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationForm>({
    defaultValues: {
      id: null,
      name: "",
      email: "",
      phoneNumber: "",
      reservationDate: "",
      reservationTime: "",
      description: "",
      numberOfPeople: undefined,
    },
    resolver: zodResolver(reservationSchema),
  });

  useEffect(() => {
    if (isReservationSuccess) {
      setIsOpen(true);
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
        setIsReservationSuccess(false); // Restablecer el estado de éxito de la reserva
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isReservationSuccess]);

  const onSubmit: SubmitHandler<ReservationForm> = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        data.id = data.id === "" || data.id === null ? null : data.id;
        const reservation: Reservation = {
          id: data.id,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          description: data.description,
          reservationDate: `${data.reservationDate}T${data.reservationTime}:00`,
          numberOfPeople: data.numberOfPeople,
        };
        console.log(reservation.reservationDate);
        await dispatch(createReservationAction(reservation));
        reset();
        setIsReservationSuccess(true);
      } catch (error) {
        console.error("Error in onSubmit:", error); // Agregado
        throw new Error("Error creating or updating menu");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, reset]
  );

  const renderErrorMessage = (error: { message?: string }) => {
    return (
      error && <p className="text-red-600 text-sm pl-1">{error.message}</p>
    );
  };



  return (
    <div className="width-full mx-auto">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:grid lg:grid-cols-2 gap-x-2">
          <div className="input-validation">
            <InputField
              {...register("name")}
              placeholder="Write your name..."
            />
            {renderErrorMessage(errors.name!)}
          </div>
          <div className="input-validation">
            <InputField placeholder="Phone number" {...register("phoneNumber")}  />
            {renderErrorMessage(errors.phoneNumber!)}
          </div>
        </div>
        <InputField
          {...register("email")}
          type="email"
          placeholder="Write your email..."
        />
        {renderErrorMessage(errors.email!)}

        <div className="w-full grid grid-cols-1 items-center gap-4  md:grid-cols-3">
          <div className="input-validation">
            <InputField
              {...register("reservationDate")}
              type="date"
            />
            {renderErrorMessage(errors.reservationDate!)}
          </div>
          <div className="input-validation">
            <InputField
              {...register("reservationTime")}
              type="time"
            />
            {renderErrorMessage(errors.reservationTime!)}
          </div>
          <div className="input-validation">
            <InputField
              {...register("numberOfPeople")}
              placeholder="How many people?..."
              type="number"
            />
            {renderErrorMessage(errors.numberOfPeople!)}
          </div>
        </div>
        <InputField
          {...register("description")}
          type="text"
          placeholder="Write your description..."
        />
        {renderErrorMessage(errors.description!)}

        <div className="pt-4">
          <Button
            content="Book Now"
            variant="dark"
            className="w-full mx-auto md:w-1/2 "
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
      {isOpen && (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <p>Haz reservado con exito</p>
        </Modal>
      )}
    </div>
  );
};

export default FormBooking;
