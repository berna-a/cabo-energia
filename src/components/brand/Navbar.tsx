import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { useLeadPanel } from "./LeadPanelContext";
import logoBranco from "@/assets/logo-branco.png";
import logoCor from "@/assets/logo-cor.png";

const links = [
  { label: "Soluções", href: "#solucoes", hasMenu: true },
  { label: "Como funciona", href: "#como-funciona", hasMenu: true },
  { label: "Contacto", href: "#contacto", hasMenu: false },
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
        scrolled ? "bg-white/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between md:h-24">
        {/* Left: logo */}
        <a href="#" aria-label="CABO ENERGIA" className="flex items-center shrink-0">
          <img
            src={scrolled ? logoCor : logoBranco}
            alt="CABO ENERGIA"
            className="h-14 w-auto md:h-16 transition-opacity"
          />
        </a>

        {/* Center: pill nav */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-1 rounded-pill px-2 py-1.5 transition-colors",
            scrolled
              ? "bg-surface-muted border border-border"
              : "bg-white/10 border border-white/20 backdrop-blur-md"
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "inline-flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-ink hover:bg-white"
                  : "text-white hover:bg-white/15"
              )}
            >
              {l.label}
              {l.hasMenu && <ChevronDown className="size-3.5 opacity-70" />}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <PillButton
          size="md"
          variant="white"
          onClick={() => openLeadPanel()}
          className="shrink-0"
        >
          Pedir Estudo
        </PillButton>
      </div>
    </header>
  );
}
