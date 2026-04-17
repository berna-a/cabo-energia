import { Home, Building2 } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { SolutionCard } from "@/components/brand/SolutionCard";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const stats = [
  { value: "14.9 kWh/dia", label: "Casa Basic" },
  { value: "29.8 kWh/dia", label: "Casa Plus" },
  { value: "59.6 kWh/dia", label: "Business Basic" },
  { value: "119.3 kWh/dia", label: "Business Plus" },
];

export function SolutionsSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="solucoes" className="bg-surface-muted py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="center"
          overline="As nossas soluções"
          headline="Proteção para a sua casa. Continuidade para o seu negócio."
          className="mx-auto"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <SolutionCard
            icon={<Home className="size-7" />}
            title="Residencial"
            valueProp="Energia constante para a sua família — sem apagões, sem faturas surpresa."
            products={[
              {
                name: "Casa Basic",
                description: "Para habitações de consumo médio. Cobertura essencial, instalação rápida.",
              },
              {
                name: "Casa Plus",
                description: "Para casas maiores ou com climatização. Autonomia alargada e backup completo.",
                highlighted: true,
              },
            ]}
            ctaLabel="Ver soluções residenciais"
            onCtaClick={(e) => {
              e?.preventDefault?.();
              openLeadPanel({ clientType: "residencial" });
            }}
          />
          <SolutionCard
            icon={<Building2 className="size-7" />}
            title="Empresarial"
            valueProp="Continuidade operacional para o seu negócio — equipamentos protegidos, custos previsíveis."
            products={[
              {
                name: "Business Basic",
                description: "Pequenos comércios e escritórios. Reduz consumo da rede e protege equipamento.",
              },
              {
                name: "Business Plus",
                description: "Operações maiores. Alta autonomia, escalável, com monitorização incluída.",
                highlighted: true,
              },
            ]}
            ctaLabel="Ver soluções empresariais"
            onCtaClick={(e) => {
              e?.preventDefault?.();
              openLeadPanel({ clientType: "empresarial" });
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-white p-5 md:p-6"
            >
              <div className="font-display text-xl md:text-2xl font-semibold text-ink">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
