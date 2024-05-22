import { type ReactNode } from "react";
import styles from "./styles.module.css";
import { cn } from "@/utils/cn";

type ReportCardProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

const ReportCard: React.FC<ReportCardProps> = ({ title, className, children }) => {
  const customStyles = cn(styles.card_container, className);
  return (
    <article className={customStyles}>
      <h5>{title}</h5>
      <div>{children}</div>
    </article>
  );
};

export default ReportCard;
