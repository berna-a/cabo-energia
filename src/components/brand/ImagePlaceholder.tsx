import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  label?: string;
}

// TODO: substituir por fotografia real (painéis solares em telhado caboverdiano,
// alta qualidade, tonalidade escura). Manter proporção e overlay do Hero.
export function ImagePlaceholder({ className, label }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-shimmer relative overflow-hidden",
        className
      )}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,hsl(var(--brand-yellow)/0.25),transparent_55%)]" />
    </div>
  );
}
