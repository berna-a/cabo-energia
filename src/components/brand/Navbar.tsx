import * as React from "react";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { useLeadPanel } from "./LeadPanelContext";

const links = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const { openLeadPanel } = useLeadPanel();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <a
          href="#"
          className={cn(
            "flex items-center gap-2 font-display text-lg font-semibold tracking-tight transition-colors",
            scrolled ? "text-ink" : "text-white"
          )}
        >
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-pill transition-colors",
              scrolled ? "bg-brand-green text-white" : "bg-white/15 text-brand-yellow backdrop-blur"
            )}
          >
            <Sun className="size-4" />
          </span>
          CABO <span className="text-brand-yellow">ENERGIA</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-ink-soft hover:text-ink"
                  : "text-white/80 hover:text-white"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <PillButton
          size="md"
          variant="primary"
          onClick={() => openLeadPanel()}
          className="hidden sm:inline-flex"
        >
          Pedir Estudo
        </PillButton>
        <PillButton
          size="md"
          variant="primary"
          onClick={() => openLeadPanel()}
          className="sm:hidden"
        >
          Pedir
        </PillButton>
      </div>
    </header>
  );
}
