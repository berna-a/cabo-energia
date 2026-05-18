import * as React from "react";
import {
  Home,
  Store,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

/* ============================ DOMAIN ============================ */

const TARIFA_CVE_KWH = 32.2;

type Segment = "casa" | "negocio";
type ProfileKey =
  | "ap" | "cas" | "mor" | "viv"
  | "com" | "res" | "hot" | "ind";

interface ProfileOption {
  key: ProfileKey;
  name: string;
  sub: string;
}

const CASA_PROFILES: ProfileOption[] = [
  { key: "ap",  name: "Apartamento",          sub: "Até 3 pessoas" },
  { key: "cas", name: "Casa ou apartamento",  sub: "3–5 pessoas" },
  { key: "mor", name: "Moradia com AC",       sub: "Consumo mais elevado" },
  { key: "viv", name: "Vivenda / casa grande", sub: "Vários AC, consumo intensivo" },
];

const NEG_PROFILES: ProfileOption[] = [
  { key: "com", name: "Comércio / Escritório", sub: "Operação básica" },
  { key: "res", name: "Restaurante / Clínica", sub: "Operação intensiva" },
  { key: "hot", name: "Hotel / Operação maior", sub: "Alta dependência energética" },
  { key: "ind", name: "Indústria / Grande empresa", sub: "Consumo crítico" },
];

interface Pkg {
  name: string;
  price: number;
  prodMes: number;
  baseOffset: number;
  promise: string;
  bullets: string[];
  family: Segment;
}

const PACKAGES: Record<string, Pkg> = {
  tranquila: {
    name: "Casa Tranquila", price: 240000, prodMes: 0, baseOffset: 0.6, family: "casa",
    promise: "Não fique às escuras quando a luz vai abaixo.",
    bullets: [
      "Frigorífico e congelador sempre ligados durante apagões",
      "Iluminação garantida em toda a casa",
      "Telemóvel, router e computador sempre carregados",
    ],
  },
  autonomia: {
    name: "Casa Autonomia", price: 510000, prodMes: 438, baseOffset: 0, family: "casa",
    promise: "O sol paga a sua conta de luz.",
    bullets: [
      "Até 8.000 CVE poupados por mês na fatura de electricidade",
      "Ar condicionado todo o dia sem sentir o peso na factura",
      "Sistema amortiza-se e depois trabalha de graça durante 20+ anos",
    ],
  },
  plena: {
    name: "Casa Plena", price: 730000, prodMes: 584, baseOffset: 0, family: "casa",
    promise: "A sua casa, o seu sol, as suas regras.",
    bullets: [
      "Independência quase total da rede eléctrica nacional",
      "Cada instalação reduz a dependência de Cabo Verde de combustíveis importados",
      "Cozinhe, estude, trabalhe, divirta-se — apagão ou não",
    ],
  },
  essencial: {
    name: "Negócio Essencial", price: 1150000, prodMes: 876, baseOffset: 0, family: "negocio",
    promise: "O seu negócio não para. A sua fatura baixa.",
    bullets: [
      "Portas abertas quando os vizinhos fecham durante apagões",
      "Câmaras frias e equipamentos críticos sempre ligados",
      "Fatura de electricidade reduzida em 60–75%",
    ],
  },
  pleno: {
    name: "Negócio Pleno", price: 1800000, prodMes: 0, baseOffset: 0.7, family: "negocio",
    promise: "Diga aos seus clientes: nunca paramos.",
    bullets: [
      "Operação contínua 24h — apagão ou não",
      'Certificado "Rede de Negócios Protegidos" Cabo Energia',
      "Independência energética como argumento comercial visível",
    ],
  },
};

const PROFILE_TO_PKG: Record<ProfileKey, string> = {
  ap: "tranquila", cas: "autonomia",
  mor: "autonomia", viv: "plena",
  com: "essencial", res: "essencial",
  hot: "pleno", ind: "pleno",
};

function getRecommendedPackage(
  seg: Segment, profile: ProfileKey | null, hasRoof: boolean, fatura: number
): string {
  if (!profile) return seg === "casa" ? "autonomia" : "essencial";
  let pkg = PROFILE_TO_PKG[profile];
  if (seg === "casa" && !hasRoof) pkg = "tranquila";
  if (seg === "casa" && (profile === "mor" || profile === "viv") && fatura > 15000) pkg = "plena";
  return pkg;
}

function calcSavings(pkgKey: string, fatura: number): number {
  const pkg = PACKAGES[pkgKey];
  if (!pkg) return 0;
  const consumo = fatura / TARIFA_CVE_KWH;
  const offset = pkg.prodMes > 0
    ? Math.min(consumo, pkg.prodMes)
    : consumo * pkg.baseOffset;
  const raw = Math.round(offset * TARIFA_CVE_KWH);
  return Math.min(raw, Math.round(fatura * 0.80));
}

const fmtCVE = (n: number) =>
  new Intl.NumberFormat("pt-CV", { maximumFractionDigits: 0 }).format(Math.round(n));

/* ============================ HOOKS ============================ */

function useCountUp(target: number, duration = 600, deps: React.DependencyList = []) {
  const [val, setVal] = React.useState(target);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = val;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return val;
}

/* ============================ COMPONENT ============================ */

const ISLANDS = ["Santiago", "São Vicente", "Sal", "Fogo", "Boa Vista", "Santo Antão", "Outras"];

export default function SimuladorSection() {
  const [step, setStep] = React.useState(1);
  const [seg, setSeg] = React.useState<Segment | null>(null);
  const [profile, setProfile] = React.useState<ProfileKey | null>(null);
  const [fatura, setFatura] = React.useState(9000);
  const [hasRoof, setHasRoof] = React.useState(true);
  const [island, setIsland] = React.useState<string | null>(null);
  const [nome, setNome] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [showOther, setShowOther] = React.useState(false);
  const [shakeNome, setShakeNome] = React.useState(false);
  const [shakeTel, setShakeTel] = React.useState(false);

  const currentPkg = React.useMemo(
    () => (seg ? getRecommendedPackage(seg, profile, hasRoof, fatura) : "tranquila"),
    [seg, profile, hasRoof, fatura]
  );
  const savings = React.useMemo(() => calcSavings(currentPkg, fatura), [currentPkg, fatura]);
  const pkg = PACKAGES[currentPkg];

  const goTo = (n: number) => setStep(n);
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSelectSeg = (s: Segment) => {
    setSeg(s);
    setProfile(null);
    setTimeout(() => goTo(2), 150);
  };

  const submit = async () => {
    let bad = false;
    if (!nome.trim()) { setShakeNome(true); setTimeout(() => setShakeNome(false), 500); bad = true; }
    if (!tel.trim()) { setShakeTel(true); setTimeout(() => setShakeTel(false), 500); bad = true; }
    if (bad) return;

    const source = JSON.stringify({
      ilha: island, segmento: seg, perfil: profile,
      pacote: currentPkg, fatura, poupanca: savings,
    });
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from("leads").insert({
          name: nome.trim(),
          phone: tel.trim(),
          client_type: seg === "casa" ? "residencial" : "empresarial",
          source,
          status: "new_lead",
        });
        if (error) throw error;
      } else {
        // eslint-disable-next-line no-console
        console.warn("[Simulador] supabase não configurado", { nome, tel, source });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[Simulador] erro a gravar lead:", e);
    } finally {
      goTo(6);
    }
  };

  const profiles = seg === "casa" ? CASA_PROFILES : NEG_PROFILES;

  return (
    <section
      id="simulador"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--brand-green)/0.35), transparent 60%), hsl(var(--brand-green-deep))",
      }}
    >
      <style>{`
        @keyframes sim-shake {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(-6px)}
          75%{transform:translateX(6px)}
        }
        .sim-shake{animation:sim-shake .4s ease-in-out}
        @keyframes sim-step-in {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
        .sim-step-in{animation:sim-step-in .2s ease-out}
        @keyframes sim-pulse {
          0%,100%{opacity:1}
          50%{opacity:.55}
        }
        .sim-pulse{animation:sim-pulse 1.6s ease-in-out infinite}
        .sim-slider{-webkit-appearance:none;appearance:none;background:transparent}
        .sim-slider::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:var(--track,rgba(255,255,255,0.12))}
        .sim-slider::-moz-range-track{height:4px;border-radius:2px;background:var(--track,rgba(255,255,255,0.12))}
        .sim-slider::-webkit-slider-thumb{-webkit-appearance:none;height:20px;width:20px;border-radius:50%;background:#F5C842;cursor:grab;margin-top:-8px;border:none;box-shadow:0 0 0 4px rgba(245,200,66,.18)}
        .sim-slider::-moz-range-thumb{height:20px;width:20px;border-radius:50%;background:#F5C842;border:none;cursor:grab}
      `}</style>

      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
          padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 32px)",
        }}
      >
        {/* HEADER */}
        <header className="mb-12 text-center">
          <span
            className="inline-block rounded-pill border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ borderColor: "#F5C842", color: "#F5C842" }}
          >
            Simulador de Poupança
          </span>
          <h2
            className="mt-5 font-display font-semibold text-white"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15 }}
          >
            Descubra quanto pode poupar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60" style={{ fontSize: 16 }}>
            Em 2 minutos, veja a estimativa real para a sua casa ou negócio.
          </p>
        </header>

        {/* CARD */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 720,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "clamp(24px, 4vw, 40px)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Progress */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex flex-1 gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => {
                const done = n < step;
                const active = n === step;
                return (
                  <div
                    key={n}
                    className={cn("h-[3px] flex-1 rounded-[2px] transition-all duration-300", active && "sim-pulse")}
                    style={{
                      background: done
                        ? "#1A5C3A"
                        : active
                        ? "#F5C842"
                        : "rgba(255,255,255,0.12)",
                    }}
                  />
                );
              })}
            </div>
            <span className="shrink-0 text-[11px] text-white/40">
              Passo {Math.min(step, 5)} de 5
            </span>
          </div>

          {/* STEP CONTENT */}
          <div key={step} className="sim-step-in">
            {step === 1 && (
              <StepShell question="Para quem é o sistema?" hint="Escolha o segmento para começar.">
                <div className="grid gap-3 sm:grid-cols-2">
                  <BigChoice
                    icon={<Home className="size-8" />}
                    label="Para a minha casa"
                    sub="Família ou residência"
                    selected={seg === "casa"}
                    onClick={() => handleSelectSeg("casa")}
                  />
                  <BigChoice
                    icon={<Store className="size-8" />}
                    label="Para o meu negócio"
                    sub="Comércio, empresa ou serviço"
                    selected={seg === "negocio"}
                    onClick={() => handleSelectSeg("negocio")}
                  />
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell question="Qual é o seu perfil?" hint="Escolha o que mais se parece consigo.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {profiles.map((p) => (
                    <ProfileCard
                      key={p.key}
                      name={p.name}
                      sub={p.sub}
                      selected={profile === p.key}
                      onClick={() => setProfile(p.key)}
                    />
                  ))}
                </div>
                <Nav onBack={back} onNext={() => goTo(3)} nextDisabled={!profile} />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                question="Quanto paga de luz por mês?"
                hint="Mova o cursor para a sua fatura típica."
              >
                <LivePreview profileSet={!!profile} savings={savings} />

                <div className="mt-6">
                  <input
                    type="range"
                    min={2000}
                    max={40000}
                    step={500}
                    value={fatura}
                    onChange={(e) => setFatura(Number(e.target.value))}
                    className="sim-slider w-full"
                    style={
                      {
                        "--track": `linear-gradient(to right, #1A5C3A 0%, #1A5C3A ${
                          ((fatura - 2000) / (40000 - 2000)) * 100
                        }%, rgba(255,255,255,0.12) ${
                          ((fatura - 2000) / (40000 - 2000)) * 100
                        }%, rgba(255,255,255,0.12) 100%)`,
                      } as React.CSSProperties
                    }
                    aria-label="Factura mensal"
                  />
                  <div className="mt-3 text-right">
                    <div className="font-display text-2xl font-semibold text-white tabular-nums">
                      {fmtCVE(fatura)} CVE
                    </div>
                    <div className="text-xs text-white/45">por mês</div>
                  </div>
                </div>

                {seg === "casa" && (
                  <label
                    className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3.5"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="text-[13px] text-white/70">
                      {hasRoof
                        ? "Tenho telhado ou terraço próprio"
                        : "Não tenho telhado próprio (arrendatário)"}
                    </span>
                    <span
                      role="switch"
                      aria-checked={hasRoof}
                      onClick={() => setHasRoof((v) => !v)}
                      className="relative inline-block h-6 w-[42px] shrink-0 rounded-pill transition-colors"
                      style={{ background: hasRoof ? "#1A5C3A" : "rgba(255,255,255,0.15)" }}
                    >
                      <span
                        className="absolute top-0.5 size-5 rounded-full bg-white transition-all"
                        style={{ left: hasRoof ? 20 : 2 }}
                      />
                    </span>
                  </label>
                )}

                <Nav onBack={back} onNext={() => goTo(4)} nextLabel="Ver a minha estimativa" />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell question="A sua estimativa" hint="Indicativa, baseada nas tarifas ARME 2026.">
                <MetricsRow fatura={fatura} savings={savings} pkgPrice={pkg.price} />

                <div
                  className="mt-5 rounded-2xl p-5"
                  style={{
                    background: "rgba(245,200,66,0.08)",
                    border: "1px solid rgba(245,200,66,0.20)",
                  }}
                >
                  <div className="font-display text-lg font-semibold text-white">{pkg.name}</div>
                  <p className="my-2 text-[14px] italic text-white/55">{pkg.promise}</p>
                  <ul className="flex flex-col gap-1.5">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="text-[14px] leading-5" style={{ color: "#F5C842" }}>✓</span>
                        <span className="text-[13px] leading-[1.5] text-white/80">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-[13px] font-medium" style={{ color: "#F5C842" }}>
                    A partir de {fmtCVE(pkg.price)} CVE
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowOther((v) => !v)}
                  className="mt-4 text-[12px] text-white/35 underline underline-offset-4 hover:text-white/60"
                >
                  Ver outras opções {showOther ? "↑" : "↓"}
                </button>
                {showOther && (
                  <div className="mt-3 flex flex-col gap-2">
                    {Object.entries(PACKAGES)
                      .filter(([k, p]) => p.family === seg && k !== currentPkg)
                      .map(([k, p]) => (
                        <button
                          key={k}
                          type="button"
                          className="rounded-[10px] px-4 py-2.5 text-left transition-transform hover:-translate-y-0.5"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <div className="text-[13px] font-medium text-white/75">{p.name}</div>
                          <div className="text-[12px] italic text-white/40">{p.promise}</div>
                        </button>
                      ))}
                  </div>
                )}

                <p className="mt-3 text-center text-[11px] text-white/30">
                  Estimativa indicativa. Tarifas ARME 2026. O estudo personalizado é gratuito.
                </p>

                <Nav
                  onBack={back}
                  onNext={() => goTo(5)}
                  nextLabel="LIGAR CABO — Quero este estudo"
                  primary
                />
              </StepShell>
            )}

            {step === 5 && (
              <StepShell question="Os seus dados" hint="Kevin contacta-o em até 24h por WhatsApp.">
                <div
                  className="mb-5 inline-flex items-center gap-2 rounded-pill px-4 py-1.5"
                  style={{
                    background: "rgba(26,92,58,0.25)",
                    border: "1px solid rgba(26,92,58,0.4)",
                  }}
                >
                  <span className="size-1.5 rounded-full" style={{ background: "#F5C842" }} />
                  <span className="text-[13px] text-white/70">{pkg.name}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    className={cn("sim-input", shakeNome && "sim-shake")}
                    placeholder="O seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    maxLength={120}
                    style={inputStyle}
                  />
                  <input
                    className={cn("sim-input", shakeTel && "sim-shake")}
                    type="tel"
                    inputMode="tel"
                    placeholder="+238 ···"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    maxLength={30}
                    style={inputStyle}
                  />

                  <div className="mt-1">
                    <div className="mb-2 text-[12px] text-white/45">Ilha</div>
                    <div className="flex flex-wrap gap-2">
                      {ISLANDS.map((i) => {
                        const sel = island === i;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setIsland(i)}
                            className="rounded-pill px-3.5 py-1.5 text-[12px] transition-colors"
                            style={{
                              border: `1px solid ${sel ? "#F5C842" : "rgba(255,255,255,0.15)"}`,
                              color: sel ? "#F5C842" : "rgba(255,255,255,0.5)",
                              background: sel ? "rgba(245,200,66,0.08)" : "transparent",
                            }}
                          >
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="size-3.5" style={{ color: "#4CAF82" }} />
                  <span className="text-[12px] text-white/35">
                    Os seus dados são usados apenas para agendar o estudo. Nunca partilhados.
                  </span>
                </div>

                <Nav onBack={back} onNext={submit} nextLabel="LIGAR CABO" primary />
              </StepShell>
            )}

            {step === 6 && (
              <div className="sim-step-in flex flex-col items-center text-center">
                <CheckCircle2 className="size-12" style={{ color: "#F5C842" }} />
                <h3 className="mt-4 font-display font-bold text-white" style={{ fontSize: 26 }}>
                  Cabo Ligado.
                </h3>
                <p
                  className="mx-auto mt-3 text-white/65"
                  style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 420 }}
                >
                  O seu pedido foi recebido. Kevin da Cabo Energia contacta-o em até 24 horas pelo
                  WhatsApp para confirmar a estimativa e agendar a visita técnica gratuita.
                </p>

                <div
                  className="mx-auto mt-5 w-full text-left"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 14,
                    padding: "16px 20px",
                    maxWidth: 380,
                  }}
                >
                  <SummaryRow label="Nome" value={nome} />
                  <SummaryRow label="Pacote recomendado" value={pkg.name} />
                  <SummaryRow label="Poupança estimada" value={`${fmtCVE(savings)} CVE / mês`} />
                  <SummaryRow label="Ilha" value={island ?? "—"} />
                  <SummaryRow label="Telemóvel" value={tel} />
                </div>

                <p className="mt-4 text-[12px] text-white/40">
                  Guarde o número +238 995 41 81 para reconhecer a chamada de Kevin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ SUB-COMPONENTS ============================ */

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "13px 16px",
  color: "white",
  fontSize: 14,
  outline: "none",
  width: "100%",
};

