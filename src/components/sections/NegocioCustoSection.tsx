import { Snowflake, ShoppingCart, Fuel, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const ICONS = [Snowflake, ShoppingCart, Fuel, Zap];

export function NegocioCustoSection() {
  const { t } = useTranslation();
  const ref = useRevealOnScroll<HTMLDivElement>();
  const custos = (t("negocioCusto.items", { returnObjects: true }) as { title: string; desc: string }[]).map(
    (it, i) => ({ ...it, icon: ICONS[i] })
  );
  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="reveal container flex flex-col gap-14">
        <SectionHeader
          align="left"
          overline={t("negocioCusto.overline")}
          headline={t("negocioCusto.headline")}
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
