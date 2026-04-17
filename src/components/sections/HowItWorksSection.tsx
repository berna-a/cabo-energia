import { SectionHeader } from "@/components/brand/SectionHeader";
import { ProcessStep } from "@/components/brand/ProcessStep";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const steps = [
  { title: "Lead", description: "Entra em contacto connosco." },
  { title: "Contacto", description: "Falamos consigo em até 24 horas." },
  { title: "Levantamento", description: "Visita técnica ao local (5.000 CVE, dedutível)." },
  { title: "Orçamento", description: "Proposta clara com produção, poupança e custo." },
  { title: "50% Upfront", description: "Confirmação e pagamento inicial." },
  { title: "Instalação", description: "Equipa técnica, materiais em stock." },
  { title: "Follow-up", description: "Acompanhamento pós-instalação incluído." },
];

export function HowItWorksSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="como-funciona" className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="center"
          overline="Como funciona"
          headline="Do primeiro contacto à última etapa — sem surpresas."
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

        <p className="mx-auto max-w-[580px] text-center text-sm leading-relaxed text-ink-soft">
          O levantamento técnico tem um custo de <strong className="text-ink">5.000 CVE</strong>,
          dedutível no valor total se avançar com a instalação. Existe para
          garantir que o seu projeto é dimensionado com rigor — e não para
          dificultar o processo.
        </p>
      </div>
    </section>
  );
}
