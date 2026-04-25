import * as React from "react";
import { LeadPanelContext } from "./leadPanelContextValue";

export function useLeadPanel() {
  const ctx = React.useContext(LeadPanelContext);
  if (!ctx) throw new Error("useLeadPanel deve ser usado dentro de LeadPanelProvider");
  return ctx;
}
