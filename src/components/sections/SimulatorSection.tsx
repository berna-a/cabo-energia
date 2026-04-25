import * as React from "react";
import { Home, Building2, ArrowRight, Sparkles, TrendingUp, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PillButton } from "@/components/brand/PillButton";
import { SectionHeader } from "@/components/brand/SectionHeader";
import { SimulatorVisual } from "@/components/brand/SimulatorVisual";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

type ClientMode = "casa" | "negocio";

interface ProfileOption {
  id: string;
  label: string;
  hint: string;
  /** Estimativa de factura mensal típica em CVE para pré-preenchimento */
  baseBill: number;
}

const houseProfiles: ProfileOption[] = [
  { id: "ap-pequeno", label: "Apartamento pequeno", hint: "1–2 pessoas", baseBill: 4500 },
  { id: "moradia-media", label: "Moradia média", hint: "Família, 3–4 pessoas", baseBill: 9000 },
  { id: "moradia-grande", label: "Moradia grande", hint: "Piscina, AC, +5 pessoas", baseBill: 16000 },
];

const businessProfiles: ProfileOption[] = [
  { id: "loja-pequena", label: "Loja pequena", hint: "Comércio de bairro", baseBill: 12000 },
  { id: "escritorio", label: "Escritório", hint: "Equipa até 15", baseBill: 22000 },
  { id: "espaco-grande", label: "Restaurante / espaço maior", hint: "Cozinha, AC, frio", baseBill: 45000 },
];

const SAVINGS_PCT: Record<ClientMode, number> = {
  casa: 0.7,
  negocio: 0.6,
};

const fmtCVE = (n: number) =>
  new Intl.NumberFormat("pt-CV", { maximumFractionDigits: 0 }).format(Math.round(n)) + " CVE";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Telemóvel inválido.")
    .max(30)
    .regex(/^[+\d\s().-]+$/, "Use apenas números."),
});
type LeadValues = z.infer<typeof leadSchema>;

