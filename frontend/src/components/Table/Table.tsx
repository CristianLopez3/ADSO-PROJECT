import { type ReactNode } from "react";
import styles from "./styles.module.css";

type TableProps = {
  children: ReactNode;
};

const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className={styles.table_container}>
      <table className="w-full">
        <tbody className="py-4">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
