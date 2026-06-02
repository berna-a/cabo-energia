import { MessageCircle, Sun, Battery, Wrench, Cable, Layers, HardHat, Zap, ShieldCheck, PiggyBank } from "lucide-react";
import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import heroResidencial from "@/assets/hero-residencial.webp";
import { TrustBadge } from "@/components/brand/TrustBadge";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { StatCard } from "@/components/brand/StatCard";
import { KitCard } from "@/components/brand/KitCard";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WHATSAPP_URL } from "@/lib/constants";

const SOURCE = "website_residencial";

const includedItems = [
  {
    icon: <Sun className="size-5" />,
    title: "Painéis solares de alta eficiência",
    description: "Módulos 585Wp por painel, prontos para o clima caboverdiano.",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Inversor híbrido certificado",
    description: "Gere energia da rede, dos painéis e das baterias com inteligência.",
  },
  {
    icon: <Battery className="size-5" />,
    title: "Bateria de lítio com BMS integrado",
    description: "Armazenamento seguro, com gestão de carga e proteção térmica.",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Subestrutura completa",
    description: "Adaptada a qualquer tipo de telhado — laje, chapa ou telha.",
  },
  {
    icon: <Cable className="size-5" />,
    title: "Cabos e materiais de instalação",
    description: "Tudo o que é preciso. Sem peças em falta no dia da obra.",
  },
  {
    icon: <HardHat className="size-5" />,
    title: "Instalação chave-na-mão",
    description: "Equipa técnica própria, do dimensionamento à entrega final.",
  },
];

