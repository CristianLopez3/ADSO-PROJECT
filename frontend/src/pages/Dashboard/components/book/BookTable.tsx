import React from "react";

import { Reservation } from "@/utils/types/Reservation";
import Table from "@/components/Table";
import BookRow from "./BookRow";
const BookMobileItem = React.lazy(() => import("./BookMobileItem"));

type BookTableProps = {
  data: Reservation[];
};

const BookTable = ({ data }: BookTableProps) => {
  return (
    <>
      <Table>
        {Array.isArray(data) && data.length > 0 ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            {data.map((item, index) => (
              <BookRow book={item} key={index} />
            ))}
          </React.Suspense>
        ) : (
          <tr>
            <td colSpan={6} className="text-left py-4 pl-4 bg-zinc-200">
              No data available yet!.
            </td>
          </tr>
        )}
      </Table>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {Array.isArray(data) && data.length > 0 ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            {data.map((item, index) => (
              <BookMobileItem book={item} key={index} />
            ))}
          </React.Suspense>
        ) : (
          <p className="text-left p-3 w-full bg-zinc-300 rounded-md">
            No data available
          </p>
        )}
      </div>
    </>
  );
};

export default BookTable;
