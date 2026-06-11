import { Snowflake, Moon, Droplets, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const ICONS = [Snowflake, Moon, Droplets, ShieldCheck];

export function CasaPreocupacoesSection() {
  const { t } = useTranslation();
  const ref = useRevealOnScroll<HTMLDivElement>();
  const preocupacoes = (t("casaPreocupacoes.items", { returnObjects: true }) as { title: string; desc: string }[]).map(
    (it, i) => ({ ...it, icon: ICONS[i] })
  );
  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="left"
          overline={t("casaPreocupacoes.overline")}
          headline={t("casaPreocupacoes.headline")}
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
