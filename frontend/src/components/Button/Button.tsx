import { cn } from "@/utils/cn";
import { type ReactNode, type ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  variant: "light" | "danger" | "warning" | "success" | "dark";
  content?: string | number;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"button">;


const Button = ({
  variant = "light",
  content,
  children,
  className,
  ...props
}: ButtonProps) => {
  const variantClass = variant ? `btn-${variant}` : '';
  const classes = `btn ${variantClass}`;
  const styles = cn(classes, className);

  return (
    <button className={styles} id={content} {...props}>
      {content}
      {children}
    </button>
  );
}
export default Button;