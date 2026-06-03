import { Snowflake, Moon, Droplets, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const preocupacoes = [
  {
    icon: Snowflake,
    title: "Comida a estragar",
    desc: "Quando a luz vai, o frigorífico pára — e a comida da semana com ele.",
  },
  {
    icon: Moon,
    title: "Noites sem descanso",
    desc: "Sem ar condicionado nem ventoinha, o calor não deixa ninguém dormir.",
  },
  {
    icon: Droplets,
    title: "Sem água em casa",
    desc: "A bomba pára e fica sem água logo quando mais precisa dela.",
  },
  {
    icon: ShieldCheck,
    title: "Casa vulnerável",
    desc: "Alarmes, câmaras e luzes apagam-se. E os filhos sem luz para estudar.",
  },
];

export function CasaPreocupacoesSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();
  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="left"
          overline="O fim dos apagões em casa"
          headline="Deixe de viver ao ritmo da ELECTRA."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preocupacoes.map((c) => (
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

export default CasaPreocupacoesSection;
