import { cn } from "@/lib/utils";

type TagProps = { children: React.ReactNode; tone?: "neutral" | "accent"; className?: string };

export default function Tag({ children, tone = "neutral", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-step--1",
        tone === "accent" ? "border-accent/40 bg-accent/10 text-accent" : "border-line bg-surface-2 text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
