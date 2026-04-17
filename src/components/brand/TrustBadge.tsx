import * as React from "react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "light" | "dark" | "yellow";
}

export const TrustBadge = React.forwardRef<HTMLSpanElement, TrustBadgeProps>(
  ({ className, tone = "light", ...props }, ref) => {
    const toneClass =
      tone === "light"
        ? "bg-white/10 text-white border-white/25 backdrop-blur-sm"
        : tone === "yellow"
        ? "bg-brand-yellow/15 text-brand-yellow border-brand-yellow/40"
        : "bg-brand-green/8 text-brand-green border-brand-green/20";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-overline",
          toneClass,
          className
        )}
        {...props}
      />
    );
  }
);
TrustBadge.displayName = "TrustBadge";
