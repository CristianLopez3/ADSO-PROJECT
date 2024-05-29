import React, { Suspense, useCallback, useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const BookTable = React.lazy(() => import("./components/book/BookTable"));
import { AppDispatch, RootState } from "@/service/store/store";
import { getReservationsAction } from "@/service/store/reservations";

import { Modal } from "@/components/Modal";
import BookForm from "./components/book/BookForm";
import DashboardNavbar from "./components/dashboard/DashboardNavbar";
import styles from "./styles.module.css";
import Alert from "@/components/Alert";
import { TableSkeleton } from "@/components/Skeleton";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// Move fetchMenus outside of the component

const Reservations = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.reservations);
  const toggleAddModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const fetchReservations = async (dispatch: AppDispatch) => {
      try {
        // const page = Math.min(currentPage, reservations.meta?.totalPages ?? 0);
        await dispatch(getReservationsAction(currentPage));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservations(dispatch);
  }, [currentPage, reservations.meta?.totalPages]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <header>
        <DashboardNavbar>
          <h2 className={styles.title}>
            <div className={styles.title_line} />
            Reservations
          </h2>
          <div className="flex justify-around gap-2">
            <Button
              variant="success"
              className={styles.add_button}
              onClick={toggleAddModal}
            >
              <span>Add</span> <RiAddFill />
            </Button>
            <Link to="filter">
              <Button
                variant="dark"
                className="flex-center border border-zinc-200 text-zinc-200 font-bold"
              >
                Filter
                <FaSearch />
              </Button>
            </Link>
          </div>
        </DashboardNavbar>
      </header>
      <main className={styles.main}>
        {reservations.isLoading ? (
          <TableSkeleton />
        ) : reservations.isError ? (
          <Alert
            title="Error fetching reservations"
            description="An error ocurred when the data was being brought in!"
            mode="danger"
          />
        ) : (
          <Suspense fallback={<TableSkeleton />}>
            <BookTable data={reservations.data} />

            <Pagination
              itemsPerPage={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageRange={reservations.meta?.totalPages ?? 1}
            />
          </Suspense>
        )}
      </main>
      <Modal open={isOpen} onClose={toggleAddModal}>
        <BookForm mode="create" handleModal={handleModal} />
      </Modal>
    </>
  );
};

export default Reservations;
