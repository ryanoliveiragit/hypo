import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "red" | "dim" | "amber" | "green" | "blue";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-[rgba(255,255,255,0.04)] text-[#555]   border-[rgba(255,255,255,0.06)]",
    red:     "bg-[rgba(204,17,17,0.08)]  text-[#cc1111]  border-[rgba(204,17,17,0.2)]",
    dim:     "bg-[rgba(255,255,255,0.03)] text-[#444]   border-[rgba(255,255,255,0.04)]",
    amber:   "bg-[rgba(120,80,10,0.12)]  text-[#7a5010] border-[rgba(120,80,10,0.18)]",
    green:   "bg-[rgba(30,70,30,0.12)]   text-[#2a5a2a] border-[rgba(30,70,30,0.18)]",
    blue:    "bg-[rgba(30,50,90,0.12)]   text-[#2a4a8a] border-[rgba(30,50,90,0.18)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-px rounded-[var(--radius-sm)] text-[10px] font-mono font-medium border tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
