import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { useLeadPanel } from "./LeadPanelContext";
import logoBranco from "@/assets/logo-branco.png";
import logoCor from "@/assets/logo-cor.png";

const solutionsItems = [
  { label: "Residencial", href: "/residencial", description: "Para a sua casa." },
  { label: "Empresarial", href: "/empresarial", description: "Para o seu negócio." },
];

export function Navbar() {
  const { openLeadPanel } = useLeadPanel();
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

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
      <div
        className={cn(
          "container relative flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16 md:h-20" : "h-20 md:h-24"
        )}
      >
        {/* Left: logo */}
        <Link to="/" aria-label="CABO ENERGIA" className="flex items-center shrink-0">
          <img
            src={scrolled ? logoCor : logoBranco}
            alt="CABO ENERGIA"
            className={cn(
              "block w-auto transition-all duration-300",
              scrolled ? "h-6 md:h-7" : "h-[26px] md:h-[31px]"
            )}
          />
        </Link>

        {/* Center: pill nav */}
        <nav
          className={cn(
            "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-1 rounded-pill transition-all duration-300",
            scrolled
              ? "bg-surface-muted border border-border"
              : "border border-white/25 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]"
          )}
          style={
            scrolled
              ? { padding: "6px 8px" }
              : { padding: "6px 8px", background: "rgba(255,255,255,0.15)" }
          }
        >
          {/* Soluções dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("solucoes")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-pill text-sm font-medium transition-colors",
                scrolled
                  ? "text-ink hover:bg-white"
                  : "text-white hover:bg-white/15"
              )}
              style={{ padding: "8px 16px" }}
              aria-expanded={openMenu === "solucoes"}
              aria-haspopup="menu"
            >
              Soluções
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
            {openMenu === "solucoes" && (
              <div
                role="menu"
                className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)]"
              >
                {solutionsItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-surface-muted"
                  >
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                    <span className="text-xs text-ink-soft">{item.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="/#como-funciona"
            className={cn(
              "inline-flex items-center gap-1 rounded-pill text-sm font-medium transition-colors",
              scrolled ? "text-ink hover:bg-white" : "text-white hover:bg-white/15"
            )}
            style={{ padding: "8px 16px" }}
          >
            Como funciona
            <ChevronDown className="size-3.5 opacity-70" />
          </a>

          <a
            href="/#contacto"
            className={cn(
              "inline-flex items-center gap-1 rounded-pill text-sm font-medium transition-colors",
              scrolled ? "text-ink hover:bg-white" : "text-white hover:bg-white/15"
            )}
            style={{ padding: "8px 16px" }}
          >
            Contacto
          </a>
        </nav>

        {/* Right: CTA — only visible when scrolled (white navbar) */}
        <div
          className={cn(
            "transition-all duration-300",
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          )}
          aria-hidden={!scrolled}
        >
          <PillButton
            size="md"
            variant="primary"
            onClick={() => openLeadPanel()}
            className="shrink-0"
            tabIndex={scrolled ? 0 : -1}
          >
            Ligar Cabo
          </PillButton>
        </div>
      </div>
    </header>
  );
}
