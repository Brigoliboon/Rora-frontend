import React from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "glow";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#1FBFA8] via-[#3FFFB2] to-[#5DE6C1] text-[#05070D] hover:brightness-110 shadow-lg shadow-[#3FFFB2]/30",

  secondary:
    "bg-[#0F2A2E] text-[#EAFBF7] hover:bg-[#12363C] border border-[#1FBFA8]/30",

  outline:
    "border border-[#3FFFB2]/50 text-[#3FFFB2] hover:bg-[#3FFFB2]/10",

  ghost:
    "text-[#B6EDE3] hover:bg-white/5",

  danger:
    "bg-gradient-to-r from-[#7A5CFF] to-[#C77DFF] text-white shadow-lg shadow-[#7A5CFF]/30",

  glow:
    "relative bg-[#05070D] text-[#3FFFB2] border border-[#3FFFB2]/40 shadow-[0_0_30px_rgba(63,255,178,0.45)] hover:shadow-[0_0_45px_rgba(63,255,178,0.65)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});
