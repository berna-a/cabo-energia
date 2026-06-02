import { Snowflake, ShoppingCart, Fuel, Zap } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const custos = [
  {
    icon: Snowflake,
    title: "Stock estragado",
    desc: "Frigoríficos e arcas param. Produto fresco perdido em poucas horas.",
  },
  {
    icon: ShoppingCart,
    title: "Vendas paradas",
    desc: "Sem caixa, sem TPA, sem luz. Cada hora fechado é faturação que não volta.",
  },
  {
    icon: Fuel,
    title: "Gasóleo do gerador",
    desc: "Milhares de CVE por mês em combustível — e o preço só sobe.",
  },
  {
    icon: Zap,
    title: "Equipamentos danificados",
    desc: "Picos e quebras de energia queimam máquinas caras.",
  },
];

export function NegocioCustoSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();
  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="left"
          overline="O custo de não fazer nada"
          headline="Quanto custa, afinal, um apagão ao seu negócio?"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {custos.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex size-10 items-center justify-center rounded-pill bg-brand-green/10 text-brand-green">
                <c.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-ink">{c.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NegocioCustoSection;
