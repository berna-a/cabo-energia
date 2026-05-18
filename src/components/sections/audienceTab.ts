import { useSyncExternalStore } from "react";

export type AudienceTab = "residencial" | "negocio";

let current: AudienceTab = "residencial";
const listeners = new Set<() => void>();

export function setAudienceTab(tab: AudienceTab) {
  if (tab === current) return;
  current = tab;
  listeners.forEach((l) => l());
}

export function useAudienceTab(): AudienceTab {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => current
  );
}
