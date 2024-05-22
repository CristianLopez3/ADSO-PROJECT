import { PiTrash, PiPencil } from "react-icons/pi";
import { Reservation } from "@/utils/types/Reservation";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import BookForm from "./BookForm";
import DeleteModal from "@/components/Modal/DeleteModal";
import Button from "@/components/Button";
import { formatedDate, formatedHour } from "@/utils/dateFormater";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/store/store";
import { deleteReservationAction } from "@/service/store/reservations";
export type BookingMobileItemProps = { book: Reservation };

const BookMobileItem: React.FC<BookingMobileItemProps> = ({ book }) => {
  const {
    id,
    name,
    reservationDate,
    description,
    phoneNumber,
    email,
    numberOfPeople,
  } = book;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    try {
      await dispatch(deleteReservationAction(+id!));
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };
  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleUpdateModal = () => setOpenUpdateModal(!openUpdateModal);
  return (
    <>
      <article key={id} className="bg-zinc-100 p-4 rounded-lg shadow">
        <div className="text-xs flex items-center justify-between space-x-2 md:text-sm gap-x-4">
          <div>{formatedDate(reservationDate)}</div>
          <div>{formatedHour(reservationDate)}</div>
        </div>
        <div className="text-sm text-gray-600 py-2">{name}</div>
        <div className="flex gap-2">
          <Button variant="warning" className="p-2" onClick={handleUpdateModal}>
            <PiPencil />
          </Button>
          <Button variant="danger" className="p-2" onClick={handleDeleteModal}>
            <PiTrash />
          </Button>
        </div>
      </article>

      <Modal open={openDeleteModal} onClose={handleDeleteModal}>
        <DeleteModal onDelete={onDelete} name={name} />
      </Modal>

      <Modal open={openUpdateModal} onClose={handleUpdateModal}>
        <BookForm
          mode="update"
          handleModal={handleUpdateModal}
          name={name}
          phoneNumber={phoneNumber}
          description={description}
          numberOfPeople={numberOfPeople}
          email={email}
          reservationDate={reservationDate}
        />
      </Modal>
    </>
  );
};

export default BookMobileItem;
