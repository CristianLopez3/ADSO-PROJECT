import { useDispatch } from "react-redux";
import { Reservation } from "@/utils/types/Reservation";
import { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import BookForm from "./BookForm";
import DeleteModal from "@/components/Modal/DeleteModal";
import { formatedDate, formatedHour } from "@/utils/dateFormater";
import { InputCheck } from "@/components/Input";
import { AppDispatch } from "@/service/store/store";
import {
  checkedInReservationAction,
  deleteReservationAction,
} from "@/service/store/reservations/reservationActions";
import { PiTrash, PiPencil } from "react-icons/pi";
import Button from "@/components/Button";

import styles from "./styles.module.css";

type BookRowProps = { book: Reservation };

const BookRow = ({ book }: BookRowProps) => {
  const {
    id,
    name,
    description,
    email,
    numberOfPeople,
    phoneNumber,
    reservationDate,
    checkedIn,
  } = book;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(checkedIn!);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    try {
      await dispatch(deleteReservationAction(+id!));
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  const handleModal = useCallback(
    () => setOpenUpdateModal((prev) => !prev),
    []
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      dispatch(checkedInReservationAction({ id: id!, checkedIn: isChecked }));
    }
  };

  return (
    <>
      <tr className={styles.tr}>
        <td className="row-table">
          <form className="flex items-center justify-left pl-4">
            <InputCheck
              checked={checked}
              onChange={handleCheckboxChange}
              variant="success"
              disabled={checked}
            />
          </form>
        </td>
        <td className="row-table max-w-[100px] text-balance">{name}</td>

        <td className="row-table w-fit">
          {email}
          <span className={styles.tr_span}>{phoneNumber}</span>
        </td>
        <td className="row-table max-w-[300px] text-balance">{description}</td>
        <td className="row-table bg-zinc-800 w-fit">
          {formatedDate(reservationDate)}
          <span className={styles.tr_span}>
            {formatedHour(reservationDate)}
          </span>
        </td>
        <td className="row-table w-24">
          <div className="flex gap-2">
            <Button
              variant="warning"
              className="p-2 hover:opacity-105 hover:scale-105 transition-all duration-100"
              onClick={() => setOpenUpdateModal(!openUpdateModal)}
            >
              <PiPencil />
            </Button>
            <Button
              variant="light"
              className="p-2 hover:opacity-105 hover:scale-105 transition-all duration-100"
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            >
              <PiTrash />
            </Button>
          </div>
        </td>
      </tr>

      <Modal
        width="1/4"
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <DeleteModal
          onDelete={onDelete}
          message="Make sure you don't need the information of this reservation more, because there is no way to recover it."
          name={name}
        />
      </Modal>

      <Modal open={openUpdateModal} onClose={handleModal}>
        <BookForm
          id={id}
          name={name}
          email={email}
          description={description}
          reservationDate={reservationDate}
          numberOfPeople={numberOfPeople}
          phoneNumber={phoneNumber}
          mode="update"
          handleModal={handleModal}
        />
      </Modal>
    </>
  );
};

export default BookRow;
