import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { LigarCaboLabel } from "./LigarCaboLabel";
import { useLeadPanel } from "./LeadPanelContext";

interface KitCardProps {
  name: string;
  tagline: string;
  specs: string[];
  monthlySavings: string;
  promoPrice: string;
  originalPrice: string;
  badge?: string;
  highlighted?: boolean;
  source?: string;
}

export function KitCard({
  name,
  tagline,
  specs,
  monthlySavings,
  promoPrice,
  originalPrice,
  badge,
  highlighted = false,
  source = "website_residencial",
}: KitCardProps) {
  const { openLeadPanel } = useLeadPanel();

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-3xl border bg-white p-7 md:p-8 transition-all duration-300 hover:-translate-y-1",
        highlighted
          ? "border-brand-green shadow-[0_24px_60px_-30px_hsl(var(--brand-green)/0.4)]"
          : "border-border"
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-7 inline-flex items-center rounded-pill bg-brand-green px-3.5 py-1.5 text-overline text-white">
          {badge}
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-headline text-ink">{name}</h3>
        <p className="text-base text-ink-soft">{tagline}</p>
      </div>

      <span className="inline-flex w-fit items-center rounded-pill bg-brand-yellow/20 px-3.5 py-1.5 text-sm font-semibold text-brand-green-deep">
        {monthlySavings}
      </span>

      <ul className="flex flex-col gap-3 border-y border-border py-5">
        {specs.map((s) => (
          <li key={s} className="flex items-start gap-3 text-sm text-ink-soft">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-ink-muted line-through">
          {originalPrice}
        </span>
        <span className="text-headline text-ink">{promoPrice}</span>
      </div>

      <PillButton
        size="lg"
        variant={highlighted ? "primary" : "solid-green"}
        className="w-full"
        onClick={() =>
          openLeadPanel({ clientType: "residencial", source })
        }
      >
        Ligar Cabo
      </PillButton>
    </div>
  );
}
