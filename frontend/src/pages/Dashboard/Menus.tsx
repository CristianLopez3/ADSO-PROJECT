import React, { Suspense, useEffect, useState, useCallback } from "react";
import { AppDispatch, RootState } from "@/service/store/store";

import { RiAddFill } from "react-icons/ri";

import DashboardNavbar from "./components/dashboard/DashboardNavbar";
import Modal from "@/components/Modal/Modal";
import MenuForm from "./components/menu/MenuForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenusAction } from "@/service/store/menus/menuActions";
import { TableSkeleton } from "@/components/Skeleton";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

const MenuTable = React.lazy(() => import("./components/menu/MenuTable"));

import styles from "./styles.module.css";

// Move fetchMenus outside of the component
const fetchMenus = async (dispatch: AppDispatch) => {
  try {
    await dispatch(getAllMenusAction());
  } catch (error) {
    console.log(error);
  }
};

const Menus = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menus);

  const toggleAddModal = useCallback(() => {
    setAddModal((prevState) => !prevState);
  }, []);

  const handleModal = useCallback(() => {
    setAddModal(false);
  }, []);

  useEffect(() => {
    fetchMenus(dispatch);
  }, [dispatch]);

  return (
    <>
      <header>
        <DashboardNavbar>
          <h2 className={styles.title}>
            <div className={styles.title_line} />
            Menus
          </h2>
          <Button
            variant="success"
            className={styles.add_button}
            onClick={toggleAddModal}
          >
            <span>Add</span> <RiAddFill />
          </Button>
        </DashboardNavbar>
      </header>
      <main className="px-2 md:px-8 mx-auto">
        {menus.isLoading ? (
          <TableSkeleton />
        ) : menus.isError ? (
          <Alert
            title="Error fetching menus"
            description="An error ocurred when the data was being brought in!"
            mode="danger"
          />
        ) : (
          <Suspense fallback={<TableSkeleton />}>
            <MenuTable data={menus.data} />
          </Suspense>
        )}
      </main>

      <Modal open={addModal} onClose={toggleAddModal}>
        <MenuForm mode="create" handleModal={handleModal} />
      </Modal>
    </>
  );
};

export default Menus;
