import * as React from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadPanelContext, type ClientType } from "./leadPanelContextValue";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { WHATSAPP_URL } from "@/lib/constants";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";

const ILHAS = [
  "Santiago",
  "São Vicente",
  "Santo Antão",
  "Fogo",
  "Sal",
  "Boa Vista",
  "Maio",
  "Brava",
  "São Nicolau",
] as const;

const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "leadPanel.validName")
    .max(100, "leadPanel.validMax"),
  telemovel: z
    .string()
    .trim()
    .min(7, "leadPanel.validPhone")
    .max(20, "leadPanel.validPhone")
    .regex(/^[0-9 +()\-]+$/, "leadPanel.validPhoneChars"),
  ilha: z
    .string()
    .refine((v) => (ILHAS as readonly string[]).includes(v), {
      message: "leadPanel.validIsland",
    }),
  tipo: z.enum(["residencial", "negocio"]),
});

type FormState = {
  nome: string;
  telemovel: string;
  ilha: (typeof ILHAS)[number] | "";
  tipo: "residencial" | "negocio";
};

function LeadModalForm({
  defaultClientType,
  source,
  onSubmitted,
}: {
  defaultClientType: ClientType;
  source?: string;
  onSubmitted: () => void;
}) {
  const { t } = useTranslation();
  const [form, setForm] = React.useState<FormState>({
    nome: "",
    telemovel: "",
    ilha: "",
    tipo: defaultClientType === "empresarial" ? "negocio" : "residencial",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key && !next[key]) next[key] = t(issue.message);
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitFailed(false);
    setSubmitting(true);

    const payload = {
      name: form.nome.trim(),
      phone: form.telemovel.trim(),
      client_type: form.tipo === "negocio" ? "empresarial" : "residencial",
      source: source || "website_lead_panel",
      status: "new_lead",
      ilha: form.ilha,
    };

    // Lead capturada se a BD gravar OU se o email for enviado (rede de segurança).
    let supabaseOk = false;
    let emailOk = false;
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from("leads").insert(payload as never);
        supabaseOk = !error;
        if (error) console.error("[LeadPanel] supabase error:", error);
      }
    } catch (err) {
      console.error("[LeadPanel] insert failed:", err);
    }
    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      emailOk = res.ok && data.emailed === true;
    } catch (err) {
      console.error("[LeadPanel] notify failed:", err);
    }

    setSubmitting(false);
    if (supabaseOk || emailOk) {
      onSubmitted();
    } else {
      setSubmitFailed(true);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "#f8fafc",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: "12px 14px",
    fontFamily: FONT,
    fontSize: 14,
    color: DARK,
    width: "100%",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    color: DARK,
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label style={labelStyle} htmlFor="lead-nome">
          {t("leadPanel.name")}
        </label>
        <input
          id="lead-nome"
          type="text"
          autoComplete="name"
          maxLength={100}
          style={inputStyle}
          value={form.nome}
          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
        />
        {errors.nome && (
          <p style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{errors.nome}</p>
        )}
      </div>

      <div>
        <label style={labelStyle} htmlFor="lead-telemovel">
          {t("leadPanel.phone")}
        </label>
        <input
          id="lead-telemovel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          style={inputStyle}
          value={form.telemovel}
          onChange={(e) => setForm((f) => ({ ...f, telemovel: e.target.value }))}
        />
        {errors.telemovel && (
          <p style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{errors.telemovel}</p>
        )}
      </div>

      <div>
        <label style={labelStyle} htmlFor="lead-ilha">
          {t("leadPanel.island")}
        </label>
        <select
          id="lead-ilha"
          style={inputStyle}
          value={form.ilha}
          onChange={(e) =>
            setForm((f) => ({ ...f, ilha: e.target.value as FormState["ilha"] }))
          }
        >
          <option value="">{t("leadPanel.islandPlaceholder")}</option>
          {ILHAS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {errors.ilha && (
          <p style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{errors.ilha}</p>
        )}
      </div>

      <div>
        <span style={labelStyle}>{t("leadPanel.solutionType")}</span>
        <div
          className="inline-flex w-full rounded-full p-1"
          style={{ background: "rgba(13,43,31,0.06)" }}
          role="tablist"
        >
          {(["residencial", "negocio"] as const).map((tipo) => {
            const active = form.tipo === tipo;
            return (
              <button
                key={tipo}
                type="button"
                onClick={() => setForm((f) => ({ ...f, tipo }))}
                className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  background: active ? DARK : "transparent",
                  color: active ? "#ffffff" : DARK,
                }}
              >
                {tipo === "residencial" ? t("leadPanel.residential") : t("leadPanel.business")}
              </button>
            );
          })}
        </div>
      </div>

      {submitFailed && (
        <div
          style={{
            borderRadius: 10,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.30)",
            padding: "12px 14px",
            fontSize: 13,
            color: DARK,
            lineHeight: 1.5,
          }}
        >
          {t("leadPanel.error")}{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ color: "#1A5C3A", fontWeight: 700 }}>
            WhatsApp
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: DARK, color: "#ffffff", fontFamily: FONT }}
      >
        {submitting ? t("leadPanel.submitting") : t("leadPanel.submit")}
      </button>
    </form>
  );
}

