import { Package, Clock, MapPin, ListChecks, ShieldCheck, Ship } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { StatCard } from "@/components/brand/StatCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const rtbs = [
  {
    icon: <Package className="size-5" />,
    title: "Stock nacional",
    body: "Materiais disponíveis em Cabo Verde para resposta imediata.",
  },
  {
    icon: <Clock className="size-5" />,
    title: "Contacto em 24h",
    body: "Toda lead recebe primeiro contacto em até 24 horas.",
  },
  {
    icon: <MapPin className="size-5" />,
    title: "Levantamento técnico",
    body: "Visita ao local antes de qualquer orçamento.",
  },
  {
    icon: <ListChecks className="size-5" />,
    title: "Processo fechado",
    body: "7 etapas claras, sem improvisação.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "Garantia e suporte",
    body: "Acompanhamento pós-instalação incluído.",
  },
  {
    icon: <Ship className="size-5" />,
    title: "Logística inter-ilhas",
    body: "Capacidade de servir qualquer ilha do arquipélago.",
  },
];

export function TrustSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-brand-green-deep py-20 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_85%_15%,hsl(var(--brand-yellow)/0.15),transparent_55%)]"
      />
      <div ref={ref} className="reveal container relative flex flex-col gap-14">
        <SectionHeader
          tone="light"
          badgeTone="yellow"
          overline="Os nossos compromissos"
          headline="Não vendemos equipamentos. Vendemos continuidade energética."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rtbs.map((r) => (
            <StatCard
              key={r.title}
              variant="dark"
              icon={r.icon}
              title={r.title}
            >
              {r.body}
            </StatCard>
          ))}
        </div>
      </div>
    </section>
  );
}
