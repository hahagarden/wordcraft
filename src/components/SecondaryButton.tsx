import { HTMLAttributes, ReactNode } from "react";

interface SecondaryButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  customClassName?: string;
}

const classNames = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-10 text-lg",
};

export default function SecondaryButton({ children, size = "md", customClassName, ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-[#1a1a1a] px-4 ${classNames[size]} ${customClassName}`}
      {...props}
    >
      {children}
    </button>
  );
}
