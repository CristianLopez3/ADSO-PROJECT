import { type ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active: boolean;
  alert: boolean;
  path: string;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  alert,
  path,
}: SidebarItemProps) => {
  const expanded = useContext(SidebarContext);

  return (
    <Link to={path}>
      <li
        className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-600"
          : "hover:bg-gray-200 text-gray-600"
      }

  `}
      >
        {icon}

        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-green-500 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className="
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-gray-300 text-gray-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};

export default SidebarItem;
