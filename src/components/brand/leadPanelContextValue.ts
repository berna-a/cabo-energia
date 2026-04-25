import * as React from "react";

export type ClientType = "residencial" | "empresarial" | undefined;

export interface LeadPanelContextValue {
  openLeadPanel: (defaults?: { clientType?: ClientType; source?: string }) => void;
  closeLeadPanel: () => void;
}

export const LeadPanelContext = React.createContext<LeadPanelContextValue | null>(null);
