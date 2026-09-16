import { useCommercialCopy } from '@/lib/commercialCopy';
import { WHATSAPP_URL } from '@/lib/constants';
export function TrustAndFaqSection() {
  const c = useCommercialCopy();
  return <section className="site-container py-16 md:py-24" id="protecao">
    <div className="grid gap-10 md:grid-cols-2">
      <div id="rede" className="rounded-3xl bg-brand-green-deep p-7 text-white md:p-10">
        <p className="text-sm uppercase tracking-widest text-brand-yellow">Cabo Energia · Kevin</p>
        <h2 className="mt-5 text-3xl font-semibold leading-tight">{c.supportTitle}</h2>
        <p className="mt-5 leading-relaxed text-white/80">{c.supportBody}</p>
        <div className="mt-8 flex flex-col items-start gap-4">
          <a href={`${WHATSAPP_URL}?text=${encodeURIComponent('Olá Kevin, gostaria de avaliar uma solução Cabo Energia.')}`} target="_blank" rel="noreferrer" className="rounded-full bg-brand-yellow px-6 py-3 font-semibold text-brand-green-deep">{c.whatsapp}</a>
          <a href="tel:+2389954181" className="underline underline-offset-4">{c.phone}</a>
        </div>
      </div>
      <div><h2 className="mb-6 text-3xl font-semibold text-brand-green-deep">{c.faqTitle}</h2>
        {c.faqs.map(([q,a]) => <details key={q} className="border-b border-brand-green/15 py-4"><summary className="cursor-pointer font-semibold text-brand-green-deep">{q}</summary><p className="pt-3 leading-relaxed text-ink-soft">{a}</p></details>)}
      </div>
    </div>
  </section>;
}
