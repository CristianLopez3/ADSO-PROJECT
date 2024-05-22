import {
  getReservationsForCurrentMonth,
  getReservationsForPreviousMonth,
} from "@/service/store/reservations/reservationService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  tension: 0.3,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Reservations Report",
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#d4d4d8",
      },
    },
    y: {
      ticks: {
        color: "#d4d4d8",
      },
    },
  },
};

const labels = ["Last Month", "Current Month"];

type Props = {
  className: string;
};

const ChartTwoMonths: React.FC<Props> = ({ className }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [previousMonth, setPreviousMonth] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const previousResponse = await getReservationsForPreviousMonth();
        const currentResponse = await getReservationsForCurrentMonth();
        setCurrentMonth(currentResponse);
        setPreviousMonth(previousResponse);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      }
    };
    fetch();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Reservations",
        data: [previousMonth, currentMonth],
        backgroundColor: "orange",
      },
    ],
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={className}>
      <div className="w-full h-full">
        <Bar options={options} data={data} />;
      </div>
    </div>
  );
};

export default ChartTwoMonths;
