"use client";

import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, cloneElement, isValidElement } from "react";

type ButtonBaseProps = {
  variant?: "solid" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { asChild?: false };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { asChild: true };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center gap-1.5 font-mono font-medium rounded-[var(--radius)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cc1111] focus-visible:ring-offset-1 focus-visible:ring-offset-black disabled:opacity-30 disabled:pointer-events-none select-none cursor-pointer tracking-widest uppercase";

const variants = {
  solid:
    "bg-[#cc1111] text-white hover:bg-[#e51111] active:bg-[#aa0000]",
  outline:
    "bg-transparent border border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,255,255,0.2)] hover:text-[#c0c0c0]",
  ghost:
    "bg-transparent text-[#555] hover:text-[#c0c0c0] hover:bg-[rgba(255,255,255,0.04)]",
  danger:
    "bg-transparent border border-[rgba(204,17,17,0.3)] text-[#cc1111] hover:bg-[rgba(204,17,17,0.06)] hover:border-[rgba(204,17,17,0.5)]",
};

const sizes = {
  sm: "h-7  px-3  text-[10px]",
  md: "h-8  px-4  text-[10px]",
  lg: "h-9  px-5  text-xs",
};

function Spinner() {
  return (
    <svg className="animate-spin h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "outline", size = "md", loading, asChild, children, className, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...child.props,
      className: cn(cls, child.props.className),
    });
  }

  const btnProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} disabled={btnProps.disabled || loading} {...btnProps}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
