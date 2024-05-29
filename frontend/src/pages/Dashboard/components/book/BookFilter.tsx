import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getReservationsByDateAction } from "@/service/store/reservations";
import { AppDispatch, RootState } from "@/service/store/store";

import BookForm from "./BookForm";
import BookTable from "./BookTable";
import { TableSkeleton } from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import Alert from "@/components/Alert";

import styles from "../../styles.module.css";
import { Link } from "react-router-dom";

const BookFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const reservations = useSelector((state: RootState) => state.reservations);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const reservationsState = useSelector(
    (state: RootState) => state.reservations
  );

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const toggleAddModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const fetchReservations = async (dispatch: AppDispatch) => {
      try {
        const formattedDate = date.toISOString().split("T")[0];
        console.log(formattedDate);
        await dispatch(
          getReservationsByDateAction({
            page: currentPage,
            date: formattedDate,
          })
        );
        console.log(reservationsState.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservations(dispatch);
  }, [currentPage, date, reservations.meta?.totalPages]);

  return (
    <>
      <article className="flex-center flex-col px-8 mb-4 ">
        <header className="w-full flex items-center gap-2 justify-between">
          <Link to="/dashboard/reservations">
            <Button
              variant="dark"
              className="flex-center border border-zinc-200 text-zinc-200 font-bold"
            >
              <FaArrowLeft />
              <span className="hidden md:block">All Reservations</span>
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-zinc-300  hidden md:block">
              Filter by Date:
            </span>

            <DatePicker
              selected={date}
              className="py-2 w-[200px] text-center sm:w-fit bg-zinc-200 rounded-md border border-zinc-800"
              onChange={handleDateChange}
            />
          </div>
        </header>
      </article>
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

export default BookFilter;
