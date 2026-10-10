import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)] outline-none ring-0 transition focus:ring-2 focus:ring-[var(--color-olive)] ${className}`}
      {...props}
    />
  );
}
