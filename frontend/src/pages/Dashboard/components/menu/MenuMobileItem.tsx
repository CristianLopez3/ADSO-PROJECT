import { useState } from "react";

import { Modal, DeleteModal } from "@/components/Modal";
import { Menu } from "@/utils/types/Menu";
import { PiTrash, PiPencil } from "react-icons/pi";
import Button from "@/components/Button";
import MenuForm from "./MenuForm";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/store/store";
import { changeStateAction, deleteMenuAction } from "@/service/store/menus";
import Toggle from "@/components/Toggle";

export type MenuMobileItemProps = { menu: Menu };

const MenuMobileItem: React.FC<MenuMobileItemProps> = ({ menu }) => {
  const { id, title, description, price, state } = menu;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [menuState, setMenuState] = useState(state);

  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    try {
      await dispatch(deleteMenuAction(+id!));
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  const onStateChange = async () => {
    const newState = !menuState;
    try {
      const resultAction = await dispatch(
        changeStateAction({ id: +id!, state: newState })
      );

      if (changeStateAction.fulfilled.match(resultAction)) {
        setMenuState(newState);
      }
    } catch (error) {
      console.error("Failed to change menu state:", error);
    }
  };

  return (
    <>
      <article key={id} className={styles.mobile_container}>
        <div className={`${styles.mobile_text}`}>
          <div className="font-bold text-m\">{title}</div>
          <div >
            <Toggle
              variant="dark"
              enabled={menuState}
              setEnabled={onStateChange}
            />
          </div>
        </div>
        <div className={styles.mobile_description}>{description}</div>
        <section className={styles.mobile_footer_section}>
          <div className={styles.mobile_buttons}>
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
          <div className={`${styles.mobile_price}  `}>{price}</div>
        </section>
      </article>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <DeleteModal onDelete={onDelete} name={title} />
      </Modal>

      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(!openUpdateModal)}
      >
        <MenuForm
          mode="update"
          handleModal={() => setOpenUpdateModal(!openUpdateModal)}
          description={description}
          id={id}
          price={price}
          title={title}
        />
      </Modal>
    </>
  );
};

export default MenuMobileItem;
