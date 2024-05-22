import { Switch } from "@headlessui/react";

type ToggleProps = {
  variant?: "success" | "warning" | "dark" | "danger" | "default";
  enabled: boolean;
  setEnabled: () => void;
};

const Toggle: React.FC<ToggleProps> = ({
  variant = "default",
  enabled = false,
  setEnabled,
}) => {
  const color = (() => {
    switch (variant) {
      case "success":
        return "bg-green-400";
      case "warning":
        return "bg-yellow-400";
      case "dark":
        return "bg-gray-500";
      case "danger":
        return "bg-red-400";
      default:
        return "bg-blue-400";
    }
  })();

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? color : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default Toggle;
