import { useState } from 'react';
import { useCommercialCopy } from '@/lib/commercialCopy';
import { estimateSavings, recommendKit, type Kit } from '@/lib/catalog';
import { submitLead } from '@/lib/leadClient';
import { validPhone } from '../../../shared/leadValidation';
import { WHATSAPP_URL } from '@/lib/constants';

const ISLANDS = ['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boa Vista','Maio','Brava','São Nicolau'];
const fmt = (n:number) => n.toLocaleString('pt-PT');
const input = 'mt-2 w-full rounded-xl border border-brand-green/25 bg-white px-4 py-3 text-brand-green-deep';
export default function SimuladorSection() {
  const c=useCommercialCopy();
  const [family,setFamily]=useState<Kit['family']>('casa');
  const [bill,setBill]=useState(9000);
  const [tariff,setTariff]=useState(32.2);
  const [selfUse,setSelfUse]=useState(60);
  const [roof,setRoof]=useState(true);
  const [step,setStep]=useState(1);
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [island,setIsland]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const kit=recommendKit(family,bill);
  const savings=estimateSavings(kit,bill,tariff,selfUse/100);
  const valid=Number.isFinite(bill)&&bill>=1000&&bill<=500000&&Number.isFinite(tariff)&&tariff>0&&tariff<=200;
  async function send(e:React.FormEvent) {
    e.preventDefault();
    if(busy)return;
    if(name.trim().length<2||name.trim().length>100||!validPhone(phone)||!ISLANDS.includes(island)){setError(c.error);return;}
    setBusy(true);setError('');
    const stored=await submitLead({nome:name.trim(),telemovel:phone.trim(),tipo:family==='casa'?'residencial':'empresarial',ilha:island,origem:'simulador',camposExtra:[
      {chave:'Pacote de referência',valor:kit.name},{chave:'Factura mensal (CVE)',valor:bill},{chave:'Tarifa de cálculo (CVE/kWh)',valor:tariff},
      {chave:'Autoconsumo (%)',valor:selfUse},{chave:'Acesso ao telhado',valor:roof},{chave:'Cenário mínimo (CVE/mês)',valor:savings.low},{chave:'Cenário máximo (CVE/mês)',valor:savings.high},
    ]});
    setBusy(false);if(stored)setStep(3);else setError(c.failed);
  }
  return <section id="simulador" className="px-5 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">{c.simTitle}</h2>
      <p className="mx-auto mb-9 mt-4 max-w-2xl text-center leading-relaxed text-white/75">{c.simIntro}</p>
      <div className="rounded-3xl bg-white p-6 text-brand-green-deep md:p-10">
      {step===1 && <>
        <div className="mb-8 flex flex-wrap gap-2">{(['casa','negocio'] as const).map(f=><button key={f} aria-pressed={f===family} onClick={()=>setFamily(f)} className={`rounded-full px-5 py-3 font-semibold ${f===family?'bg-brand-green text-white':'bg-brand-green/10'}`}>{f==='casa'?c.household:c.business}</button>)}</div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="font-medium">{c.bill}<input className={input} type="number" min="1000" max="500000" step="100" value={bill || ''} onChange={e=>setBill(Number(e.target.value))}/></label>
          <label className="font-medium">{c.tariff}<input className={input} type="number" min=".1" max="200" step=".1" value={tariff || ''} onChange={e=>setTariff(Number(e.target.value))}/></label>
        </div>
        <label className="mt-6 block font-medium">{c.selfUse}: {selfUse}%<input className="mt-4 w-full accent-[#1A5C3A]" type="range" min="20" max="100" step="5" value={selfUse} onChange={e=>setSelfUse(Number(e.target.value))}/></label>
        <label className="my-6 flex items-start gap-3"><input className="mt-1 h-5 w-5 accent-[#1A5C3A]" type="checkbox" checked={roof} onChange={e=>setRoof(e.target.checked)}/>{c.roof}</label>
        {valid && <div className="rounded-2xl bg-brand-green-deep p-6 text-white" aria-live="polite">
          <p className="text-sm text-white/80">{c.result}</p><p className="my-3 text-3xl font-bold text-brand-yellow">{fmt(savings.low)}–{fmt(savings.high)} CVE</p>
          <p className="text-sm">{fmt(savings.low*12)}–{fmt(savings.high*12)} CVE {c.year}</p>
          <p className="mt-5 font-semibold">{kit.name} · {c.quote}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{c.returnNote}</p>
        </div>}
        {!roof && <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed">{c.noRoof}</p>}
        <p className="my-6 text-xs leading-relaxed text-ink-soft">{c.assumptions}</p>
        <button disabled={!valid} onClick={()=>{setStep(2);setError('');}} className="w-full rounded-full bg-brand-yellow px-5 py-4 font-semibold disabled:opacity-50">{c.next}</button>
      </>}
      {step===2 && <form onSubmit={send} noValidate className="space-y-5">
        <h3 className="text-2xl font-semibold">{c.cta} · {kit.name}</h3>
        <label className="block">{c.name}<input autoComplete="name" maxLength={100} className={input} value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label className="block">{c.phoneLabel}<input type="tel" autoComplete="tel" maxLength={20} className={input} value={phone} onChange={e=>setPhone(e.target.value)} required /></label>
        <label className="block">{c.island}<select className={input} value={island} onChange={e=>setIsland(e.target.value)} required><option value="">{c.chooseIsland}</option>{ISLANDS.map(i=><option key={i}>{i}</option>)}</select></label>
        <a className="block text-xs underline underline-offset-4" href="/privacidade">{c.privacy}</a>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{error} <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline">WhatsApp</a></p>}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button type="button" disabled={busy} onClick={()=>setStep(1)} className="rounded-full border px-6 py-3">{c.back}</button>
          <button disabled={busy} type="submit" className="flex-1 rounded-full bg-brand-green px-6 py-3 font-semibold text-white disabled:opacity-50">{busy?c.sending:c.cta}</button>
        </div>
      </form>}
      {step===3 && <div role="status" className="py-7 text-center"><h3 className="text-3xl font-bold">{c.saved}</h3><p className="mx-auto my-6 max-w-xl leading-relaxed">{c.savedBody}</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-brand-green px-6 py-3 font-semibold text-white">{c.whatsapp}</a></div>}
      </div>
    </div>
  </section>;
}