function StepShell({
  question, hint, children,
}: { question: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-white" style={{ fontSize: 22, marginBottom: 6 }}>
        {question}
      </h3>
      <p className="text-white/50" style={{ fontSize: 14, marginBottom: 24 }}>{hint}</p>
      {children}
    </div>
  );
}

function BigChoice({
  icon, label, sub, selected, onClick,
}: { icon: React.ReactNode; label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-3 text-left transition-all duration-200"
      style={{
        background: selected ? "rgba(26,92,58,0.3)" : "rgba(255,255,255,0.06)",
        border: selected ? "2px solid #F5C842" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: "24px 20px",
      }}
    >
      <span style={{ color: selected ? "#F5C842" : "rgba(255,255,255,0.6)" }}>{icon}</span>
      <div>
        <div className="text-white" style={{ fontSize: 16, fontWeight: 500 }}>{label}</div>
        <div className="text-white/45" style={{ fontSize: 13 }}>{sub}</div>
      </div>
    </button>
  );
}

function ProfileCard({
  name, sub, selected, onClick,
}: { name: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left transition-all duration-200"
      style={{
        background: selected ? "rgba(245,200,66,0.08)" : "rgba(255,255,255,0.05)",
        border: selected ? "2px solid #F5C842" : "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        padding: 16,
      }}
    >
      <div className="text-white" style={{ fontSize: 14, fontWeight: 500 }}>{name}</div>
      <div className="text-white/45" style={{ fontSize: 12, marginTop: 3 }}>{sub}</div>
    </button>
  );
}

