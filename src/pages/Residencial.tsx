import { MessageCircle, Sun, Battery, Wrench, Cable, Layers, HardHat, Zap, ShieldCheck, PiggyBank } from "lucide-react";
import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";
import { PillButton } from "@/components/brand/PillButton";
import heroResidencial from "@/assets/hero-residencial.png";
import { TrustBadge } from "@/components/brand/TrustBadge";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { StatCard } from "@/components/brand/StatCard";
import { ProcessStep } from "@/components/brand/ProcessStep";
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

const steps = [
  { title: "Lead", description: "Entra em contacto connosco." },
  { title: "Contacto", description: "Falamos consigo em até 24 horas." },
  { title: "Levantamento", description: "Visita técnica ao local (5.000 CVE, dedutível)." },
  { title: "Orçamento", description: "Proposta clara com produção, poupança e custo." },
  { title: "50% Upfront", description: "Confirmação e pagamento inicial." },
  { title: "Instalação", description: "Equipa técnica, materiais em stock." },
  { title: "Follow-up", description: "Acompanhamento pós-instalação incluído." },
];

const Residencial = () => {
  const { openLeadPanel } = useLeadPanel();
  const heroRef = useRevealOnScroll<HTMLDivElement>();
  const whyRef = useRevealOnScroll<HTMLDivElement>();
  const kitsRef = useRevealOnScroll<HTMLDivElement>();
  const includedRef = useRevealOnScroll<HTMLDivElement>();
  const processRef = useRevealOnScroll<HTMLDivElement>();
  const ctaRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden text-white" style={{ height: "70vh", minHeight: 560 }}>
          <ImagePlaceholder className="absolute inset-0 -z-20 h-full w-full" />
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
                  className="font-extrabold text-white"
                  style={{
                    fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                    lineHeight: 0.95,
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                  }}
                >
                  A sua casa nunca mais fica às escuras.
                </h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row">
                <PillButton
                  size="lg"
                  variant="white"
                  onClick={() =>
                    openLeadPanel({ clientType: "residencial", source: SOURCE })
                  }
                >
                  Pedir Estudo de Poupança
                </PillButton>
                <PillButton size="lg" variant="outline-light" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    Falar no WhatsApp
                  </a>
                </PillButton>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: WHY SOLAR NOW */}
        <section className="bg-white py-20 md:py-28">
          <div ref={whyRef} className="reveal container grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <TrustBadge tone="dark">Porquê agora</TrustBadge>
              <h2 className="text-headline text-ink">
                A rede falha. A sua fatura sobe. A solução existe.
              </h2>
              <p className="text-body-lg text-ink-soft">
                Em Cabo Verde, os cortes de energia afetam a qualidade de vida de
                milhares de famílias todos os meses. Um sistema solar residencial
                protege a sua casa, reduz a fatura e dá-lhe controlo sobre a sua
                energia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                icon={<PiggyBank className="size-5" />}
                title="Até 20.000 CVE/mês"
              >
                Poupança média estimada na fatura de eletricidade.
              </StatCard>
              <StatCard
                icon={<Battery className="size-5" />}
                title="Energia durante apagões"
              >
                A bateria mantém a sua casa a funcionar quando a rede falha.
              </StatCard>
              <StatCard
                icon={<Wrench className="size-5" />}
                title="Instalação chave-na-mão"
              >
                Tratamos de tudo: dimensionamento, materiais e montagem.
              </StatCard>
              <StatCard
                variant="dark"
                icon={<ShieldCheck className="size-5" />}
                title="Garantia ativa"
              >
                Equipamentos com garantia de substituição imediata.
              </StatCard>
            </div>
          </div>
        </section>

        {/* SECTION 2: TWO KITS */}
        <section className="bg-surface-muted py-20 md:py-28">
          <div ref={kitsRef} className="reveal container flex flex-col gap-14">
            <SectionHeader
              align="center"
              overline="As nossas soluções"
              headline="Escolha o nível de proteção certo para a sua casa."
              className="mx-auto"
            />

            <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
              <KitCard
                name="Casa Basic"
                tagline="O essencial para reduzir a fatura e garantir energia básica."
                specs={[
                  "6 painéis 585Wp",
                  "Inversor híbrido 5kW",
                  "Bateria lítio 5,12 kWh",
                  "Produção: 14,9 kWh/dia",
                ]}
                monthlySavings="Poupança: ~10.000 CVE/mês"
                promoPrice="469.926 CVE"
                originalPrice="503.736 CVE"
                source={SOURCE}
              />
              <KitCard
                name="Casa Plus"
                tagline="Proteção total para uma casa com mais consumo e mais autonomia."
                specs={[
                  "12 painéis 585Wp",
                  "2 inversores 5kW",
                  "2 baterias 5,12 kWh",
                  "Produção: 29,8 kWh/dia",
                ]}
                monthlySavings="Poupança: ~20.000 CVE/mês"
                promoPrice="772.028 CVE"
                originalPrice="931.471 CVE"
                badge="Mais escolhido"
                highlighted
                source={SOURCE}
              />
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

        {/* SECTION 4: PROCESS */}
        <section className="bg-surface-muted py-20 md:py-28">
          <div ref={processRef} className="reveal container flex flex-col gap-14">
            <SectionHeader
              align="center"
              overline="Como funciona"
              headline="Do primeiro contacto à instalação — sem complicações."
              className="mx-auto"
            />

            <div className="-mx-6 overflow-x-auto pb-2 lg:mx-0 lg:overflow-visible">
              <div className="flex snap-x snap-mandatory gap-4 px-6 lg:grid lg:grid-cols-7 lg:gap-6 lg:px-0">
                {steps.map((s, i) => (
                  <ProcessStep
                    key={s.title}
                    index={i}
                    total={steps.length}
                    title={s.title}
                    description={s.description}
                  />
                ))}
              </div>
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
                variant="primary"
                onClick={() =>
                  openLeadPanel({ clientType: "residencial", source: SOURCE })
                }
              >
                Pedir Estudo de Poupança
              </PillButton>
              <PillButton size="lg" variant="outline-light" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  Falar no WhatsApp
                </a>
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