const Residencial = () => {
  const { openLeadPanel } = useLeadPanel();
  const heroRef = useRevealOnScroll<HTMLDivElement>();
  const whyRef = useRevealOnScroll<HTMLDivElement>();
  const kitsRef = useRevealOnScroll<HTMLDivElement>();
  const includedRef = useRevealOnScroll<HTMLDivElement>();
  const ctaRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden text-white" style={{ height: "70vh", minHeight: 560 }}>
          <img
            src={heroResidencial}
            alt="Casa em Cabo Verde com painéis solares ao pôr do sol"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.0) 50%)",
            }}
          />

          <div ref={heroRef} className="reveal relative h-full px-6 md:px-12">
            <div className="absolute inset-x-6 bottom-12 flex flex-col gap-10 md:inset-x-12 md:flex-row md:items-end md:justify-between md:gap-12">
              <div className="max-w-[85%] lg:max-w-[60%]">
                <TrustBadge tone="light" className="mb-5">
                  Soluções Residenciais
                </TrustBadge>
                <h1
                  className="font-display text-white"
                  style={{
                    fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                    lineHeight: 1.05,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  A sua casa nunca mais fica às escuras.
                </h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row">
                <PillButton
                  size="lg"
                  variant="power"
                  onClick={() =>
                    openLeadPanel({ clientType: "residencial", source: SOURCE })
                  }
                >
                  <LigarCaboLabel />
                </PillButton>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: BENTO GRID — WHY NOW */}
        <section className="bg-white py-20 md:py-28" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <div
            ref={whyRef}
            className="reveal container grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 — Proteção */}
            <article
              className="rounded-2xl bg-slate-50 p-8 md:col-span-1 flex flex-col gap-5"
              style={{ border: "1px solid rgba(0,0,0,0.05)", color: "#0D2B1F" }}
            >
              <div
                className="flex size-12 items-center justify-center rounded-xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <Zap className="size-5" style={{ color: "#0D2B1F" }} />
              </div>
              <h3 className="text-xl font-bold leading-tight" style={{ color: "#0D2B1F" }}>
                A rede falha. A sua rotina não.
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Transição automática para a bateria em milissegundos. Conforto contínuo e zero aparelhos queimados.
              </p>
            </article>

            {/* Card 2 — Financeiro */}
            <article
              className="rounded-2xl bg-slate-50 p-8 md:col-span-1 flex flex-col justify-between gap-6"
              style={{ border: "1px solid rgba(0,0,0,0.05)", color: "#0D2B1F" }}
            >
              <div className="flex flex-col gap-2">
                <span
                  className="font-extrabold leading-[0.95] tracking-tight"
                  style={{ color: "#0D2B1F", fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)" }}
                >
                  6k – 8k CVE
                </span>
                <span className="text-sm font-medium text-slate-600">
                  Poupança média mensal estimada
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Cálculo real e defensável para uma moradia típica cabo-verdiana.
              </p>
            </article>

            {/* Card 3 — Chave na mão */}
            <article
              className="rounded-2xl bg-slate-50 p-8 md:col-span-1 flex flex-col gap-5"
              style={{ border: "1px solid rgba(0,0,0,0.05)", color: "#0D2B1F" }}
            >
              <div
                className="flex size-12 items-center justify-center rounded-xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <ShieldCheck className="size-5" style={{ color: "#0D2B1F" }} />
              </div>
              <h3 className="text-xl font-bold leading-tight" style={{ color: "#0D2B1F" }}>
                Engenharia & Suporte.
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Tratamos de tudo: dimensionamento rigoroso, instalação certificada e garantia de substituição.
              </p>
            </article>
          </div>
        </section>

        {/* SECTION 2: PLANOS RESIDENCIAIS */}
        <section className="bg-white py-20 md:py-28" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <div ref={kitsRef} className="reveal container flex flex-col gap-14">
            <h2
              className="font-bold tracking-tight max-w-3xl"
              style={{ color: "#0D2B1F", fontSize: "clamp(1.875rem, 3vw, 2.75rem)", lineHeight: 1.1 }}
            >
              Escolha o nível de proteção para a sua casa
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Casa Tranquila",
                  badge: "Proteção",
                  badgeGold: false,
                  m1: { value: "3k – 5k CVE", label: "Poupança" },
                  m2: { value: "5.12 kWh", label: "Backup" },
                  price: "240.000 CVE",
                  filled: false,
                },
                {
                  name: "Casa Autonomia",
                  badge: "Popular",
                  badgeGold: true,
                  m1: { value: "6k – 8k CVE", label: "Poupança" },
                  m2: { value: "Até 80%", label: "Redução" },
                  price: "510.000 CVE",
                  filled: true,
                },
                {
                  name: "Casa Plena",
                  badge: "Independência",
                  badgeGold: false,
                  m1: { value: "10k – 15k CVE", label: "Poupança" },
                  m2: { value: "10.24 kWh", label: "Autonomia" },
                  price: "730.000 CVE",
                  filled: false,
                },
              ].map((plan) => (
                <article
                  key={plan.name}
                  className="rounded-2xl bg-slate-50 p-8 flex flex-col gap-6"
                  style={{ border: "1px solid rgba(0,0,0,0.05)", color: "#0D2B1F" }}
                >
                  <div>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={
                        plan.badgeGold
                          ? { background: "#F5C842", color: "#0D2B1F" }
                          : { background: "#fff", color: "#0D2B1F", border: "1px solid rgba(0,0,0,0.06)" }
                      }
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold whitespace-nowrap" style={{ color: "#0D2B1F" }}>
                    {plan.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {[plan.m1, plan.m2].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl bg-white p-4 flex flex-col gap-1"
                        style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                      >
                        <span className="font-bold leading-tight" style={{ color: "#0D2B1F", fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}>
                          {m.value}
                        </span>
                        <span className="text-xs text-slate-500">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="font-extrabold tracking-tight"
                    style={{ color: "#0D2B1F", fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)" }}
                  >
                    {plan.price}
                  </div>

                  <button
                    type="button"
                    onClick={() => openLeadPanel({ clientType: "residencial", source: SOURCE })}
                    className="mt-auto w-full rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors"
                    style={
                      plan.filled
                        ? { background: "#0D2B1F", color: "#fff" }
                        : { background: "transparent", color: "#0D2B1F", border: "1.5px solid #0D2B1F" }
                    }
                  >
                    LIGAR CABO
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT'S INCLUDED */}
        <section className="bg-white py-20 md:py-28">
          <div ref={includedRef} className="reveal container flex flex-col gap-14">
            <SectionHeader
              align="left"
              overline="O que está incluído"
              headline="Uma solução completa. Sem surpresas."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {includedItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex size-10 items-center justify-center rounded-pill bg-brand-green/10 text-brand-green">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="bg-brand-green py-20 md:py-28 text-white">
          <div ref={ctaRef} className="reveal container flex flex-col items-center gap-8 text-center">
            <h2 className="text-headline max-w-2xl text-white">
              Pronto para proteger a sua casa?
            </h2>
            <p className="text-body-lg max-w-xl text-white/85">
              Fale connosco hoje. O estudo de poupança é gratuito e sem
              compromisso.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillButton
                size="lg"
                variant="power"
                onClick={() =>
                  openLeadPanel({ clientType: "residencial", source: SOURCE })
                }
              >
                <LigarCaboLabel />
              </PillButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Residencial;
