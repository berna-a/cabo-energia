import * as React from "react";
import { cn } from "@/lib/utils";

type Mode = "casa" | "negocio";

interface SimulatorVisualProps {
  mode: Mode;
  /** 0–1 — intensidade visual ligada à poupança */
  intensity?: number;
}

/**
 * Ilustração SVG estilizada e premium da casa / edifício comercial.
 * Reage ao modo seleccionado e à intensidade (luzes, painéis, brilho).
 */
export function SimulatorVisual({ mode, intensity = 0.6 }: SimulatorVisualProps) {
  const i = Math.min(1, Math.max(0.15, intensity));

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-green-deep via-[hsl(155_55%_8%)] to-black">
      {/* Glow ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 110%, hsl(var(--brand-yellow) / 0.18), transparent 60%)",
          opacity: 0.4 + i * 0.6,
        }}
      />

      {/* Sol / fonte de luz */}
      <div
        aria-hidden
        className="absolute right-8 top-8 size-16 rounded-full transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--brand-yellow)) 0%, hsl(var(--brand-yellow)/0.4) 45%, transparent 70%)",
          filter: "blur(2px)",
          opacity: 0.55 + i * 0.45,
        }}
      />

      {/* Cena */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={mode === "casa" ? "Casa moderna com painéis solares" : "Edifício comercial com painéis solares"}
      >
        {/* Chão */}
        <line
          x1="0"
          y1="260"
          x2="400"
          y2="260"
          stroke="hsl(var(--brand-yellow) / 0.18)"
          strokeWidth="0.5"
        />

        {mode === "casa" ? <HouseScene intensity={i} /> : <BusinessScene intensity={i} />}

        {/* Raios subtis */}
        <g opacity={0.35 + i * 0.5}>
          {[...Array(6)].map((_, k) => (
            <line
              key={k}
              x1={310 + k * 4}
              y1={40}
              x2={260 - k * 6}
              y2={130}
              stroke="hsl(var(--brand-yellow))"
              strokeWidth="0.6"
              strokeDasharray="2 4"
              opacity={0.35}
            />
          ))}
        </g>
      </svg>

      {/* Indicador de modo */}
      <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            mode === "casa" ? "bg-brand-yellow" : "bg-brand-yellow"
          )}
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          {mode === "casa" ? "Casa ligada" : "Negócio ligado"}
        </span>
      </div>
    </div>
  );
}

function HouseScene({ intensity }: { intensity: number }) {
  const window1 = 0.25 + intensity * 0.75;
  return (
    <g>
      {/* Corpo da casa */}
      <path
        d="M 90 260 L 90 175 L 200 110 L 310 175 L 310 260 Z"
        fill="hsl(var(--brand-green-deep))"
        stroke="hsl(var(--brand-yellow) / 0.35)"
        strokeWidth="1"
      />
      {/* Telhado */}
      <path
        d="M 80 180 L 200 100 L 320 180"
        fill="none"
        stroke="hsl(var(--brand-yellow) / 0.45)"
        strokeWidth="1.2"
      />
      {/* Painéis solares no telhado */}
      <g transform="translate(140 130) rotate(-30)">
        <rect x="0" y="0" width="70" height="34" rx="2" fill="hsl(var(--brand-green))" stroke="hsl(var(--brand-yellow))" strokeWidth="0.6" />
        <line x1="0" y1="11" x2="70" y2="11" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.4" />
        <line x1="0" y1="22" x2="70" y2="22" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.4" />
        <line x1="23" y1="0" x2="23" y2="34" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.4" />
        <line x1="46" y1="0" x2="46" y2="34" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.4" />
        {/* Brilho */}
        <rect x="0" y="0" width="70" height="34" rx="2" fill="hsl(var(--brand-yellow))" opacity={intensity * 0.25} />
      </g>

      {/* Janelas — luz interior */}
      <rect x="115" y="195" width="34" height="34" rx="2" fill="hsl(var(--brand-yellow))" opacity={window1} />
      <rect x="251" y="195" width="34" height="34" rx="2" fill="hsl(var(--brand-yellow))" opacity={window1 * 0.85} />
      <rect x="115" y="195" width="34" height="34" rx="2" fill="none" stroke="hsl(var(--brand-yellow)/0.6)" strokeWidth="0.8" />
      <rect x="251" y="195" width="34" height="34" rx="2" fill="none" stroke="hsl(var(--brand-yellow)/0.6)" strokeWidth="0.8" />

      {/* Porta */}
      <rect x="186" y="200" width="28" height="60" rx="2" fill="hsl(var(--brand-green))" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.6" />
      <circle cx="207" cy="232" r="1.4" fill="hsl(var(--brand-yellow))" opacity={0.4 + intensity * 0.6} />
    </g>
  );
}

function BusinessScene({ intensity }: { intensity: number }) {
  const lit = 0.2 + intensity * 0.8;
  return (
    <g>
      {/* Edifício principal */}
      <rect x="100" y="110" width="180" height="150" fill="hsl(var(--brand-green-deep))" stroke="hsl(var(--brand-yellow)/0.35)" strokeWidth="1" />
      {/* Edifício menor à esquerda */}
      <rect x="60" y="170" width="50" height="90" fill="hsl(var(--brand-green-deep))" stroke="hsl(var(--brand-yellow)/0.3)" strokeWidth="0.8" />
      {/* Edifício menor à direita */}
      <rect x="280" y="150" width="60" height="110" fill="hsl(var(--brand-green-deep))" stroke="hsl(var(--brand-yellow)/0.3)" strokeWidth="0.8" />

      {/* Painéis no telhado principal */}
      <g transform="translate(120 92)">
        <rect x="0" y="0" width="140" height="18" rx="1.5" fill="hsl(var(--brand-green))" stroke="hsl(var(--brand-yellow))" strokeWidth="0.5" />
        {[...Array(6)].map((_, k) => (
          <line key={k} x1={(k + 1) * 20} y1="0" x2={(k + 1) * 20} y2="18" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.4" />
        ))}
        <rect x="0" y="0" width="140" height="18" rx="1.5" fill="hsl(var(--brand-yellow))" opacity={intensity * 0.28} />
      </g>

      {/* Grelha de janelas iluminadas */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const flicker = ((row * 5 + col) % 3) * 0.12;
          return (
            <rect
              key={`${row}-${col}`}
              x={115 + col * 30}
              y={130 + row * 35}
              width="20"
              height="22"
              rx="1.5"
              fill="hsl(var(--brand-yellow))"
              opacity={Math.min(1, lit - flicker)}
            />
          );
        })
      )}

      {/* Entrada */}
      <rect x="178" y="225" width="24" height="35" fill="hsl(var(--brand-green))" stroke="hsl(var(--brand-yellow)/0.5)" strokeWidth="0.6" />
    </g>
  );
}
