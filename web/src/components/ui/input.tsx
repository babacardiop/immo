import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-2xl border border-[var(--color-steel)]/55 bg-[var(--color-surface)] px-3 py-3 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-olive)] focus:ring-2 focus:ring-[var(--color-olive)]/25 ${className}`}
      {...props}
    />
  );
}
