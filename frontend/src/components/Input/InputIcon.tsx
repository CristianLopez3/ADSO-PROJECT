import { ComponentPropsWithoutRef, InputHTMLAttributes, ReactNode, forwardRef } from "react";
import InputField from './InputField';
import { generateUniqueId } from "@/utils/uniqueId";

type InputIconProps = {
  type?: "text" | "email" | "password";
  icon: ReactNode;
  styles?: string;
} & ComponentPropsWithoutRef<"input"> &
InputHTMLAttributes<HTMLInputElement>;

const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
  function({  name, type = "text", icon, styles, ...props }, ref){
    return (
      <div className={`${styles} flex items-center border-b bg-transparent`}>
        <span className="p-2  border-grayLight flex items-center">{icon}</span>
        <InputField
          className="w-full bg-transparent  pl-3 text-left outline-none"
          ref={ref}
          type={type}
          name={name}
          id={generateUniqueId(name!)}
          placeholder={name!}
          {...props}
        />
      </div>
    );
  }
);

export default InputIcon;