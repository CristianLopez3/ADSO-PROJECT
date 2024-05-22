import { PiBook, PiUsers } from "react-icons/pi";
import { RiBookOpenLine } from "react-icons/ri";
import { CardProps } from "./Card";

export const cardElements: CardProps[] = [
    {
        title: "Menus",
        count: 32,
        variant: "r-right",
        icon: <PiBook />
    },
    {
        title: "Users",
        count: 57,
        variant: "r-left",
        icon: <PiUsers />
    },
    {
        title: "Bookings",
        count: 12,
        variant: "r-right",
        icon: <RiBookOpenLine />
    }
]