import { useTranslation } from 'react-i18next';
import { CATALOG, type Kit } from '@/lib/catalog';
import { useCommercialCopy } from '@/lib/commercialCopy';
import { useLeadPanel } from '@/components/brand/useLeadPanel';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useAudienceTab, setAudienceTab, type AudienceTab } from './audienceTab';
import imgTranquila from '@/assets/pacotes/tranquila.webp';
import imgAutonomia from '@/assets/pacotes/autonomia.webp';
import imgPlena from '@/assets/pacotes/plena.webp';
import imgEssencial from '@/assets/pacotes/essencial.webp';
import imgPleno from '@/assets/pacotes/pleno.webp';

const KIT_IMAGES: Record<Kit['id'], string> = {
  tranquila: imgTranquila,
  autonomia: imgAutonomia,
  plena: imgPlena,
  essencial: imgEssencial,
  pleno: imgPleno,
};

function PacoteCard({ kit, index, onCta }: { kit: Kit; index: number; onCta: () => void }) {
  const c = useCommercialCopy();
  const { t } = useTranslation();
  const ref = useRevealOnScroll<HTMLDivElement>(0.1);
  const specs = [
    `${kit.panels} ${c.panels} · ${kit.panelWp} Wp`,
    `${c.inverter} ${kit.inverterKw} kW`,
    `${c.battery} ${kit.batteryKwh} kWh`,
  ];
  // O reveal fica num invólucro: a sua transição (opacidade e posição, com atraso em cascata) não pode colidir com a sombra do hover do cartão.
  return <div ref={ref} style={{ transitionDelay: `${index * 90}ms` }} className="reveal flex">
  <article className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white text-brand-green-deep shadow-[0_18px_40px_-28px_rgba(0,0,0,0.6)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.75)]">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={KIT_IMAGES[kit.id]} alt={kit.name} loading="lazy" decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-green-deep backdrop-blur-sm">0{index + 1}</span>
      <span className="absolute right-4 top-4 rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-brand-green-deep">{c.quote}</span>
      <span className="absolute bottom-2 right-4 text-[10px] text-white/70">{c.illustrative}</span>
    </div>
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <h3 className="text-2xl font-bold">{kit.name}</h3>
      <p className="mt-2 text-ink-soft">{t(`simulador.promises.${kit.id}`)}</p>
      <ul className="mb-7 mt-5 flex flex-wrap gap-2 text-sm">
        {specs.map(s => <li key={s} className="rounded-full bg-brand-green/10 px-3 py-1.5 font-semibold text-brand-green-deep transition-colors duration-300 group-hover:bg-brand-yellow/30">{s}</li>)}
      </ul>
      <button className="mt-auto rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-brand-yellow hover:text-brand-green-deep" onClick={onCta}>{c.cta}</button>
    </div>
  </article>
  </div>;
}

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
      {showToggle && <div className="my-8 flex justify-center gap-2">{(['residencial','negocio'] as const).map(value =>
        <button key={value} onClick={() => setAudienceTab(value)} aria-pressed={value === tab} className={`rounded-full px-5 py-3 text-sm font-semibold ${value === tab ? 'bg-brand-yellow text-brand-green-deep' : 'bg-white/10 text-white'}`}>{value === 'residencial' ? c.household : c.business}</button>)}</div>}
      <div className={`mt-10 grid gap-5 ${kits.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {kits.map((kit, i) => <PacoteCard key={kit.id} kit={kit} index={i}
          onCta={() => openLeadPanel({clientType:tab === 'residencial' ? 'residencial' : 'empresarial', source:`catalogo_${kit.id}`})} />)}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/60">{c.catalogNote}</p>
    </div>
  </section>;
}
export default SolucoesSection;
