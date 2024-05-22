import React from "react";

import { User } from "@/utils/types/User";
import Table from "@/components/Table";
import styles from "./styles.module.css";

const UserRow = React.lazy(() => import("./UserRow"));
const UserMobileItem = React.lazy(() => import("./UserMobileItem"));

type UserTableProps = {
  data: User[];
};

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  return (
    <>
      <Table>
        {Array.isArray(data) && data.length > 0 ? (
          <React.Suspense
            fallback={
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            }
          >
            {data.map((item, index) => (
              <UserRow user={item} key={index} />
            ))}
          </React.Suspense>
        ) : (
          <tr>
            <td colSpan={5} className={styles.no_data}>
              No data available yet!.
            </td>
          </tr>
        )}
      </Table>

      <div className={styles.data_table}>
        {Array.isArray(data) && data.length > 0 ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            {data.map((item, index) => (
              <UserMobileItem user={item} key={index} />
            ))}
          </React.Suspense>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default UserTable;
