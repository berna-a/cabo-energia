// One source for website, assessment and proposals. Historic technical configurations;
// final equipment, availability and prices require a site survey and Kevin's approval.
export const CATALOG_VERSION = '2026-09-16';
export const CATALOG = [
  { id: 'tranquila', name: 'Casa Autonomia', family: 'casa', panels: 6, panelWp: 585, inverterKw: 5, batteryKwh: 5, productionMonth: 447 },
  { id: 'autonomia', name: 'Casa Família', family: 'casa', panels: 12, panelWp: 585, inverterKw: 10, batteryKwh: 10, productionMonth: 894 },
  { id: 'plena', name: 'Casa Prestige', family: 'casa', panels: 24, panelWp: 585, inverterKw: 15, batteryKwh: 15, productionMonth: 1788 },
  { id: 'essencial', name: 'Negócio Essencial', family: 'negocio', panels: 24, panelWp: 585, inverterKw: 15, batteryKwh: 15, productionMonth: 1788 },
  { id: 'pleno', name: 'Negócio Corporativo', family: 'negocio', panels: 48, panelWp: 585, inverterKw: 30, batteryKwh: 30, productionMonth: 3579 },
] as const;
export type Kit = typeof CATALOG[number];
export type KitId = Kit['id'];
export function estimateSavings(kit: Kit, bill: number, tariff: number, selfConsumption: number) {
  if (![bill, tariff, selfConsumption].every(Number.isFinite) || bill <= 0 || tariff <= 0 || selfConsumption < 0 || selfConsumption > 1) return { low: 0, high: 0 };
  // ±20% production scenario, capped below total bill to retain fixed charges.
  // This is a sensitivity scenario, not a measured yield or guaranteed saving.
  const value = kit.productionMonth * selfConsumption * tariff;
  return { low: Math.round(Math.min(bill * .8, value * .8)), high: Math.round(Math.min(bill * .8, value * 1.2)) };
}
export function recommendKit(family: Kit['family'], bill: number) {
  const options = CATALOG.filter(k => k.family === family);
  return family === 'casa' ? options[bill > 25000 ? 2 : bill > 10000 ? 1 : 0] : options[bill > 60000 ? 1 : 0];
}
