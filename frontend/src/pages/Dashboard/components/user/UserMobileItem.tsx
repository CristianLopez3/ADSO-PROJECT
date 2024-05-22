import { useState } from "react";
import Button from "@/components/Button";
import { PiTrash, PiPencil } from "react-icons/pi";
import { User } from "@/utils/types/User";
import { Modal, DeleteModal } from "@/components/Modal";
import UserForm from "./UserForm";

export type UserMobileItemProps = { user: User };

const UserMobileItem: React.FC<UserMobileItemProps> = ({ user }) => {
  const {
    id,
    cellphone,
    email,
    name,
    role,
    identification,
    lastname,
    password,
  } = user;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleUpdateModal = () => setOpenUpdateModal(!openUpdateModal);

  return (
    <>
      <article key={id} className="bg-white p-4 rounded-lg shadow">
        <div className="text-xs flex items-center justify-between space-x-2 md:text-sm gap-x-4">
          <div>{name}</div>
          <div>{role}</div>
        </div>
        <div className="text-sm text-gray-600 py-2">{cellphone}</div>
        <div className="text-sm text-gray-600 py-2">{email}</div>
        <div className="flex gap-2">
          <Button
            variant="warning"
            className="p-2"
            onClick={() => setOpenUpdateModal(!openUpdateModal)}
          >
            <PiPencil />
          </Button>
          <Button
            variant="danger"
            className="p-2"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            <PiTrash />
          </Button>
        </div>
      </article>
      <Modal open={openDeleteModal} onClose={handleDeleteModal}>
        <DeleteModal onDelete={handleDeleteModal} name={name} />
      </Modal>

      <Modal open={openUpdateModal} onClose={handleUpdateModal}>
        <UserForm
          mode="update"
          handleUpdateModal={handleUpdateModal}
          name={name}
          email={email}
          cellphone={cellphone}
          id={id!}
          role={role}
          identification={identification}
          lastname={lastname}
          password={password}
        />
      </Modal>
    </>
  );
};

export default UserMobileItem;
