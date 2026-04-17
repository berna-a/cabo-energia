import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { PillButton } from "./PillButton";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Indique o seu nome completo." })
    .max(120, { message: "Nome demasiado longo." }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Indique um telemóvel válido." })
    .max(30, { message: "Telemóvel demasiado longo." })
    .regex(/^[+\d\s().-]+$/, { message: "Use apenas números e símbolos válidos." }),
  client_type: z.enum(["residencial", "empresarial"]).refine((v) => !!v, {
    message: "Selecione o tipo de cliente.",
  }),
});

type FormValues = z.infer<typeof schema>;

interface LeadFormProps {
  defaultClientType?: "residencial" | "empresarial";
  source?: string;
}

export function LeadForm({ defaultClientType, source = "website_homepage" }: LeadFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { client_type: defaultClientType },
  });

  const clientType = watch("client_type");

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      if (!isSupabaseConfigured() || !supabase) {
        // Permite testar a UI sem credenciais. Marcar como sucesso visual.
        // eslint-disable-next-line no-console
        console.warn("[LeadForm] Supabase não configurado — submissão simulada.", { ...values, source });
        setSubmitted(true);
        return;
      }

      const { error } = await supabase.from("leads").insert({
        name: values.name,
        phone: values.phone,
        client_type: values.client_type,
        source,
        status: "new_lead",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[LeadForm] erro ao submeter:", err);
      setSubmitError(
        "Não conseguimos enviar o pedido agora. Tente novamente ou contacte-nos por WhatsApp."
      );
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start gap-5">
        <div className="flex size-14 items-center justify-center rounded-pill bg-brand-green/10 text-brand-green">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="text-headline text-ink">Pedido recebido.</h3>
        <p className="text-body-lg text-ink-soft">
          Recebemos o seu pedido. Vamos contactá-lo em até 24 horas.
        </p>
        <p className="text-sm text-ink-muted">
          Pode fechar este painel quando quiser.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Field label="Nome completo" error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          autoComplete="name"
          placeholder="O seu nome"
          className={inputClass}
        />
      </Field>

      <Field label="Telemóvel" error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+238 ..."
          className={inputClass}
        />
      </Field>

      <Field label="Tipo de cliente" error={errors.client_type?.message}>
        <div className="grid grid-cols-2 gap-2">
          <ClientToggle
            label="Residencial"
            active={clientType === "residencial"}
            onClick={() =>
              setValue("client_type", "residencial", { shouldValidate: true })
            }
          />
          <ClientToggle
            label="Empresarial"
            active={clientType === "empresarial"}
            onClick={() =>
              setValue("client_type", "empresarial", { shouldValidate: true })
            }
          />
        </div>
      </Field>

      {submitError && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {submitError}
        </p>
      )}

      <PillButton
        type="submit"
        size="lg"
        variant="primary"
        disabled={isSubmitting}
        className="mt-2 w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> A enviar...
          </>
        ) : (
          "Enviar pedido"
        )}
      </PillButton>

      <p className="text-xs text-ink-muted">
        Ao enviar, aceita ser contactado pela CABO ENERGIA. Não partilhamos os
        seus dados.
      </p>
    </form>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/10";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ClientToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 rounded-pill border text-sm font-semibold transition-all",
        active
          ? "border-brand-green bg-brand-green text-white shadow-[0_8px_24px_-12px_hsl(var(--brand-green)/0.5)]"
          : "border-border bg-white text-ink hover:border-brand-green/40 hover:text-brand-green"
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
