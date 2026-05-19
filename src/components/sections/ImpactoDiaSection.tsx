import {
  Refrigerator,
  Wifi,
  Sun,
  Store,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useAudienceTab } from "./audienceTab";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";

type Item = { icon: LucideIcon; title: string; copy: string };

const residencial: Item[] = [
  {
    icon: Refrigerator,
    title: "Não pare de cozinhar.",
    copy: "Frigorífico e arca vertical sempre ligados. Zero desperdício de alimentos.",
  },
  {
    icon: Wifi,
    title: "Não pare de produzir.",
    copy: "Wi-Fi ativo, computadores carregados e iluminação para trabalhar ou estudar.",
  },
  {
    icon: Sun,
    title: "Ar condicionado sem culpa.",
    copy: "Use a climatização nas horas de maior calor sabendo que é o sol que paga a conta.",
  },
];

const negocio: Item[] = [
  {
    icon: Store,
    title: "Portas abertas sempre.",
    copy: "Continue a receber clientes, faturar e processar pagamentos enquanto a concorrência fecha.",
  },
  {
    icon: ShieldCheck,
    title: "Zero quebras de stock.",
    copy: "Sistemas de frio, servidores e equipamentos críticos 100% protegidos contra picos e apagões.",
  },
];

export function ImpactoDiaSection() {
  const tab = useAudienceTab();
  const items = tab === "residencial" ? residencial : negocio;
  const cols = tab === "residencial" ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "transparent", fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10">
          <h2
            style={{
              color: "#ffffff",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            O impacto no seu dia a dia
          </h2>
        </div>

        <div
          key={tab}
          className={`grid grid-cols-1 gap-6 ${cols}`}
          style={{ animation: "fadeUp 300ms ease both" }}
        >
          {items.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(13,43,31,0.06)", color: "#1A5C3A", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3
                className="mt-6"
                style={{
                  color: "#0D2B1F",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2vw, 26px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                className="mt-3"
                style={{ color: "rgba(13,43,31,0.65)", fontSize: 14, lineHeight: 1.55, margin: 0 }}
              >
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default ImpactoDiaSection;
