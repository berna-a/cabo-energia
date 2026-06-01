import { MessageCircle, ClipboardList } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import { useLeadPanel } from "@/components/brand/useLeadPanel";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";

export function FinalCTA() {
  const { openLeadPanel } = useLeadPanel();

  return (
    <section
      style={{
        fontFamily: FONT,
        background: "linear-gradient(135deg, #1A5C3A 0%, #0D2B1F 100%)",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          A sua casa ou negócio não pode
          <br />
          parar por falta de luz.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            margin: "0 0 36px",
          }}
        >
          Peça já o seu Estudo de Poupança — gratuito e sem compromisso.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: "#25D366",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: FONT,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button
            onClick={() => openLeadPanel({ source: "final_cta_form" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: "transparent",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: FONT,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)")
            }
          >
            <ClipboardList size={18} />
            Formulário Online
          </button>
        </div>
      </div>
    </section>
  );
}
