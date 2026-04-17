import * as React from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { useLeadPanel } from "./LeadPanelContext";
import logoBranco from "@/assets/logo-branco.png";
import logoCor from "@/assets/logo-cor.png";

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
        <a href="#" aria-label="CABO ENERGIA" className="flex items-center">
          <img
            src={scrolled ? logoCor : logoBranco}
            alt="CABO ENERGIA"
            className="h-9 w-auto md:h-10 transition-opacity"
          />
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
