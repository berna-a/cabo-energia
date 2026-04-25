import * as React from "react";
import { SlideOverPanel } from "./SlideOverPanel";
import { LeadForm } from "./LeadForm";

type ClientType = "residencial" | "empresarial" | undefined;

interface LeadPanelContextValue {
  openLeadPanel: (defaults?: { clientType?: ClientType; source?: string }) => void;
  closeLeadPanel: () => void;
}

const LeadPanelContext = React.createContext<LeadPanelContextValue | null>(null);

export function LeadPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [defaultClientType, setDefaultClientType] = React.useState<ClientType>(undefined);
  const [source, setSource] = React.useState<string>("website_homepage");

  const openLeadPanel = React.useCallback(
    (defaults?: { clientType?: ClientType; source?: string }) => {
      setDefaultClientType(defaults?.clientType);
      setSource(defaults?.source ?? "website_homepage");
      setOpen(true);
    },
    []
  );

  const closeLeadPanel = React.useCallback(() => setOpen(false), []);

  return (
    <LeadPanelContext.Provider value={{ openLeadPanel, closeLeadPanel }}>
      {children}
      <SlideOverPanel
        open={open}
        onOpenChange={setOpen}
        title="Ligar Cabo"
        description="Preencha os seus dados. Contactamos em até 24 horas — sem compromisso."
      >
        <LeadForm defaultClientType={defaultClientType} source={source} />
      </SlideOverPanel>
    </LeadPanelContext.Provider>
  );
}

export function useLeadPanel() {
  const ctx = React.useContext(LeadPanelContext);
  if (!ctx) throw new Error("useLeadPanel deve ser usado dentro de LeadPanelProvider");
  return ctx;
}
