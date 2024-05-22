import { useCallback, useState } from "react";
import { Modal, DeleteModal } from "@/components/Modal";
import UserForm from "./UserForm";
import { User } from "@/utils/types/User";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/store/store";
import { deleteUserAction, getAllUsersAction } from "@/service/store/user";
import { PiTrash, PiPencil } from "react-icons/pi";
import Button from "@/components/Button";

type UserRowProps = { user: User };

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const {
    id,
    name,
    lastname,
    email,
    identification,
    cellphone,
    role,
  } = user;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    await dispatch(deleteUserAction(id!));
    await dispatch(getAllUsersAction());
  };

  const toggleAddModal = useCallback(() => {
    setOpenUpdateModal((prevState) => !prevState);
  }, []);


  return (
    <>
      <tr className="border-none" style={{marginTrim: "initial"}}>
        <td className="row-table flex flex-col text-lg w-full">
          {name} <span className="text-sm text-zinc-100">{email}</span>
        </td>

        <td className="row-table">{cellphone}</td>
        <td className="row-table">{role}</td>

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
              className="p-2 border-zinc-500 hover:opacity-105 hover:scale-105 transition-all duration-100"
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            >
              <PiTrash />
            </Button>
          </div>
        </td>
      </tr>
      {openDeleteModal && (
        <Modal
          width="1/4"
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(!openDeleteModal)}
        >
          <DeleteModal onDelete={onDelete} name={name} />
        </Modal>
      )}
      {openUpdateModal && (
        <Modal
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(!openUpdateModal)}
        >
          <UserForm
            mode="update"
            handleUpdateModal={toggleAddModal}
            id={id!}
            name={name}
            lastname={lastname}
            email={email}
            cellphone={cellphone.toString()}
            identification={identification}
            role={role}
          />
        </Modal>
      )}
    </>
  );
};

export default UserRow;
