import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const rows = [
  { label: "Custo mensal", gerador: "Gasóleo constante — sobe com o preço", solar: "Quase zero depois de instalado" },
  { label: "Ruído", gerador: "Alto, incomoda clientes e vizinhos", solar: "Totalmente silencioso" },
  { label: "Manutenção", gerador: "Frequente e cara", solar: "Mínima, com monitorização remota" },
  { label: "Fiabilidade", gerador: "Avaria e falha no pior momento", solar: "Energia estável, dia após dia" },
  { label: "Ambiente", gerador: "Fumo e emissões", solar: "Limpo e 100% renovável" },
];

const SOURCE = "website_empresarial";

export function NegocioVsGeradorSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-surface-muted py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="center"
          overline="Solar vs Gerador a diesel"
          headline="O gerador queima dinheiro. O sol trabalha de graça."
          className="mx-auto"
        />

        {/* Tabela comparativa */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {/* Cabeçalho */}
          <div className="grid grid-cols-3 text-sm font-bold">
            <div className="p-4" />
            <div className="p-4 text-center text-ink-soft">Gerador a diesel</div>
            <div className="p-4 text-center text-brand-green" style={{ background: "rgba(26,92,58,0.06)" }}>
              Cabo Energia · Solar
            </div>
          </div>
          {/* Linhas */}
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-3 border-t border-border text-sm">
              <div className="flex items-center p-4 font-semibold text-ink">{r.label}</div>
              <div className="flex items-start gap-2 p-4 text-ink-soft">
                <X className="mt-0.5 size-4 shrink-0 text-red-400" />
                <span>{r.gerador}</span>
              </div>
              <div className="flex items-start gap-2 p-4 text-ink" style={{ background: "rgba(26,92,58,0.06)" }}>
                <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
                <span>{r.solar}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Faixa de ROI */}
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-brand-green p-8 text-center text-white md:p-12">
          <h3 className="max-w-2xl text-2xl font-bold leading-tight md:text-3xl">
            Retorno do investimento em 3 a 6 anos.
          </h3>
          <p className="max-w-xl text-white/85">
            Depois disso, a sua energia é praticamente grátis — enquanto o gerador continua a custar todos os meses.
          </p>
          <PillButton
            size="lg"
            variant="power"
            onClick={() => openLeadPanel({ clientType: "empresarial", source: SOURCE })}
          >
            <LigarCaboLabel />
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default NegocioVsGeradorSection;