export function SimulatorSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const [mode, setMode] = React.useState<ClientMode>("casa");
  const profiles = mode === "casa" ? houseProfiles : businessProfiles;
  const [profileId, setProfileId] = React.useState<string>(profiles[1].id);
  const profile = profiles.find((p) => p.id === profileId) ?? profiles[1];

  const [bill, setBill] = React.useState<number>(profile.baseBill);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Quando o utilizador muda modo, repor para perfil intermédio + factura base
  React.useEffect(() => {
    const next = mode === "casa" ? houseProfiles[1] : businessProfiles[1];
    setProfileId(next.id);
    setBill(next.baseBill);
  }, [mode]);

  // Quando muda o perfil (não o slider de factura), pré-preenche a factura
  const handleProfileChange = (id: string) => {
    setProfileId(id);
    const p = profiles.find((x) => x.id === id);
    if (p) setBill(p.baseBill);
  };

  const monthlySaving = bill * SAVINGS_PCT[mode];
  const fiveYearSaving = monthlySaving * 60;
  const recommendation = recommendKit(mode, bill);

  // Intensidade visual cresce com factura (mais consumo → mais a "ligar")
  const intensity = Math.min(1, 0.35 + bill / 60000);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (values: LeadValues) => {
    setSubmitError(null);
    const payload = {
      name: values.name,
      phone: values.phone,
      client_type: mode === "casa" ? "residencial" : "empresarial",
      source: `simulator_${mode}_${profile.id}_${bill}`,
      status: "new_lead",
    };
    try {
      if (!isSupabaseConfigured() || !supabase) {
        // eslint-disable-next-line no-console
        console.warn("[SimulatorSection] Supabase não configurado — submissão simulada.", payload);
        setSubmitted(true);
        return;
      }
      const { error } = await supabase.from("leads").insert(payload);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[SimulatorSection] erro ao submeter:", err);
      setSubmitError("Não conseguimos enviar o pedido agora. Tente novamente em alguns instantes.");
    }
  };

  return (
    <section
      id="simulador"
      className="relative overflow-hidden bg-brand-green-deep py-20 text-white md:py-28"
    >
      {/* Halos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 10%, hsl(var(--brand-yellow)/0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, hsl(var(--brand-green)/0.35), transparent 60%)",
        }}
      />

      <div ref={ref} className="reveal container relative flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <SectionHeader
            tone="light"
            badgeTone="yellow"
            overline="Simulador de poupança"
            headline="Descubra quanto pode poupar."
          />
          <p className="max-w-2xl text-body-lg text-white/70">
            Em menos de 1 minuto, veja uma estimativa para a sua casa ou negócio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* COLUNA ESQUERDA — Simulador */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
            {/* Passo 1 */}
            <Step number={1} label="É para casa ou negócio?" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ModeCard
                active={mode === "casa"}
                icon={<Home className="size-5" />}
                title="Casa"
                desc="Para a sua família"
                onClick={() => setMode("casa")}
              />
              <ModeCard
                active={mode === "negocio"}
                icon={<Building2 className="size-5" />}
                title="Negócio"
                desc="Para o seu espaço"
                onClick={() => setMode("negocio")}
              />
            </div>

            {/* Passo 2 */}
            <Step number={2} label="Qual é o seu perfil?" className="mt-8" />
            <div className="mt-3 grid gap-2">
              {profiles.map((p) => (
                <ProfileRow
                  key={p.id}
                  active={profileId === p.id}
                  label={p.label}
                  hint={p.hint}
                  onClick={() => handleProfileChange(p.id)}
                />
              ))}
            </div>

            {/* Passo 3 */}
            <Step number={3} label="Quanto paga por mês de electricidade?" className="mt-8" />
            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-bold text-white tabular-nums md:text-4xl">
                  {fmtCVE(bill)}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-white/50">por mês</span>
              </div>
              <input
                type="range"
                min={2000}
                max={80000}
                step={500}
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-pill bg-white/10 accent-brand-yellow"
                aria-label="Factura mensal de electricidade"
              />
              <div className="mt-1 flex justify-between text-[11px] text-white/40">
                <span>2 000</span>
                <span>80 000</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA — Visual + Resultado */}
          <div className="flex flex-col gap-6">
            <SimulatorVisual mode={mode} intensity={intensity} />

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7">
              {!submitted ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat
                      icon={<Sparkles className="size-4" />}
                      label="Poupança / mês"
                      value={fmtCVE(monthlySaving)}
                      accent
                    />
                    <Stat
                      icon={<TrendingUp className="size-4" />}
                      label="Em 5 anos"
                      value={fmtCVE(fiveYearSaving)}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/[0.06] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-yellow">
                      Solução recomendada
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      {recommendation}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="O seu nome"
                        autoComplete="name"
                        className={leadInput}
                        aria-invalid={!!errors.name}
                      />
                      <input
                        {...register("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+238 ..."
                        className={leadInput}
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                    {(errors.name || errors.phone) && (
                      <p className="text-xs text-brand-yellow">
                        {errors.name?.message || errors.phone?.message}
                      </p>
                    )}
                    {submitError && (
                      <p className="text-xs text-brand-yellow">{submitError}</p>
                    )}

                    <PillButton
                      type="submit"
                      size="lg"
                      variant="power"
                      disabled={isSubmitting}
                      className="group mt-1 w-full"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(110deg,transparent,hsl(var(--brand-yellow)/0.6),transparent)] opacity-0 group-hover:opacity-100 group-hover:animate-spark-sweep"
                      />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="relative z-10 animate-spin" /> A enviar...
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Receber estudo personalizado</span>
                          <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </PillButton>

                    <p className="text-[11px] text-white/50">
                      Estimativa indicativa. Estudo gratuito, sem compromisso.
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-start gap-4 py-2">
                  <div className="flex size-12 items-center justify-center rounded-pill bg-brand-yellow/15 text-brand-yellow">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    Pedido recebido.
                  </h3>
                  <p className="text-white/70">
                    Vamos preparar o seu estudo e contactá-lo em até 24 horas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function recommendKit(mode: ClientMode, bill: number) {
  if (mode === "casa") {
    if (bill < 6000) return "Kit Solar Essencial — autoconsumo básico";
    if (bill < 12000) return "Kit Solar Conforto — autoconsumo + bateria";
    return "Kit Solar Premium — autoconsumo + bateria reforçada";
  }
  if (bill < 15000) return "Solar Comercial Compacto";
  if (bill < 35000) return "Solar Comercial Standard + monitorização";
  return "Solar Comercial Avançado + backup energético";
}

const leadInput =
  "h-12 w-full rounded-pill border border-white/15 bg-white/[0.06] px-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/15";

function Step({
  number,
  label,
  className,
}: {
  number: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="inline-flex size-7 items-center justify-center rounded-pill border border-brand-yellow/40 bg-brand-yellow/10 text-xs font-bold text-brand-yellow">
        {number}
      </span>
      <span className="text-sm font-semibold text-white/90">{label}</span>
    </div>
  );
}

function ModeCard({
  active,
  icon,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-brand-yellow bg-brand-yellow/10 text-white shadow-[0_0_0_4px_hsl(var(--brand-yellow)/0.12)]"
          : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:bg-white/[0.06]"
      )}
    >
      <span
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-pill transition-colors",
          active ? "bg-brand-yellow text-brand-green-deep" : "bg-white/10 text-white"
        )}
      >
        {icon}
      </span>
      <span className="font-display text-base font-semibold">{title}</span>
      <span className="text-xs text-white/55">{desc}</span>
    </button>
  );
}

function ProfileRow({
  active,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-between gap-3 rounded-pill border px-4 py-3 text-left transition-all",
        active
          ? "border-brand-yellow bg-brand-yellow/10 text-white"
          : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:bg-white/[0.06]"
      )}
    >
      <span className="flex flex-col">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-[11px] text-white/50">{hint}</span>
      </span>
      <span
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-full border transition-colors",
          active ? "border-brand-yellow bg-brand-yellow" : "border-white/30"
        )}
        aria-hidden
      >
        {active && <span className="size-2 rounded-full bg-brand-green-deep" />}
      </span>
    </button>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        accent
          ? "border-brand-yellow/30 bg-brand-yellow/[0.08]"
          : "border-white/10 bg-white/[0.03]"
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        <span className={cn(accent ? "text-brand-yellow" : "text-white/60")}>{icon}</span>
        {label}
      </div>
      <div
        className={cn(
          "mt-2 font-display text-2xl font-bold tabular-nums md:text-[1.7rem]",
          accent ? "text-brand-yellow" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  );
}
