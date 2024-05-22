import { getMonthlyReservations } from "@/service/store/reservations/reservationService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  tension: 0.3,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
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

type ReservationsByMonth = {
  [key: string]: number;
};

type ChartProps = {
  className?: string;
};

const Chart: React.FC<ChartProps> = ({ className }) => {
  const [reservations, setReservations] = useState<ReservationsByMonth>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyReservations = async () => {
      try {
        const response = await getMonthlyReservations();
        setReservations(response);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchMonthlyReservations();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  // Transform reservations into the format needed for the chart
  const data = {
    labels: Object.keys(reservations),
    datasets: [
      {
        label: "Reservations",
        data: Object.values(reservations),
        borderColor: "#e4e4e7",
        backgroundColor: "#fff",
      },
    ],
  };

  return (
    <div className={className}>
      <Line className="block w-full h-full" options={options} data={data} />
    </div>
  );
};
export default Chart;
