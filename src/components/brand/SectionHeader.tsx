import { cn } from "@/lib/utils";
import { TrustBadge } from "./TrustBadge";

interface SectionHeaderProps {
  overline: string;
  headline: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  badgeTone?: "light" | "dark" | "yellow";
}

export function SectionHeader({
  overline,
  headline,
  align = "left",
  tone = "dark",
  className,
  badgeTone,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter && "items-center text-center",
        className
      )}
    >
      <TrustBadge tone={badgeTone ?? (tone === "light" ? "light" : "dark")}>
        {overline}
      </TrustBadge>
      <h2
        className={cn(
          "text-headline max-w-3xl",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        {headline}
      </h2>
    </div>
  );
}
