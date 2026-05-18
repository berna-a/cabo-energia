import * as React from "react";
import { z } from "zod";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadPanelContext, type ClientType } from "./leadPanelContextValue";

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
    .min(2, "Indique o seu nome completo.")
    .max(100, "Máximo 100 caracteres."),
  telemovel: z
    .string()
    .trim()
    .min(7, "Telemóvel inválido.")
    .max(20, "Telemóvel inválido.")
    .regex(/^[0-9 +()\-]+$/, "Use apenas números."),
  ilha: z.enum(ILHAS, { errorMap: () => ({ message: "Selecione a sua ilha." }) }),
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
  onSubmitted,
}: {
  defaultClientType: ClientType;
  onSubmitted: () => void;
}) {
  const [form, setForm] = React.useState<FormState>({
    nome: "",
    telemovel: "",
    ilha: "",
    tipo: defaultClientType === "empresarial" ? "negocio" : "residencial",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate async submit; real backend integration can be wired later.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    onSubmitted();
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
          Nome completo
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
          Telemóvel
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
          Ilha
        </label>
        <select
          id="lead-ilha"
          style={inputStyle}
          value={form.ilha}
          onChange={(e) =>
            setForm((f) => ({ ...f, ilha: e.target.value as FormState["ilha"] }))
          }
        >
          <option value="">Selecione a ilha…</option>
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
        <span style={labelStyle}>Tipo de solução</span>
        <div
          className="inline-flex w-full rounded-full p-1"
          style={{ background: "rgba(13,43,31,0.06)" }}
          role="tablist"
        >
          {(["residencial", "negocio"] as const).map((t) => {
            const active = form.tipo === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, tipo: t }))}
                className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  background: active ? DARK : "transparent",
                  color: active ? "#ffffff" : DARK,
                }}
              >
                {t === "residencial" ? "Residencial" : "Negócio"}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: DARK, color: "#ffffff", fontFamily: FONT }}
      >
        {submitting ? "A enviar…" : "Confirmar Contacto"}
      </button>
    </form>
  );
}

function SuccessMessage() {
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
        Obrigado.
      </h3>
      <p
        className="mx-auto mt-3 max-w-sm"
        style={{ color: MUTED, fontSize: 14, lineHeight: 1.55 }}
      >
        A nossa equipa irá ligar-lhe nas próximas 24 horas. Cabo Verde não pode parar.
      </p>
    </div>
  );
}

export function LeadPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [defaultClientType, setDefaultClientType] = React.useState<ClientType>(undefined);

  const openLeadPanel = React.useCallback(
    (defaults?: { clientType?: ClientType; source?: string }) => {
      setDefaultClientType(defaults?.clientType);
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
                  Ligar Cabo
                </DialogTitle>
                <DialogDescription
                  className="mt-2"
                  style={{ color: MUTED, fontSize: 13, lineHeight: 1.55 }}
                >
                  Deixe os seus dados. Contactamos em menos de 24 horas — sem compromisso.
                </DialogDescription>

                <div className="mt-6">
                  <LeadModalForm
                    defaultClientType={defaultClientType}
                    onSubmitted={() => setSubmitted(true)}
                  />
                </div>
              </>
            ) : (
              <>
                <DialogTitle className="sr-only">Pedido enviado</DialogTitle>
                <DialogDescription className="sr-only">
                  Receberá um contacto em 24 horas.
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
