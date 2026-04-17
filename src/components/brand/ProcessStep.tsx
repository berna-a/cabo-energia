import { cn } from "@/lib/utils";

interface ProcessStepProps {
  index: number;
  total: number;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStep({
  index,
  total,
  title,
  description,
  className,
}: ProcessStepProps) {
  const isLast = index === total - 1;
  return (
    <div
      className={cn(
        "relative flex shrink-0 snap-start flex-col gap-4 rounded-2xl border border-border bg-white p-6 lg:flex-1 lg:bg-transparent lg:border-0 lg:p-0",
        "w-[260px] lg:w-auto",
        className
      )}
    >
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-pill bg-brand-green text-white text-sm font-semibold">
          {String(index + 1).padStart(2, "0")}
          {!isLast && (
            <span
              aria-hidden
              className="absolute left-full top-1/2 hidden h-px w-[calc(100%+1.5rem)] -translate-y-1/2 bg-gradient-to-r from-brand-green/40 to-brand-green/0 lg:block"
            />
          )}
        </div>
        <h3 className="text-base font-semibold text-ink lg:text-title">{title}</h3>
      </div>
      <p className="text-sm text-ink-soft lg:pr-4">{description}</p>
    </div>
  );
}