function SuccessMessage() {
  const { t } = useTranslation();
  return (
    <div className="py-6 text-center">
      <div
        className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "rgba(13,43,31,0.08)", color: DARK, fontSize: 22 }}
      >
        ✓
      </div>
      <h3
        style={{
          color: DARK,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {t("leadPanel.successTitle")}
      </h3>
      <p
        className="mx-auto mt-3 max-w-sm"
        style={{ color: MUTED, fontSize: 14, lineHeight: 1.55 }}
      >
        {t("leadPanel.successBody")}
      </p>
    </div>
  );
}

export function LeadPanelProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [defaultClientType, setDefaultClientType] = React.useState<ClientType>(undefined);
  const [defaultSource, setDefaultSource] = React.useState<string | undefined>(undefined);

  const openLeadPanel = React.useCallback(
    (defaults?: { clientType?: ClientType; source?: string }) => {
      setDefaultClientType(defaults?.clientType);
      setDefaultSource(defaults?.source);
      setSubmitted(false);
      setOpen(true);
    },
    []
  );

  const closeLeadPanel = React.useCallback(() => setOpen(false), []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Reset state shortly after closing transition.
      setTimeout(() => setSubmitted(false), 250);
    }
  };

  return (
    <LeadPanelContext.Provider value={{ openLeadPanel, closeLeadPanel }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="sm:max-w-md rounded-3xl border-0 p-0 [&>button]:hidden"
          style={{
            background: "#ffffff",
            boxShadow: "0 30px 80px -20px rgba(13,43,31,0.35)",
            fontFamily: FONT,
          }}
        >
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
            style={{ color: DARK }}
          >
            <X size={18} />
          </button>

          <div className="p-7 sm:p-8">
            {!submitted ? (
              <>
                <DialogTitle
                  style={{
                    color: DARK,
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {t("leadPanel.title")}
                </DialogTitle>
                <DialogDescription
                  className="mt-2"
                  style={{ color: MUTED, fontSize: 13, lineHeight: 1.55 }}
                >
                  {t("leadPanel.subtitle")}
                </DialogDescription>

                <div className="mt-6">
                  <LeadModalForm
                    defaultClientType={defaultClientType}
                    source={defaultSource}
                    onSubmitted={() => setSubmitted(true)}
                  />
                </div>
              </>
            ) : (
              <>
                <DialogTitle className="sr-only">{t("leadPanel.successSr")}</DialogTitle>
                <DialogDescription className="sr-only">
                  {t("leadPanel.successBody")}
                </DialogDescription>
                <SuccessMessage />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </LeadPanelContext.Provider>
  );
}

export { useLeadPanel } from "./useLeadPanel";
