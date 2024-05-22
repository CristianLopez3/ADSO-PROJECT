import Button from "@/components/Button";
import DashboardNavbar from "./components/dashboard/DashboardNavbar";
import styles from "./styles.module.css";
import { RiPencilLine } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import EventCard from "./components/event/EventCard";
import { Modal } from "@/components/Modal";
import EventForm from "./components/event/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/service/store/store";
import { getEventAction } from "@/service/store/event";


const Events: React.FC = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events);
  const event = events.data;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await dispatch(getEventAction());
      } catch (error) {
        throw new Error("Error fetching events");
      }
    };
    fetchEvents();
  }, [dispatch]);

  const toggleAddModal = useCallback(() => {
    setAddModal((prevState) => !prevState);
  }, []);

  return (
    <>
      <header>
        <DashboardNavbar>
          <h2 className={styles.title}>
            <div className={styles.title_line} />
            Event
          </h2>
          <Button
            variant="warning"
            className={styles.add_button}
            onClick={toggleAddModal}
          >
            <span>Update</span> <RiPencilLine />
          </Button>
        </DashboardNavbar>
      </header>

      <main className="px-2 mt-20 md:mt-10 md:px-8 mx-auto flex items-center  h-full max-h-[80%]">
        <section className="flex justify-center items-center">
          <EventCard event={event} />
        </section>
      </main>

      <Modal open={addModal} onClose={toggleAddModal}>
        <EventForm handleModal={toggleAddModal} event={event}  />
      </Modal>
    </>
  );
};

export default Events;
