import { Warehouse, Clock, Key, ShieldCheck } from "lucide-react";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const YELLOW = "#F5C842";

const badges = [
  { icon: <Warehouse size={20} />, label: "Stock local em Praia" },
  { icon: <Clock size={20} />, label: "Contacto em 24h" },
  { icon: <Key size={20} />, label: "Instalação Chave-na-Mão" },
  { icon: <ShieldCheck size={20} />, label: "Garantia Suntech" },
];

export function TrustBadges() {
  return (
    <div
      style={{
        fontFamily: FONT,
        background: DARK,
        padding: "20px 0",
      }}
    >
      <div
        className="site-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {badges.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(245,200,66,0.25)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: YELLOW }}>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
