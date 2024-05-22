import { type ReactNode } from "react";
import { Link } from "react-router-dom";

export type CardProps = {
  title: string;
  count: number;
  variant?: "r-right" | "r-left" | "r-top" | "r-bottom";
  icon: ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  count,
  icon,
  variant = "r-right",
}) => {
  return (
    <article
      className={`${variant} flex flex-col justify-between w-full py-2 px-4 rounded-xl shadow-md`}
    >
      <div>
        <article className="flex justify-between items-center mb-8">
          <Link to="/dashboard/menus" className="capitalize">
            {title}
          </Link>
          {icon}
        </article>
      </div>
      <div>
        <article className="flex justify-between items-end  gap-8">
          <h4 className="text-black text-3xl font-bold">{count}</h4>
          <p className="text-zinc-950">active {count}</p>
        </article>
      </div>
    </article>
  );
};

export default Card;
