import * as React from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { LigarCaboLabel } from "./LigarCaboLabel";
import { useTranslation } from "react-i18next";
import { useLeadPanel } from "./LeadPanelContext";
import { LanguageToggle } from "./LanguageToggle";
import logoBranco from "@/assets/logo-branco.webp";
import logoCor from "@/assets/logo-cor.webp";
import navResidencial from "@/assets/nav/hero-residencial.webp";
import navEmpresarial from "@/assets/nav/hero-bg.webp";
import navFatura from "@/assets/nav/impact-fatura.webp";
import navIndependencia from "@/assets/nav/impact-independencia.webp";
import navProtecao from "@/assets/nav/impact-protecao.webp";
import { NavPreviewMenu } from "./NavPreviewMenu";

export function Navbar() {
  const { t } = useTranslation();
  const { openLeadPanel } = useLeadPanel();
  const solutionsItems = [
    { label: t("nav.residencial"), href: "/residencial", description: t("nav.residencialDesc"), image: navResidencial },
    { label: t("nav.empresarial"), href: "/empresarial", description: t("nav.empresarialDesc"), image: navEmpresarial },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const openNow = (id: string) => { window.clearTimeout(closeTimer.current); setOpenMenu(id); };
  const closeSoon = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140); };
  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  // Escape fecha o dropdown mesmo quando foi aberto só com o rato (o foco não está dentro dele).
  React.useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const sectionItems = [
    { label: t("nav.simulador"), href: "/#simulador", description: t("nav.simuladorDesc"), image: navFatura },
    { label: t("nav.pacotes"), href: "/#solucoes", description: t("nav.pacotesDesc"), image: navIndependencia },
    { label: t("nav.processo"), href: "/#como-funciona", description: t("nav.processoDesc"), image: navProtecao },
  ];
  const menus = [
    { id: "solucoes", label: t("nav.solucoes"), href: undefined, items: solutionsItems },
    { id: "como-funciona", label: t("nav.comoFunciona"), href: "/#como-funciona", items: sectionItems },
  ];
  const triggerClass = (open: boolean) => cn(
    "inline-flex items-center gap-1 whitespace-nowrap rounded-pill text-sm font-medium transition-colors",
    scrolled
      ? cn("text-ink hover:bg-white", open && "bg-white")
      : cn("text-white hover:bg-white/15", open && "bg-white/15")
  );
  const chevronClass = (open: boolean) => cn("size-3.5 opacity-70 transition-transform duration-300", open && "rotate-180");

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
          "site-container relative flex items-center justify-between gap-4 transition-all duration-300 lg:grid lg:grid-cols-[auto_1fr_auto] min-[1100px]:grid-cols-[1fr_auto_1fr]",
          scrolled ? "h-16 md:h-20" : "h-20 md:h-24"
        )}
      >
        {/* Left: logo */}
        <Link to="/" aria-label="CABO ENERGIA" className="flex items-center shrink-0 justify-self-start">
          <img
            src={scrolled ? logoCor : logoBranco}
            alt="CABO ENERGIA"
            className={cn(
              "block w-auto max-w-[180px] sm:max-w-none transition-all duration-300",
              scrolled ? "h-6 md:h-7" : "h-[26px] md:h-[31px]"
            )}
          />
        </Link>

        {/* Center: pill nav */}
        <nav
          className={cn(
            "hidden justify-self-center lg:flex items-center gap-1 rounded-pill transition-all duration-300",
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
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="relative"
              onMouseEnter={() => openNow(menu.id)}
              onMouseLeave={closeSoon}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSoon(); }}
            >
              {menu.href ? (
                <a
                  href={menu.href}
                  className={triggerClass(openMenu === menu.id)}
                  style={{ padding: "8px 16px" }}
                  aria-expanded={openMenu === menu.id}
                  aria-haspopup="menu"
                  onFocus={() => openNow(menu.id)}
                >
                  {menu.label}
                  <ChevronDown className={chevronClass(openMenu === menu.id)} />
                </a>
              ) : (
                <button
                  type="button"
                  className={triggerClass(openMenu === menu.id)}
                  style={{ padding: "8px 16px" }}
                  aria-expanded={openMenu === menu.id}
                  aria-haspopup="menu"
                  onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                >
                  {menu.label}
                  <ChevronDown className={chevronClass(openMenu === menu.id)} />
                </button>
              )}
              {openMenu === menu.id && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                  <NavPreviewMenu items={menu.items} onNavigate={() => setOpenMenu(null)} />
                </div>
              )}
            </div>
          ))}

          <a
            href="/#contacto"
            className={cn(
              "inline-flex items-center gap-1 rounded-pill text-sm font-medium transition-colors",
              scrolled ? "text-ink hover:bg-white" : "text-white hover:bg-white/15"
            )}
            style={{ padding: "8px 16px" }}
          >
            {t("nav.contacto")}
          </a>
        </nav>

        {/* Right: idioma (sempre visível) + CTA (aparece com scroll) */}
        <div className="flex shrink-0 items-center justify-self-end gap-3 md:gap-4">
          <button type="button" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={()=>setMobileOpen(!mobileOpen)} className={cn("rounded-lg p-2 lg:hidden",scrolled?"text-brand-green-deep":"text-white")}>{mobileOpen?<X/>:<Menu/>}</button>
          <LanguageToggle tone={scrolled ? "dark" : "light"} />
          <div
            className={cn(
              "hidden lg:block transition-all duration-300",
              scrolled
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1 pointer-events-none"
            )}
            aria-hidden={!scrolled}
          >
            <PillButton
              size="md"
              variant="power"
              onClick={() => openLeadPanel()}
              className="shrink-0"
              tabIndex={scrolled ? 0 : -1}
            >
              <LigarCaboLabel />
            </PillButton>
          </div>
        </div>
      </div>
      {mobileOpen && <nav id="mobile-navigation" className="border-t bg-white p-5 text-brand-green-deep shadow-lg lg:hidden" aria-label="Navegação móvel">
        {[...solutionsItems,...sectionItems,{label:t('nav.contacto'),href:'/#contacto'}].map(item=><a key={item.href} href={item.href} onClick={()=>setMobileOpen(false)} className="block rounded-lg px-4 py-3 font-medium hover:bg-brand-green/10">{item.label}</a>)}
      </nav>}
    </header>
  );
}
