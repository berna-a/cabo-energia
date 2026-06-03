import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const SOURCE = "website_residencial";

export function CasaFaturaSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-surface-muted py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="center"
          overline="Poupança real"
          headline="A sua fatura de luz, finalmente a descer."
          className="mx-auto"
        />

        {/* Antes vs Depois */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hoje */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-8">
            <div className="flex size-10 items-center justify-center rounded-pill bg-red-50 text-red-400">
              <TrendingUp className="size-5" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              A sua conta hoje
            </span>
            <span className="text-4xl font-extrabold text-ink">9.000+ CVE<span className="text-lg font-semibold text-ink-soft"> /mês</span></span>
            <p className="text-sm leading-relaxed text-ink-soft">
              Com a ELECTRA — e a subir todos os anos.
            </p>
          </div>

          {/* Com solar */}
          <div className="flex flex-col gap-4 rounded-2xl bg-brand-green p-8 text-white">
            <div className="flex size-10 items-center justify-center rounded-pill bg-white/15 text-white">
              <TrendingDown className="size-5" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Com a Cabo Energia
            </span>
            <span className="text-4xl font-extrabold">até 80% menos</span>
            <p className="text-sm leading-relaxed text-white/85">
              A poupança começa logo no primeiro mês — e o sol não aumenta o preço.
            </p>
          </div>
        </div>

        {/* Faixa de financiamento */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-8 text-center md:p-12">
          <div className="flex size-12 items-center justify-center rounded-pill bg-brand-green/10 text-brand-green">
            <Wallet className="size-6" />
          </div>
          <h3 className="max-w-2xl text-2xl font-bold leading-tight text-ink md:text-3xl">
            Não precisa de pagar tudo de uma vez.
          </h3>
          <p className="max-w-xl text-ink-soft">
            Temos soluções de pagamento faseado e financiamento. Fale connosco e montamos um plano à medida do seu orçamento.
          </p>
          <PillButton
            size="lg"
            variant="power"
            onClick={() => openLeadPanel({ clientType: "residencial", source: SOURCE })}
          >
            <LigarCaboLabel />
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default CasaFaturaSection;
