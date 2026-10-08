import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-olive)] focus:ring-1 focus:ring-[var(--color-olive)] ${className}`}
      {...props}
    />
  );
}
