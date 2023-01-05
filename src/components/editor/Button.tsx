import { fn } from "@/utils/fn";
import type { HTMLAttributes } from "react";

type ButtonProps = {
  active?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  active,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={fn(
        "rounded border p-2 text-lg transition hover:scale-110 hover:bg-white hover:shadow-md",
        active && "bg-gray-600 text-neutral-50 ",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
