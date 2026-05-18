import * as React from "react";
import {
  Home,
  Store,
  Building,
  Briefcase,
  UtensilsCrossed,
  BedDouble,
  Factory,
  Refrigerator,
  Lightbulb,
  Smartphone,
  Coins,
  Snowflake,
  CalendarCheck,
  PowerOff,
  Leaf,
  Infinity as InfinityIcon,
  DoorOpen,
  Thermometer,
  TrendingDown,
  Clock,
  BadgeCheck,
  Users,
  ShieldCheck,
  Check,
  ArrowLeft,
  HousePlus,
  Castle,
  type LucideIcon,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";

/* ---------------------------- LOGIC / CONSTANTS ---------------------------- */

const TARIFA_CVE_KWH = 32.2;

type PkgKey = "tranquila" | "autonomia" | "plena" | "essencial" | "pleno";

const PACKAGES: Record<
  PkgKey,
  {
    name: string;
    price: number;
    priceStr: string;
    prodMes: number;
    baseOffset: number;
    family: "casa" | "negocio";
    promise: string;
  }
> = {
  tranquila: {
    name: "Casa Tranquila",
    price: 240000,
    priceStr: "A partir de 240.000 CVE",
    prodMes: 0,
    baseOffset: 0.6,
    family: "casa",
    promise: "O essencial sempre ligado, mesmo quando a luz vai abaixo.",
  },
  autonomia: {
    name: "Casa Autonomia",
    price: 510000,
    priceStr: "510.000 CVE",
    prodMes: 438,
    baseOffset: 0,
    family: "casa",
    promise: "A sua casa funciona com o sol — a factura cai todos os meses.",
  },
  plena: {
    name: "Casa Plena",
    price: 730000,
    priceStr: "730.000 CVE",
    prodMes: 584,
    baseOffset: 0,
    family: "casa",
    promise: "Independência quase total — viva como se a Electra não existisse.",
  },
  essencial: {
    name: "Negócio Essencial",
    price: 1150000,
    priceStr: "1.150.000 CVE",
    prodMes: 876,
    baseOffset: 0,
    family: "negocio",
    promise: "Mantenha o negócio aberto e os custos sob controlo.",
  },
  pleno: {
    name: "Negócio Pleno",
    price: 1800000,
    priceStr: "A partir de 1.800.000 CVE",
    prodMes: 0,
    baseOffset: 0.7,
    family: "negocio",
    promise: "Operação contínua, certificada e diferenciadora.",
  },
};

type Seg = "casa" | "negocio";

function getPackage(seg: Seg, profile: string, hasRoof: boolean, fatura: number): PkgKey {
  const map: Record<string, PkgKey> = {
    ap: "tranquila",
    cas: "autonomia",
    mor: "autonomia",
    viv: "plena",
    com: "essencial",
    res: "essencial",
    hot: "pleno",
    ind: "pleno",
  };
  let pkg: PkgKey = map[profile] ?? (seg === "casa" ? "autonomia" : "essencial");
  if (seg === "casa" && !hasRoof) pkg = "tranquila";
  if (seg === "casa" && (profile === "mor" || profile === "viv") && fatura > 15000) pkg = "plena";
  return pkg;
}

function calcSavings(pkgKey: PkgKey, fatura: number): number {
  const pkg = PACKAGES[pkgKey];
  const consumo = fatura / TARIFA_CVE_KWH;
  const offset = pkg.prodMes > 0 ? Math.min(consumo, pkg.prodMes) : consumo * pkg.baseOffset;
  const raw = Math.round(offset * TARIFA_CVE_KWH);
  return Math.min(raw, Math.round(fatura * 0.8));
}

const fmt = (n: number) => n.toLocaleString("pt-PT");

/* ------------------------------- PROFILE DATA ------------------------------ */

type Profile = {
  id: string;
  name: string;
  sub: string;
  Icon: LucideIcon;
  color: string;
  bg: string;
};

const CASA_PROFILES: Profile[] = [
  { id: "ap", name: "Apartamento", sub: "Até 3 pessoas", Icon: Building, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  { id: "cas", name: "Casa ou apartamento", sub: "3–5 pessoas", Icon: Home, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  { id: "mor", name: "Moradia com AC", sub: "Consumo mais elevado", Icon: HousePlus, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { id: "viv", name: "Vivenda / casa grande", sub: "Vários AC, consumo intensivo", Icon: Castle, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
];

const NEG_PROFILES: Profile[] = [
  { id: "com", name: "Comércio / Escritório", sub: "Operação simples", Icon: Briefcase, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  { id: "res", name: "Restaurante / Clínica", sub: "Operação intensiva", Icon: UtensilsCrossed, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { id: "hot", name: "Hotel / Operação maior", sub: "Alta dependência energética", Icon: BedDouble, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { id: "ind", name: "Indústria / Grande empresa", sub: "Consumo crítico", Icon: Factory, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
];

/* ----------------------------- BENEFIT MAPPING ----------------------------- */

type Benefit = {
  Icon: LucideIcon;
  color: string;
  bg: string;
  text: string;
};

const BENEFITS: Record<PkgKey, Benefit[]> = {
  tranquila: [
    { Icon: Refrigerator, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", text: "Frigorífico e congelador sempre ligados" },
    { Icon: Lightbulb, color: "#F5C842", bg: "rgba(245,200,66,0.10)", text: "Iluminação garantida em toda a casa" },
    { Icon: Smartphone, color: "#10B981", bg: "rgba(16,185,129,0.12)", text: "Telemóvel, router e computador carregados" },
  ],
  autonomia: [
    { Icon: Coins, color: "#F5C842", bg: "rgba(245,200,66,0.10)", text: "Até 8.000 CVE poupados por mês" },
    { Icon: Snowflake, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", text: "AC todo o dia sem sentir na factura" },
    { Icon: CalendarCheck, color: "#10B981", bg: "rgba(16,185,129,0.12)", text: "Sistema amortiza-se em 5 anos" },
  ],
  plena: [
    { Icon: PowerOff, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)", text: "Independência quase total da rede" },
    { Icon: Leaf, color: "#10B981", bg: "rgba(16,185,129,0.12)", text: "Menos petróleo importado em Cabo Verde" },
    { Icon: InfinityIcon, color: "#F5C842", bg: "rgba(245,200,66,0.10)", text: "A casa funciona — apagão ou não" },
  ],
  essencial: [
    { Icon: DoorOpen, color: "#10B981", bg: "rgba(16,185,129,0.12)", text: "Portas abertas quando os vizinhos fecham" },
    { Icon: Thermometer, color: "#EF4444", bg: "rgba(239,68,68,0.12)", text: "Equipamentos críticos sempre ligados" },
    { Icon: TrendingDown, color: "#F5C842", bg: "rgba(245,200,66,0.10)", text: "Fatura reduzida em 60–75%" },
  ],
  pleno: [
    { Icon: Clock, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)", text: "Operação contínua — apagão ou não" },
    { Icon: BadgeCheck, color: "#F5C842", bg: "rgba(245,200,66,0.10)", text: "Certificado Rede de Negócios Protegidos" },
    { Icon: Users, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", text: "Diferenciador visível para os seus clientes" },
  ],
};

const ISLANDS = [
  "Boa Vista",
  "Brava",
  "Fogo",
  "Maio",
  "Sal",
  "Santiago",
  "Santo Antão",
  "São Nicolau",
  "São Vicente",
];

/* --------------------------------- STYLES ---------------------------------- */

const FONT = "Montserrat, system-ui, sans-serif";
const YELLOW = "#F5C842";
const GREEN = "#1A5C3A";
const DARK = "#0D2B1F";

/* -------------------------------- COMPONENT -------------------------------- */

export default function SimuladorSection() {
  const [step, setStep] = React.useState(1);
  const [seg, setSeg] = React.useState<Seg | "">("");
  const [profile, setProfile] = React.useState("");
  const [fatura, setFatura] = React.useState(9000);
  const [hasRoof, setHasRoof] = React.useState(true);
  const [island, setIsland] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [errors, setErrors] = React.useState<{ nome?: boolean; tel?: boolean }>({});
  const [showOthers, setShowOthers] = React.useState(false);
  const [pkgOverride, setPkgOverride] = React.useState<PkgKey | null>(null);

  const profiles = seg === "negocio" ? NEG_PROFILES : CASA_PROFILES;
  const autoPkg = seg ? getPackage(seg as Seg, profile, hasRoof, fatura) : "tranquila";
  const currentPkg: PkgKey = pkgOverride ?? autoPkg;
  const savings = profile ? calcSavings(currentPkg, fatura) : 0;
  const annual = savings * 12;
  const payback = annual > 0 ? (PACKAGES[currentPkg].price / annual).toFixed(1) : "—";

  React.useEffect(() => {
    setPkgOverride(null);
    setShowOthers(false);
  }, [seg, profile, fatura, hasRoof]);

  const otherOptions = (Object.keys(PACKAGES) as PkgKey[]).filter(
    (k) => PACKAGES[k].family === (seg || "casa") && k !== currentPkg
  );

  const go = (n: number) => setStep(n);

  const selectSeg = (s: Seg) => {
    setSeg(s);
    setProfile("");
    setTimeout(() => go(2), 150);
  };

  const submitLead = async () => {
    const e: typeof errors = {};
    if (!nome.trim()) e.nome = true;
    if (!tel.trim()) e.tel = true;
    setErrors(e);
    if (Object.keys(e).length) return;

    const payload = {
      name: nome.trim(),
      phone: tel.trim(),
      client_type: seg === "casa" ? "residencial" : "empresarial",
      source: "simulador",
      status: "new_lead",
      ilha: island,
      perfil: profile,
      pacote_recomendado: currentPkg,
      fatura_mensal: fatura,
      poupanca_estimada: savings,
    };
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from("leads").insert(payload as never);
        if (error) console.error("[Simulador] supabase error:", error);
      } else {
        console.warn("[Simulador] supabase not configured, payload:", payload);
      }
    } catch (err) {
      console.error("[Simulador] insert failed:", err);
    }
    go(6);
  };

  return (
    <section
      id="simulador"
      style={{
        background: "#ffffff",
        fontFamily: FONT,
        padding: "80px 24px",
      }}
    >
      <style>{`
        @keyframes simStepIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sim-step { animation: simStepIn 220ms ease-out; }
        .sim-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
          outline: none;
          background-image: linear-gradient(${YELLOW}, ${YELLOW});
          background-repeat: no-repeat;
        }
        .sim-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: ${YELLOW};
          cursor: grab;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .sim-slider::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: ${YELLOW};
          cursor: grab;
          border: none;
        }
        .sim-card-wrap { max-width: 1100px; margin: 0 auto; }
        @media (max-width: 640px) {
          #simulador { padding: 48px 20px !important; }
          .sim-card { padding: 24px 20px !important; }
          .sim-grid-2, .sim-grid-2x2, .sim-grid-3 { grid-template-columns: 1fr !important; }
          .sim-nav { flex-direction: column-reverse !important; align-items: stretch !important; }
          .sim-nav > * { width: 100%; }
        }
      `}</style>

      <div className="sim-card-wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              border: `1px solid ${YELLOW}`,
              color: YELLOW,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 20px",
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            Simulador de Poupança
          </span>
          <h2
            style={{
              color: DARK,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Descubra quanto pode poupar
          </h2>
          <p style={{ color: "#374151", fontSize: 16, margin: 0 }}>
            Em 2 minutos, veja a estimativa real para a sua casa ou negócio.
          </p>
        </div>

        {/* Progress */}
        {step < 6 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[1, 2, 3, 4, 5].map((n) => {
                const bg = n < step ? YELLOW : n === step ? `${YELLOW}99` : `${GREEN}33`;
                return (
                  <div
                    key={n}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      background: bg,
                    }}
                  />
                );
              })}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#6b7280",
                letterSpacing: "0.04em",
                marginTop: 8,
                textAlign: "right",
              }}
            >
              Passo {step} de 5
            </div>
          </div>
        )}

        {/* Card */}
        <div
          className="sim-card"
          style={{
            background: DARK,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "36px 32px",
            minHeight: 480,
            position: "relative",
          }}
        >
          {step === 1 && <Step1 onSelect={selectSeg} seg={seg as Seg} />}
          {step === 2 && (
            <Step2
              seg={seg as Seg}
              profiles={profiles}
              profile={profile}
              setProfile={setProfile}
              onBack={() => go(1)}
              onNext={() => go(3)}
            />
          )}
          {step === 3 && (
            <Step3
              seg={seg as Seg}
              fatura={fatura}
              setFatura={setFatura}
              hasRoof={hasRoof}
              setHasRoof={setHasRoof}
              previewSavings={savings}
              hasProfile={!!profile}
              onBack={() => go(2)}
              onNext={() => go(4)}
            />
          )}
          {step === 4 && (
            <Step4
              currentPkg={currentPkg}
              savings={savings}
              annual={annual}
              payback={payback}
              otherOptions={otherOptions}
              showOthers={showOthers}
              setShowOthers={setShowOthers}
              setPkgOverride={setPkgOverride}
              onBack={() => go(3)}
              onNext={() => go(5)}
            />
          )}
          {step === 5 && (
            <Step5
              currentPkg={currentPkg}
              nome={nome}
              setNome={setNome}
              tel={tel}
              setTel={setTel}
              island={island}
              setIsland={setIsland}
              errors={errors}
              onBack={() => go(4)}
              onSubmit={submitLead}
            />
          )}
          {step === 6 && (
            <Step6
              nome={nome}
              tel={tel}
              island={island}
              currentPkg={currentPkg}
              savings={savings}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- STEPS ----------------------------------- */

function Step1({ onSelect, seg }: { onSelect: (s: Seg) => void; seg: Seg }) {
  return (
    <div className="sim-step" key="s1">
      <StepHeader
        title="Para onde é a solução?"
        hint="Vamos personalizar a sua simulação."
      />
      <div
        className="sim-grid-2"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
      >
        <SegCard
          selected={seg === "casa"}
          onClick={() => onSelect("casa")}
          gradient="linear-gradient(135deg, #1A5C3A 0%, #0D2B1F 100%)"
          Icon={Home}
          name="Para a minha casa"
          sub="Família ou residência"
        />
        <SegCard
          selected={seg === "negocio"}
          onClick={() => onSelect("negocio")}
          gradient="linear-gradient(135deg, #1A3A5C 0%, #0D1F2B 100%)"
          Icon={Store}
          name="Para o meu negócio"
          sub="Comércio, empresa ou serviço"
        />
      </div>
    </div>
  );
}

function SegCard({
  selected,
  onClick,
  gradient,
  Icon,
  name,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  gradient: string;
  Icon: LucideIcon;
  name: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        borderRadius: 20,
        border: selected ? `2px solid ${YELLOW}` : "1px solid rgba(255,255,255,0.10)",
        background: selected ? "rgba(26,92,58,0.30)" : "rgba(255,255,255,0.05)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.2s ease",
        padding: 0,
        color: "white",
        fontFamily: FONT,
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.background = "rgba(255,255,255,0.09)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      <div
        style={{
          height: 140,
          background: gradient,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={64} color="rgba(255,255,255,0.06)" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={36} color={selected ? YELLOW : "rgba(255,255,255,0.6)"} />
        </div>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "white", marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{sub}</div>
      </div>
    </button>
  );
}

function Step2({
  seg,
  profiles,
  profile,
  setProfile,
  onBack,
  onNext,
}: {
  seg: Seg;
  profiles: Profile[];
  profile: string;
  setProfile: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="sim-step" key="s2">
      <StepHeader
        title={seg === "negocio" ? "Que tipo de espaço é?" : "Como é a sua casa?"}
        hint={
          seg === "negocio"
            ? "Selecione o perfil do seu espaço de negócio."
            : "Selecione o perfil que melhor descreve a sua habitação."
        }
      />
      <div
        className="sim-grid-2x2"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
      >
        {profiles.map((p) => {
          const sel = profile === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfile(p.id)}
              style={{
                textAlign: "left",
                borderRadius: 16,
                border: sel ? `2px solid ${YELLOW}` : "1px solid rgba(255,255,255,0.10)",
                background: sel ? "rgba(26,92,58,0.25)" : "rgba(255,255,255,0.05)",
                cursor: "pointer",
                overflow: "hidden",
                transition: "all 0.2s ease",
                padding: 0,
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => {
                if (!sel) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
                }
              }}
              onMouseLeave={(e) => {
                if (!sel) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                }
              }}
            >
              <div style={{ height: 6, width: "100%", background: p.color, opacity: sel ? 1 : 0.4 }} />
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <p.Icon size={18} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "white" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{p.sub}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <NavRow>
        <BackBtn onClick={onBack} />
        <ContinueBtn disabled={!profile} onClick={onNext}>
          Continuar
        </ContinueBtn>
      </NavRow>
    </div>
  );
}

function Step3({
  seg,
  fatura,
  setFatura,
  hasRoof,
  setHasRoof,
  previewSavings,
  hasProfile,
  onBack,
  onNext,
}: {
  seg: Seg;
  fatura: number;
  setFatura: (n: number) => void;
  hasRoof: boolean;
  setHasRoof: (b: boolean) => void;
  previewSavings: number;
  hasProfile: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  const pct = ((fatura - 2000) / (40000 - 2000)) * 100;
  return (
    <div className="sim-step" key="s3">
      <StepHeader
        title="Quanto paga de luz por mês?"
        hint="Mexa o slider para ver a poupança em tempo real."
      />

      <div
        style={{
          background: "rgba(245,200,66,0.08)",
          border: "1px solid rgba(245,200,66,0.15)",
          borderRadius: 14,
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 12, color: "#ffffff" }}>Poupança estimada / mês</span>
        <span style={{ color: YELLOW, fontWeight: 700, fontSize: 24 }}>
          {hasProfile ? `${fmt(previewSavings)} CVE` : "—"}
        </span>
      </div>

      <input
        type="range"
        min={2000}
        max={40000}
        step={500}
        value={fatura}
        onChange={(e) => setFatura(Number(e.target.value))}
        className="sim-slider"
        style={{
          marginBottom: 12,
          backgroundSize: `${pct}% 100%`,
        }}
      />
      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: 400, fontSize: 28, color: "white" }}>{fmt(fatura)} CVE</div>
        <div style={{ fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>por mês</div>
      </div>

      {seg === "casa" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "14px 16px",
            marginTop: 16,
            cursor: "pointer",
          }}
          onClick={() => setHasRoof(!hasRoof)}
        >
          <div
            style={{
              width: 42,
              height: 24,
              borderRadius: 50,
              background: hasRoof ? GREEN : "rgba(255,255,255,0.15)",
              position: "relative",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: hasRoof ? 21 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "white",
                transition: "left 0.2s",
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
            {hasRoof ? "Tenho telhado ou terraço próprio" : "Não tenho telhado próprio (arrendatário)"}
          </span>
        </div>
      )}

      <NavRow>
        <BackBtn onClick={onBack} />
        <ContinueBtn onClick={onNext}>Ver a minha estimativa</ContinueBtn>
      </NavRow>
    </div>
  );
}

function Step4({
  currentPkg,
  savings,
  annual,
  payback,
  otherOptions,
  showOthers,
  setShowOthers,
  setPkgOverride,
  onBack,
  onNext,
}: {
  currentPkg: PkgKey;
  savings: number;
  annual: number;
  payback: string;
  otherOptions: PkgKey[];
  showOthers: boolean;
  setShowOthers: (b: boolean) => void;
  setPkgOverride: (k: PkgKey) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const pkg = PACKAGES[currentPkg];
  const benefits = BENEFITS[currentPkg];

  return (
    <div className="sim-step" key="s4">
      <StepHeader title="A sua estimativa" hint="Resultados com base nos seus dados." />

      <div
        className="sim-grid-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
      >
        <Metric label="POUPANÇA / MÊS" value={`${fmt(savings)}`} unit="CVE" />
        <Metric label="POUPANÇA / ANO" value={`${fmt(annual)}`} unit="CVE" />
        <Metric label="PAYBACK ESTIMADO" value={payback} unit="anos" />
      </div>

      <div
        style={{
          borderRadius: 18,
          border: "1px solid rgba(245,200,66,0.20)",
          background: "rgba(245,200,66,0.06)",
          padding: 20,
          marginTop: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "white" }}>{pkg.name}</div>
          <span
            style={{
              fontSize: 12,
              color: YELLOW,
              fontWeight: 600,
              background: "rgba(245,200,66,0.10)",
              border: "1px solid rgba(245,200,66,0.20)",
              borderRadius: 50,
              padding: "4px 14px",
              whiteSpace: "nowrap",
            }}
          >
            {pkg.priceStr}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
            margin: "10px 0 14px",
            lineHeight: 1.5,
          }}
        >
          {pkg.promise}
        </div>
        <div
          className="sim-grid-3"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
        >
          {benefits.map((b, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: b.bg,
              }}
            >
              <b.Icon size={22} color={b.color} />
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500, lineHeight: 1.4 }}>
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {otherOptions.length > 0 && (
        <div>
          <span
            onClick={() => setShowOthers(!showOthers)}
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.30)",
              textDecoration: "underline",
              cursor: "pointer",
              marginTop: 12,
              display: "inline-block",
            }}
          >
            {showOthers ? "Ocultar outras opções" : "Ver outras opções »"}
          </span>
          {showOthers && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {otherOptions.map((k) => (
                <div
                  key={k}
                  onClick={() => setPkgOverride(k)}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>
                    {PACKAGES[k].name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.40)", fontStyle: "italic" }}>
                    {PACKAGES[k].promise}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 10 }}>
        Estimativa indicativa. O estudo personalizado é gratuito e sem compromisso.
      </div>

      <NavRow>
        <BackBtn onClick={onBack} />
        <YellowBtn onClick={onNext}>Continuar</YellowBtn>
      </NavRow>
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14 }}>
      <div
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 20, color: "white", marginTop: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{unit}</div>
    </div>
  );
}

function Step5({
  currentPkg,
  nome,
  setNome,
  tel,
  setTel,
  island,
  setIsland,
  errors,
  onBack,
  onSubmit,
}: {
  currentPkg: PkgKey;
  nome: string;
  setNome: (s: string) => void;
  tel: string;
  setTel: (s: string) => void;
  island: string;
  setIsland: (s: string) => void;
  errors: { nome?: boolean; tel?: boolean };
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="sim-step" key="s5">
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(26,92,58,0.30)",
          border: "1px solid rgba(26,92,58,0.50)",
          borderRadius: 50,
          padding: "6px 16px",
          marginBottom: 16,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: YELLOW, display: "inline-block" }} />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.70)" }}>{PACKAGES[currentPkg].name}</span>
      </div>

      <StepHeader title="Os seus dados" />

      <Field label="Nome">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="O seu nome"
          style={inputStyle(errors.nome)}
          onFocus={(e) => (e.currentTarget.style.borderColor = YELLOW)}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errors.nome
              ? "rgba(239,68,68,0.6)"
              : "rgba(255,255,255,0.12)")
          }
        />
      </Field>

      <Field label="Telemóvel (WhatsApp)">
        <input
          type="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          placeholder="+238 ···"
          style={inputStyle(errors.tel)}
          onFocus={(e) => (e.currentTarget.style.borderColor = YELLOW)}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errors.tel
              ? "rgba(239,68,68,0.6)"
              : "rgba(255,255,255,0.12)")
          }
        />
      </Field>

      <Field label="Ilha">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ISLANDS.map((i) => {
            const sel = island === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIsland(i)}
                style={{
                  border: sel ? `1px solid ${YELLOW}` : "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  padding: "7px 16px",
                  fontSize: 12,
                  fontFamily: FONT,
                  color: sel ? YELLOW : "rgba(255,255,255,0.50)",
                  background: sel ? "rgba(245,200,66,0.08)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {i}
              </button>
            );
          })}
        </div>
      </Field>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
        <ShieldCheck size={14} color="#4CAF82" />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", textAlign: "center" }}>
          Os seus dados são usados apenas para agendar o estudo. Nunca partilhados.
        </span>
      </div>

      <NavRow>
        <BackBtn onClick={onBack} />
        <PillButton
          variant="primary"
          size="md"
          onClick={onSubmit}
          className="w-1/2 font-display uppercase tracking-wide"
        >
          <LigarCaboLabel tone="dark" />
        </PillButton>
      </NavRow>
    </div>
  );
}

function inputStyle(error?: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12,
    padding: "13px 16px",
    color: "white",
    fontSize: 14,
    fontFamily: FONT,
    outline: "none",
    transition: "border-color 0.15s",
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.40)",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Step6({
  nome,
  tel,
  island,
  currentPkg,
  savings,
}: {
  nome: string;
  tel: string;
  island: string;
  currentPkg: PkgKey;
  savings: number;
}) {
  const rows: [string, string][] = [
    ["Nome", nome],
    ["Pacote recomendado", PACKAGES[currentPkg].name],
    ["Poupança estimada", `${fmt(savings)} CVE / mês`],
    ...((island ? [["Ilha", island]] : []) as [string, string][]),
    ["Telemóvel", tel],
  ];
  return (
    <div className="sim-step" key="s6" style={{ textAlign: "center" }}>
      <div
        style={{
          width: 64,
          height: 64,
          border: `2px solid ${YELLOW}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Check size={28} color={YELLOW} />
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 24, color: "white", margin: "0 0 10px" }}>Cabo Ligado.</h3>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 14,
          lineHeight: 1.7,
          maxWidth: 400,
          margin: "0 auto 24px",
        }}
      >
        O seu pedido foi recebido. Kevin da Cabo Energia contacta-o em até 24 horas, para
        confirmar a estimativa e agendar o levantamento (visita técnica).
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 14,
          padding: "14px 18px",
          maxWidth: 380,
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {rows.map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
              gap: 12,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{label}</span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 13 }}>{value}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", marginTop: 16 }}>
        Guarde o número +238 995 41 81 para reconhecer a chamada de Kevin.
      </p>
    </div>
  );
}

/* ----------------------------- SHARED PIECES ------------------------------- */

function StepHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#ffffff", margin: "0 0 28px" }}>{hint}</p>
    </>
  );
}

function NavRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="sim-nav"
      style={{
        position: "relative",
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
      }}
    >
      {children}
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        color: "rgba(255,255,255,0.35)",
        fontSize: 13,
        fontFamily: FONT,
        display: "flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        padding: 0,
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
    >
      <ArrowLeft size={14} />
      Voltar
    </button>
  );
}

function ContinueBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "50%",
        background: GREEN,
        color: "white",
        borderRadius: 50,
        padding: "13px 28px",
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 14,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#154d30";
        e.currentTarget.style.transform = "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = GREEN;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}

function YellowBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "50%",
        background: YELLOW,
        color: DARK,
        borderRadius: 50,
        padding: "14px 32px",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.05em",
        border: "none",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.92";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}