function LivePreview({ profileSet, savings }: { profileSet: boolean; savings: number }) {
  const animated = useCountUp(savings, 500, [savings]);
  return (
    <div
      className="flex items-center justify-between"
      style={{
        background: "rgba(245,200,66,0.08)",
        border: "1px solid rgba(245,200,66,0.15)",
        borderRadius: 12,
        padding: "12px 16px",
      }}
    >
      <span className="text-white/45" style={{ fontSize: 12 }}>Poupança estimada / mês</span>
      <span className="font-display font-semibold tabular-nums" style={{ color: "#F5C842", fontSize: 22 }}>
        {profileSet ? `${fmtCVE(animated)} CVE` : "—"}
      </span>
    </div>
  );
}

function MetricsRow({
  fatura, savings, pkgPrice,
}: { fatura: number; savings: number; pkgPrice: number }) {
  const monthly = useCountUp(savings, 600, [savings]);
  const yearly = useCountUp(savings * 12, 600, [savings]);
  const paybackYears = savings > 0 ? pkgPrice / (savings * 12) : 0;
  const payback = useCountUp(Math.round(paybackYears * 10), 600, [paybackYears]);
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Metric label="Poupança / mês" value={`${fmtCVE(monthly)}`} unit="CVE" />
      <Metric label="Poupança / ano" value={`${fmtCVE(yearly)}`} unit="CVE" />
      <Metric label="Payback estimado" value={(payback / 10).toFixed(1)} unit="anos" />
    </div>
  );
  void fatura;
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div className="uppercase tracking-wide text-white/45" style={{ fontSize: 11 }}>
        {label}
      </div>
      <div className="mt-1 font-display font-semibold text-white tabular-nums" style={{ fontSize: 20 }}>
        {value} <span className="text-white/40" style={{ fontSize: 11, fontWeight: 400 }}>{unit}</span>
      </div>
    </div>
  );
}

function Nav({
  onBack, onNext, nextLabel = "Continuar", nextDisabled = false, primary = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  primary?: boolean;
}) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-white/40 transition-colors hover:text-white/70"
        style={{ fontSize: 13 }}
      >
        <ArrowLeft className="size-4" /> Voltar
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-pill transition-all"
        style={{
          padding: primary ? "14px 28px" : "12px 22px",
          background: primary ? "#F5C842" : "#1A5C3A",
          color: primary ? "#0D2B1F" : "white",
          fontWeight: primary ? 700 : 500,
          fontSize: 14,
          letterSpacing: primary ? "0.06em" : 0,
          opacity: nextDisabled ? 0.4 : 1,
          cursor: nextDisabled ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (nextDisabled) return;
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)";
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.92";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.opacity = nextDisabled ? "0.4" : "1";
        }}
      >
        {nextLabel} {!primary && <ArrowRight className="size-4" />}
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-white/40" style={{ fontSize: 12 }}>{label}</span>
      <span className="text-white/80" style={{ fontSize: 13, fontWeight: 500 }}>{value || "—"}</span>
    </div>
  );
}
