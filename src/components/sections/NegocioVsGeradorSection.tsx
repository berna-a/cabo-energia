import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const SOURCE = "website_empresarial";

export function NegocioVsGeradorSection() {
  const { t } = useTranslation();
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();
  const rows = t("vsGerador.rows", { returnObjects: true }) as { label: string; gerador: string; solar: string }[];

  return (
    <section className="bg-surface-muted py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="center"
          overline={t("vsGerador.overline")}
          headline={t("vsGerador.headline")}
          className="mx-auto"
        />

        {/* Tabela comparativa */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {/* Cabeçalho */}
          <div className="grid grid-cols-3 text-sm font-bold">
            <div className="p-4" />
            <div className="p-4 text-center text-ink-soft">{t("vsGerador.headerGerador")}</div>
            <div className="p-4 text-center text-brand-green" style={{ background: "rgba(26,92,58,0.06)" }}>
              {t("vsGerador.headerSolar")}
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
            {t("vsGerador.roiTitle")}
          </h3>
          <p className="max-w-xl text-white/85">
            {t("vsGerador.roiBody")}
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
