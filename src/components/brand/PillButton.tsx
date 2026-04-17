import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-yellow text-brand-green-deep hover:bg-brand-yellow-deep shadow-[0_8px_24px_-12px_hsl(var(--brand-yellow)/0.7)]",
        white:
          "bg-white text-brand-green-deep hover:bg-white/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]",
        "outline-light":
          "bg-transparent text-white border-2 border-white/70 hover:bg-white/10",
        "ghost-light":
          "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20",
        "ghost-dark":
          "bg-transparent text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-white",
        "solid-green":
          "bg-brand-green text-white hover:bg-brand-green-deep",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillVariants> {
  asChild?: boolean;
}

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(pillVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
PillButton.displayName = "PillButton";
