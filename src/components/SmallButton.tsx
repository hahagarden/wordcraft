import { HTMLAttributes, ReactNode } from "react";

interface SmallButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customClassName?: string;
}

export default function SmallButton({ children, customClassName, ...props }: SmallButtonProps) {
  return (
    <button
      className={`rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-background hover:bg-gray-100 dark:hover:bg-[#1a1a1a] h-7 text-sm text-foreground px-4 ${customClassName}`}
      {...props}
    >
      {children}
    </button>
  );
}
