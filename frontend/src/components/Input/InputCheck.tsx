import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { FaCheck } from "react-icons/fa";

type InputCheckProps = ComponentPropsWithoutRef<"input"> & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customize?: (classes: string) => string;
  variant?: "default" | "success" | "warning" | "danger";
};

const InputCheck = forwardRef<HTMLInputElement, InputCheckProps>(
  ({ onChange, variant = "success", ...props }, ref) => {
    const baseClasses =
      "appearance-none h-6 w-6 border rounded-md cursor-pointer transition-all duration-200 ease-in-out relative";
    const uncheckedClasses = "bg-gray-200 border-gray-300";
    const variantClasses = {
      default: "bg-blue-300",
      success: "bg-green-300",
      warning: "bg-yellow-300",
      danger: "bg-red-300",
    };
    const checkedClasses = `${variantClasses[variant]} border-transparent`;

    const classes = cn(
      baseClasses,
      props.checked ? variantClasses[variant] : uncheckedClasses,
      props.checked ? checkedClasses : ""
    );

    return (
      <label className={classes}>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          onChange={onChange}
          className="sr-only"
        />
        {props.checked && (
          <FaCheck className="absolute inset-0 m-auto h-4 w-4 text-zinc-800" />
        )}
      </label>
    );
  }
);

export default InputCheck;
