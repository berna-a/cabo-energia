import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  name: string;
  description: string;
  highlighted?: boolean;
}

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  valueProp: string;
  products: Product[];
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function SolutionCard({
  icon,
  title,
  valueProp,
  products,
  ctaLabel,
  ctaHref = "#",
  onCtaClick,
  className,
}: SolutionCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-7 rounded-3xl border border-border bg-white p-8 md:p-10 transition-all duration-300 hover:border-brand-green/40 hover:shadow-[0_24px_60px_-30px_hsl(var(--brand-green)/0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-green/8 text-brand-green">
          {icon}
        </div>
        <div>
          <div className="text-overline text-ink-muted">Soluções</div>
          <h3 className="text-headline text-ink">{title}</h3>
        </div>
      </div>

      <p className="text-body-lg text-ink-soft">{valueProp}</p>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.name}
            className={cn(
              "flex items-start justify-between gap-4 rounded-2xl border p-4 md:p-5",
              p.highlighted
                ? "border-brand-green/30 bg-brand-green/5"
                : "border-border bg-surface-muted"
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-title text-ink">{p.name}</span>
                {p.highlighted && (
                  <span className="inline-flex items-center rounded-pill bg-brand-yellow px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-green-deep">
                    Mais escolhido
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-soft">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href={ctaHref}
        onClick={onCtaClick}
        className="mt-2 inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-deep"
      >
        {ctaLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
