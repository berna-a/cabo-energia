import { useTranslation } from 'react-i18next';
import { CATALOG } from '@/lib/catalog';
import { useCommercialCopy } from '@/lib/commercialCopy';
import { useLeadPanel } from '@/components/brand/useLeadPanel';
import { useAudienceTab, setAudienceTab, type AudienceTab } from './audienceTab';

export function SolucoesSection({ showToggle = true, audience }: { showToggle?: boolean; audience?: AudienceTab } = {}) {
  const c = useCommercialCopy();
  const { t } = useTranslation();
  const globalTab = useAudienceTab();
  const tab = audience ?? globalTab;
  const { openLeadPanel } = useLeadPanel();
  const kits = CATALOG.filter(k => k.family === (tab === 'residencial' ? 'casa' : 'negocio'));
  return <section id="solucoes" className="px-5 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">{t('solucoes.title')}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-white/75">{c.catalogNote}</p>
      {showToggle && <div className="my-8 flex justify-center gap-2">{(['residencial','negocio'] as const).map(value =>
        <button key={value} onClick={() => setAudienceTab(value)} aria-pressed={value === tab} className={`rounded-full px-5 py-3 text-sm font-semibold ${value === tab ? 'bg-brand-yellow text-brand-green-deep' : 'bg-white/10 text-white'}`}>{value === 'residencial' ? c.household : c.business}</button>)}</div>}
      <div className={`mt-10 grid gap-5 ${kits.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {kits.map((kit,i) => <article key={kit.id} className="flex flex-col rounded-2xl bg-white p-7 text-brand-green-deep">
          <span className="text-sm font-semibold text-brand-green">0{i+1} / {c.quote}</span>
          <h3 className="my-5 text-2xl font-bold">{kit.name}</h3>
          <p className="mb-5 text-ink-soft">{t(`simulador.promises.${kit.id}`)}</p>
          <dl className="mb-8 space-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b pb-3"><dt>{c.panels}</dt><dd className="font-semibold">{kit.panels} × {kit.panelWp} Wp</dd></div>
            <div className="flex justify-between gap-3 border-b pb-3"><dt>{c.inverter}</dt><dd className="font-semibold">{kit.inverterKw} kW</dd></div>
            <div className="flex justify-between gap-3 border-b pb-3"><dt>{c.battery}</dt><dd className="font-semibold">{kit.batteryKwh} kWh</dd></div>
          </dl>
          <button className="mt-auto rounded-full bg-brand-green px-6 py-3 font-semibold text-white" onClick={() => openLeadPanel({clientType:tab === 'residencial' ? 'residencial' : 'empresarial', source:`catalogo_${kit.id}`})}>{c.cta}</button>
        </article>)}
      </div>
    </div>
  </section>;
}
export default SolucoesSection;
