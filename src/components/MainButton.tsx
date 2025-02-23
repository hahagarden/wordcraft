import { HTMLAttributes, ReactNode } from "react";

interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  customClassName?: string;
}

const classNames = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-10 text-lg",
};

export default function MainButton({ children, size = "md", customClassName, ...props }: MainButtonProps) {
  return (
    <button
      className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] ${classNames[size]} px-4 ${customClassName}`}
      {...props}
    >
      {children}
    </button>
  );
}
