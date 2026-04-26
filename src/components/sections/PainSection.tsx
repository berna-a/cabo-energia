import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { StatCard } from "@/components/brand/StatCard";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function PainSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-7">
          <SectionHeader
            overline="O problema que resolve"
            headline="A rede elétrica falha. A sua vida não pode falhar com ela."
          />
          <div className="text-body-lg text-ink-soft">
            <p>
              Em Cabo Verde, o custo da eletricidade é dos mais elevados de
              África e a rede continua instável. As consequências são reais e
              acontecem todos os meses.
            </p>
            <p className="mt-5 font-medium text-ink">
              Apagões sem aviso.<br />
              Faturas que não param de subir.<br />
              Equipamentos em risco. Negócios parados.
            </p>
          </div>
          <a
            href="#solucoes"
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-green hover:text-brand-green-deep"
          >
            Ver como protegemos a sua casa
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard>
            <strong className="text-ink">80%</strong> da energia de Cabo Verde
            ainda depende de combustíveis fósseis.
          </StatCard>
          <StatCard>
            Tarifas de eletricidade entre as <strong className="text-ink">mais altas de África</strong>.
          </StatCard>
          <StatCard>
            Apagões recorrentes em <strong className="text-ink">Santiago e Praia</strong>.
          </StatCard>
          <StatCard variant="accent" className="flex flex-col justify-between gap-5">
            <p className="text-lg font-medium text-white">
              A solução existe. E está disponível agora.
            </p>
            <PillButton
              variant="primary"
              size="md"
              onClick={() => openLeadPanel()}
              className="self-start"
            >
              Ligar Cabo
            </PillButton>
          </StatCard>
        </div>
      </div>
    </section>
  );
}
