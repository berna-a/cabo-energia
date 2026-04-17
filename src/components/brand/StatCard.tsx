import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}

export function StatCard({
  children,
  variant = "default",
  className,
  icon,
  title,
}: StatCardProps) {
  const variantClass =
    variant === "accent"
      ? "bg-brand-green text-white border-transparent"
      : variant === "dark"
      ? "bg-brand-green-deep/60 text-white border-white/10 backdrop-blur"
      : "bg-white text-ink border-border";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 md:p-7 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-0.5",
        variantClass,
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-pill",
            variant === "dark"
              ? "bg-brand-yellow/15 text-brand-yellow"
              : variant === "accent"
              ? "bg-brand-yellow text-brand-green-deep"
              : "bg-brand-green/8 text-brand-green"
          )}
        >
          {icon}
        </div>
      )}
      {title && (
        <h3
          className={cn(
            "text-title",
            variant === "default" ? "text-ink" : "text-white"
          )}
        >
          {title}
        </h3>
      )}
      <div
        className={cn(
          "text-base leading-relaxed",
          variant === "default" ? "text-ink-soft" : "text-white/85"
        )}
      >
        {children}
      </div>
    </div>
  );
}
