"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  mono?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, suffix, mono, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="label-mono block">{label}</label>}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 flex items-center text-[#555] text-xs select-none pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-8 bg-black border border-[rgba(255,255,255,0.08)] rounded-[var(--radius)] px-3 text-[#c0c0c0] placeholder:text-[#333] text-xs font-mono",
              "transition-all duration-150",
              "focus:outline-none focus:ring-1 focus:ring-[#cc1111] focus:ring-offset-1 focus:ring-offset-black focus:border-transparent",
              mono && "tracking-widest",
              prefix && "pl-9",
              suffix && "pr-9",
              error && "border-[rgba(204,17,17,0.4)] focus:ring-[#cc1111]",
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 flex items-center text-[#555]">{suffix}</span>
          )}
        </div>
        {error && <p className="text-[10px] text-[#cc1111] font-mono">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
