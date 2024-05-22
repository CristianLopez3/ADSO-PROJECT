import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./styles.module.css";
import { getReservationsBetweenDates } from "@/service/store/reservations/reservationService";

const getReservations = async (start: Date, end: Date) => {
  const data = await getReservationsBetweenDates(start, end);
  return data.data;
};

const CardBetweenDates = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );

  const [reservations, setReservations] = useState(0);
  useEffect(() => {
    if (startDate && endDate) {
      getReservations(startDate, endDate).then((data) => {
        setReservations(data);
      });
    }
  }, [startDate, endDate]);

  return (
    <ReportCard
      title="Report the quantity of bookings between two dates"
      className="cols-span-2"
    >
      <p className={styles.description}>
        Choose the date you need know the reservations
      </p>

      <article className={styles.body_card}>
        <section>
          <div className="flex gap-2 flex-col my-4 items-center md:items-center lg:items-start">
            <div className={styles.datepicker_container}>
              <span className={styles.datapicker_label}>From</span>
              <DatePicker
                selected={startDate}
                className={styles.data_picker}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
            <div className={styles.datepicker_container}>
              <span className={styles.datapicker_label}>To</span>
              <DatePicker
                selected={endDate}
                className={styles.data_picker}
                onChange={(date: Date) => setEndDate(date)}
              />
            </div>
          </div>
        </section>
        <section className={styles.section_center}>
          <p className={styles.reservations_number}>
            <span>Quantiti of Reservations: </span> {reservations}
          </p>
        </section>
      </article>
    </ReportCard>
  );
};

export default CardBetweenDates;
