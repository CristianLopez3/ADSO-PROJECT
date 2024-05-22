import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ChartTwoMonths from "./ChartTwoMonths";
import Chart from "../../dashboard/Chart";

import CardBetweenDates from "./CardBetweenDates";
import Message from "@/components/Messages/Message";
import { LuBadgeCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import {
  getReservationsForCurrentMonth,
  getUncheckedInReserations,
} from "@/service/store/reservations/reservationService";

const Report = () => {
  const [uncheckedIn, setUncheckedIn] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUncheckedInReserations();
        const currentResponse = await getReservationsForCurrentMonth();
        setCurrentMonth(currentResponse);
        setUncheckedIn(data);
      } catch (error) {
        throw new Error("Can't find unchecked reservations");
      }
    };

    fetch();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className="flex justify-center items-center h-full max-h-[80%]">
          <section className={styles.section}>
            <ChartTwoMonths className="max-w-[600px] flex justify-center items-center  lg:ml-12" />
            <CardBetweenDates />
            <Chart className="w-full h-[300px] xl:max-h-[800px]" />
            <article className="space-y-3 lg:mt-3 order-first lg:-order-none">
              <Message
                icon={<LuBadgeCheck color="#e4e4e7" />}
                title="Unchecked Reservations"
                description="You have unchecked reservations"
                data={
                  <div className="text-zinc-50 text-2xl">{uncheckedIn}</div>
                }
              />
              <Message
                icon={<LuBadgeCheck color="#e4e4e7" />}
                title="Month Reservations"
                description={`This month has had ${currentMonth} reservations`}
                data={
                  <div className="text-zinc-50 text-2xl">{currentMonth}</div>
                }
              />
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

export default Report;
