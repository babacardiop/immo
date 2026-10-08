import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90",
    secondary:
      "bg-[var(--color-sage)] text-[var(--color-ink)] hover:opacity-90",
    ghost:
      "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-sage)]/40",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
