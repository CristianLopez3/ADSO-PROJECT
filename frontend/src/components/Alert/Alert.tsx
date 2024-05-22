import PropTypes from 'prop-types';
import { LuBadgeX, LuBadgeAlert, LuBadgeCheck  } from "react-icons/lu";

type AlertProps = {
  title: string;
  description: string;
  mode: "danger" | "warning" | "success";
};

const styles = {
  success: {
    class: "bg-zinc-100 rounded-md text-teal-900 px-4 py-3 shadow-md",
    icon: <LuBadgeCheck className=" h-6 w-6 text-teal-500 mr-4" />,
  },
  danger: {
    class: "bg-zinc-50 rounded-md text-red-900 px-4 py-3 shadow-2xl",
    icon: <LuBadgeX  className="h-6 w-6 text-red-500 mr-4" />,
  },
  warning: {
    class: "bg-yellow-100 rounded-md text-yellow-900 px-4 py-3 shadow-md",
    icon: <LuBadgeAlert className="h-6 w-6 text-yellow-500 mr-4" />,
  },
};

const Alert: React.FC<AlertProps> = ({ title, description, mode }) => {
  return (
    <div className={styles[mode].class} role="alert">
      <div className="flex">
        <div className="py-1">
          <span>{styles[mode].icon}</span>
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["danger", "warning", "success"] as const).isRequired,
};

export default Alert;