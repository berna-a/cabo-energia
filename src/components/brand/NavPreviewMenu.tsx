import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type NavPreviewItem = {
  label: string;
  description: string;
  href: string;
  image: string;
};

/**
 * Painel do dropdown da navbar: lista à esquerda, pré-visualização à direita.
 * Passar o rato (ou o foco) num item troca a imagem com fade e um zoom lento.
 */
export function NavPreviewMenu({
  items,
  cta,
  onNavigate,
}: {
  items: NavPreviewItem[];
  cta: string;
  onNavigate: () => void;
}) {
  const [active, setActive] = React.useState(0);
  const current = items[active] ?? items[0];

  return (
    <div
      role="menu"
      className="nav-preview-panel grid w-[600px] grid-cols-[1fr_300px] gap-2 overflow-hidden rounded-[28px] border border-border bg-white p-2 shadow-[0_30px_80px_-24px_rgba(13,43,31,0.35)]"
    >
      <ul className="flex flex-col gap-1 p-1">
        {items.map((item, i) => {
          const isActive = i === active;
          const className = cn(
            "group relative flex flex-1 items-center justify-between gap-3 rounded-2xl px-4 py-3.5 outline-none transition-colors duration-200",
            isActive ? "bg-surface-muted" : "hover:bg-surface-muted/60",
            "focus-visible:ring-2 focus-visible:ring-brand-yellow"
          );
          const inner = (
            <>
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-ink">{item.label}</span>
                <span className="text-xs text-ink-soft">{item.description}</span>
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-pill transition-all duration-300",
                  isActive
                    ? "bg-brand-yellow text-brand-green-deep opacity-100 translate-x-0"
                    : "bg-transparent text-ink-soft opacity-0 -translate-x-2"
                )}
                aria-hidden
              >
                <ArrowRight className="size-4" />
              </span>
            </>
          );
          const handlers = {
            onMouseEnter: () => setActive(i),
            onFocus: () => setActive(i),
            onClick: onNavigate,
          };
          return (
            <li key={item.href} className="flex flex-1 flex-col">
              {item.href.startsWith("/#") ? (
                <a href={item.href} role="menuitem" className={className} {...handlers}>
                  {inner}
                </a>
              ) : (
                <Link to={item.href} role="menuitem" className={className} {...handlers}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-brand-green-deep" aria-hidden>
        {items.map((item, i) => (
          <img
            key={item.href}
            src={item.image}
            alt=""
            loading="eager"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out",
              i === active ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/80 via-brand-green-deep/10 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span key={current.href} className="nav-preview-caption text-base font-semibold text-white drop-shadow">
            {current.label}
          </span>
          <span className="shrink-0 rounded-pill border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
            {cta}
          </span>
        </div>
      </div>
    </div>
  );
}
