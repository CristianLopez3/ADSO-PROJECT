// menuItems.ts
import { ROUTES } from "@/routes/constants";
import { PiBowlFood, PiChartBarDuotone } from "react-icons/pi";
import { LuHome, LuUserCircle, LuBook, LuPenSquare } from "react-icons/lu";

type MenuItem = {
  path: string;
  icon: JSX.Element;
  text: string;
  alert: boolean;
};

/**
 ** getMenuItems it's a function that returns an array of objects with the properties path, icon, text and alert
 ** that will be rendering in the SidebarItem component
 */

export function getMenuItems(reservationAlert: boolean): MenuItem[] {
  return [
    {
      path: ROUTES.DASHBOARD.ROOT,
      icon: <LuHome size={20} />,
      text: "Home",
      alert: true,
    },
    {
      path: ROUTES.DASHBOARD.USERS,
      icon: <LuUserCircle size={20} />,
      text: "User",
      alert: false,
    },
    {
      path: ROUTES.DASHBOARD.MENUS,
      icon: <PiBowlFood size={20} />,
      text: "Menus",
      alert: false,
    },
    {
      path: ROUTES.DASHBOARD.RESERVATIONS.ROOT,
      icon: <LuBook size={20} />,
      text: "Reservations",
      alert: reservationAlert,
    },
    {
      path: ROUTES.DASHBOARD.RESERVATIONS.REPORT,
      icon: <PiChartBarDuotone size={20} />,
      text: "Reports",
      alert: false,
    },
    {
      path: ROUTES.DASHBOARD.EVENTS,
      icon: <LuPenSquare size={20} />,
      text: "Events",
      alert: false,
    }
  ];
}
