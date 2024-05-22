import { cn } from "@/utils/cn";
import { generateUniqueId } from "@/utils/uniqueId";
import {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  forwardRef,
} from "react";

type InputFieldProps = {
  type?: string;
  styles?: string;
  colorText?: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<"input"> &
  InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ name, type = "text", styles,  ...props }, ref) {

    const defaultStyle =  
      "block w-full py-3 pl-1 pr-4  outline-none text-sm text-black border-b border-zinc-400";
    const combinedStyles = cn(defaultStyle, styles);
    
    return (
      <div className="py-2">
        <input
          className={combinedStyles}
          ref={ref}
          id={generateUniqueId(name!)}
          name={name}
          placeholder={`${name}`}
          color="gray"
          type={type}
          {...props}
        />
      </div>
    );
  }
);

export default InputField;