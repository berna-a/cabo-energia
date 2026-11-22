import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, ChevronDown, HelpCircle, Home } from 'lucide-react';
import { useCommercialCopy } from '@/lib/commercialCopy';
import { estimateSavings, recommendKit, type Kit } from '@/lib/catalog';
import { submitLead } from '@/lib/leadClient';
import { validPhone } from '../../../shared/leadValidation';
import { WHATSAPP_URL } from '@/lib/constants';
import { PillButton } from '@/components/brand/PillButton';

const ISLANDS = ['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boa Vista','Maio','Brava','São Nicolau'];
// Agrupar sempre os milhares (o pt-PT, por defeito, escreve «6909» mas «10 000»).
const fmt = (n:number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
const input = 'mt-2 w-full rounded-xl border border-brand-green/25 bg-white px-4 py-3 text-brand-green-deep';
// Valores de partida e atalhos por tipo de cliente. Só orientam a escolha; as contas são as de catalog.ts.
const BILL = { casa: { start: 9000, max: 60000, presets: [5000, 10000, 20000, 40000] }, negocio: { start: 30000, max: 300000, presets: [20000, 50000, 100000, 200000] } } as const;
type Step = 'tipo' | 'factura' | 'telhado' | 'resultado' | 'contacto' | 'registado';
const FLOW: Step[] = ['tipo', 'factura', 'telhado', 'resultado'];

// Conta do resultado a subir até ao valor; sem animação quando o sistema pede movimento reduzido.
function useCountUp(target:number, ms=700) {
  const [value,setValue]=useState(target);
  const from=useRef(target);
  useEffect(()=>{
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){setValue(target);from.current=target;return;}
    const start=performance.now(), a=from.current; let raf=0;
    const tick=(t:number)=>{const p=Math.min(1,(t-start)/ms), e=1-Math.pow(1-p,3); setValue(Math.round(a+(target-a)*e)); if(p<1)raf=requestAnimationFrame(tick); else from.current=target;};
    raf=requestAnimationFrame(tick);
    return ()=>{cancelAnimationFrame(raf);from.current=target;};
  },[target,ms]);
  return value;
}

function Choice({selected,onClick,icon,label}:{selected:boolean;onClick:()=>void;icon:React.ReactNode;label:string}) {
  return <button type="button" aria-pressed={selected} onClick={onClick}
    className={`group flex items-center gap-4 rounded-2xl border-2 p-5 text-left text-lg font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_hsl(var(--brand-green-deep)/0.45)] md:p-6 ${selected?'border-brand-green bg-brand-green text-white':'border-brand-green/15 bg-brand-green/5 hover:border-brand-green/40'}`}>
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${selected?'bg-brand-yellow text-brand-green-deep':'bg-white text-brand-green group-hover:bg-brand-yellow group-hover:text-brand-green-deep'}`}>{icon}</span>
    {label}
  </button>;
}

export default function SimuladorSection() {
  const c=useCommercialCopy();
  const [family,setFamily]=useState<Kit['family']>('casa');
  const [bill,setBill]=useState<number>(BILL.casa.start);
  const [billTouched,setBillTouched]=useState(false);
  const [familyAnswered,setFamilyAnswered]=useState(false);
  const [tariff,setTariff]=useState(32.2);
  const [selfUse,setSelfUse]=useState(60);
  const [roof,setRoof]=useState(true);
  const [roofAnswered,setRoofAnswered]=useState(false);
  const [step,setStep]=useState<Step>('tipo');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [island,setIsland]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const heading=useRef<HTMLHeadingElement>(null);
  const moved=useRef(false);
  const kit=recommendKit(family,bill);
  const savings=estimateSavings(kit,bill,tariff,selfUse/100);
  const validBill=Number.isFinite(bill)&&bill>=1000&&bill<=500000;
  const valid=validBill&&Number.isFinite(tariff)&&tariff>0&&tariff<=200;
  const low=useCountUp(step==='resultado'&&valid?savings.low:0);
  const high=useCountUp(step==='resultado'&&valid?savings.high:0);
  const flowIndex=FLOW.indexOf(step);

  // Ao mudar de passo, o foco vai para a pergunta (leitores de ecrã e teclado), sem saltar no primeiro carregamento.
  useEffect(()=>{ if(moved.current) heading.current?.focus({preventScroll:true}); },[step]);
  const go=(s:Step)=>{moved.current=true;setError('');setStep(s);};
  const chooseFamily=(f:Kit['family'])=>{setFamily(f);setFamilyAnswered(true);if(!billTouched)setBill(BILL[f].start);go('factura');};
  const chooseRoof=(r:boolean)=>{setRoof(r);setRoofAnswered(true);go('resultado');};
  const setBillValue=(n:number)=>{setBill(n);setBillTouched(true);};

  async function send(e:React.FormEvent) {
    e.preventDefault();
    if(busy)return;
    if(name.trim().length<2||name.trim().length>100||!validPhone(phone)||!ISLANDS.includes(island)){setError(c.error);return;}
    setBusy(true);setError('');
    const stored=await submitLead({nome:name.trim(),telemovel:phone.trim(),tipo:family==='casa'?'residencial':'empresarial',ilha:island,origem:'simulador',camposExtra:[
      {chave:'Pacote de referência',valor:kit.name},{chave:'Factura mensal (CVE)',valor:bill},{chave:'Tarifa de cálculo (CVE/kWh)',valor:tariff},
      {chave:'Autoconsumo (%)',valor:selfUse},{chave:'Acesso ao telhado',valor:roof},{chave:'Cenário mínimo (CVE/mês)',valor:savings.low},{chave:'Cenário máximo (CVE/mês)',valor:savings.high},
    ]});
    setBusy(false);
    if(stored){
      go('registado');
      window.location.assign(`${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappLeadMessage)}`);
    }else setError(c.failed);
  }

  const cfg=BILL[family];
  const sliderValue=Math.min(Math.max(bill||0,1000),cfg.max);
  const qh='text-2xl font-bold leading-tight outline-none md:text-3xl';

  return <section id="simulador" className="px-3 py-12 sm:px-5 md:px-8 md:py-20">
    {/* Palco do simulador: mais largo que o resto, com fundo em movimento lento para se destacar do verde da página. */}
    <div className="sim-stage relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-3 py-10 ring-1 ring-white/10 sm:px-8 md:px-14 md:py-16">
      <span aria-hidden className="sim-blob sim-blob-a"/><span aria-hidden className="sim-blob sim-blob-b"/><span aria-hidden className="sim-blob sim-blob-c"/>
    <div className="relative mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-semibold text-white md:text-5xl">{c.simTitle}</h2>
      <p className="mx-auto mb-9 mt-4 max-w-xl text-center text-lg leading-relaxed text-white/85">{c.simIntro}</p>

      {flowIndex>=0 && <div className="mb-6">
        <div role="progressbar" aria-label={c.simSteps} aria-valuemin={1} aria-valuemax={FLOW.length} aria-valuenow={flowIndex+1} aria-valuetext={`${flowIndex+1} / ${FLOW.length} · ${c.simStepNames[flowIndex]}`}
          className="h-2.5 overflow-hidden rounded-full bg-white/15">
          <div className="relative h-full overflow-hidden rounded-full bg-brand-yellow shadow-[0_0_18px_hsl(var(--brand-yellow)/0.7)] transition-[width] duration-700 ease-out" style={{width:`${(flowIndex+1)/FLOW.length*100}%`}}>
            <span aria-hidden className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] bg-[length:200%_100%]"/>
          </div>
        </div>
        <ol className="mt-3 grid grid-cols-4 gap-1 text-xs sm:text-sm">
          {c.simStepNames.map((label,i)=>{
            const done=i<flowIndex, current=i===flowIndex;
            return <li key={label} className="text-right">
              <button type="button" disabled={!done} onClick={()=>go(FLOW[i])} aria-current={current?'step':undefined}
                className={`inline-flex items-center gap-1 transition-colors ${current?'font-semibold text-white':done?'text-white/75 hover:text-brand-yellow':'text-white/40'}`}>
                {done?<Check aria-hidden className="hidden h-3.5 w-3.5 sm:inline"/>:null}{label}
              </button>
            </li>;
          })}
        </ol>
      </div>}

      <div className="rounded-3xl bg-white p-5 text-brand-green-deep sm:p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] md:p-10">
        <div key={step} className="animate-fade-in-up">

        {step==='tipo' && <>
          <p className="text-sm font-semibold text-brand-green">1 / 4</p>
          <h3 ref={heading} tabIndex={-1} className={`mt-2 ${qh}`}>{c.qType}</h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Choice selected={familyAnswered&&family==='casa'} onClick={()=>chooseFamily('casa')} icon={<Home aria-hidden className="h-6 w-6"/>} label={c.household}/>
            <Choice selected={familyAnswered&&family==='negocio'} onClick={()=>chooseFamily('negocio')} icon={<Building2 aria-hidden className="h-6 w-6"/>} label={c.business}/>
          </div>
        </>}

        {step==='factura' && <>
          <p className="text-sm font-semibold text-brand-green">2 / 4</p>
          <h3 ref={heading} tabIndex={-1} className={`mt-2 ${qh}`}>{c.qBill}</h3>
          <label className="mt-7 flex items-baseline justify-center gap-3 rounded-2xl bg-brand-green/5 px-4 py-5">
            <span className="sr-only">{c.bill}</span>
            <input type="text" inputMode="numeric" autoComplete="off" value={bill?fmt(bill):''} onChange={e=>setBillValue(Number(e.target.value.replace(/\D/g,'').slice(0,7)))}
              className="w-[7ch] min-w-0 bg-transparent text-right text-[1.75rem] font-bold tabular-nums outline-none sm:text-4xl md:text-5xl"/>
            <span className="text-xl font-semibold text-brand-green">CVE</span>
          </label>
          <input aria-label={c.bill} className="mt-6 w-full accent-[#1A5C3A]" type="range" min="1000" max={cfg.max} step="500" value={sliderValue} onChange={e=>setBillValue(Number(e.target.value))}/>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {cfg.presets.map(p=><button key={p} type="button" aria-pressed={bill===p} onClick={()=>setBillValue(p)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${bill===p?'bg-brand-green text-white':'bg-brand-green/10 hover:bg-brand-green/20'}`}>{fmt(p)}</button>)}
          </div>
          {!validBill && <p role="alert" className="mt-4 text-center text-sm text-red-800">{c.billRange}</p>}
          <div className="mt-8 flex gap-3">
            <button type="button" onClick={()=>go('tipo')} aria-label={c.back} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-green/25 transition-colors hover:bg-brand-green/10"><ArrowLeft aria-hidden className="h-5 w-5"/></button>
            <PillButton type="button" size="lg" variant="solid-green" disabled={!validBill} onClick={()=>go('telhado')} className="flex-1">{c.continue}<ArrowRight aria-hidden/></PillButton>
          </div>
        </>}

        {step==='telhado' && <>
          <p className="text-sm font-semibold text-brand-green">3 / 4</p>
          <h3 ref={heading} tabIndex={-1} className={`mt-2 ${qh}`}>{c.qRoof}</h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Choice selected={roofAnswered&&roof} onClick={()=>chooseRoof(true)} icon={<Check aria-hidden className="h-6 w-6"/>} label={c.yes}/>
            <Choice selected={roofAnswered&&!roof} onClick={()=>chooseRoof(false)} icon={<HelpCircle aria-hidden className="h-6 w-6"/>} label={c.noOrUnsure}/>
          </div>
          <button type="button" onClick={()=>go('factura')} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"><ArrowLeft aria-hidden className="h-4 w-4"/>{c.back}</button>
        </>}

        {step==='resultado' && <>
          <div className="relative overflow-hidden rounded-2xl bg-brand-green-deep p-6 text-center text-white md:p-10" aria-live="polite">
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-yellow/20 blur-3xl animate-glow-pulse"/>
            <h3 ref={heading} tabIndex={-1} className="relative text-base font-semibold text-white/80 outline-none">{c.result}</h3>
            {valid ? <>
              <p className="relative my-3 text-[1.75rem] font-bold leading-tight tabular-nums text-brand-yellow sm:text-5xl md:text-6xl"><span className="whitespace-nowrap">{fmt(low)}–{fmt(high)}</span><span className="block text-xl sm:ml-2 sm:inline md:text-3xl">CVE</span></p>
              <p className="relative text-lg text-white/90">{fmt(savings.low*12)}–{fmt(savings.high*12)} CVE {c.year}</p>
              <p className="relative mt-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm">{c.kitLabel}: <strong>{kit.name}</strong> · {c.quote}</p>
            </> : <p className="relative my-4">{validBill?`${c.tariff}: 0,1–200`:c.billRange}</p>}
          </div>
          {!roof && <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed">{c.noRoof}</p>}
          <PillButton type="button" size="lg" variant="power" disabled={!valid} onClick={()=>go('contacto')} className="sim-cta group mt-6 h-auto min-h-14 w-full whitespace-normal px-4 py-3 text-center text-sm sm:px-8 sm:text-base">
            <span aria-hidden className="sim-cta-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(110deg,transparent,hsl(var(--brand-yellow)/0.6),transparent)]"/>
            <span className="relative">{c.next}</span>
          </PillButton>
          <p className="mt-3 text-center text-xs text-ink-soft">{c.estimateNote}</p>
          <details className="group/how mt-6 rounded-2xl border border-brand-green/15">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              {c.howTitle}<ChevronDown aria-hidden className="h-5 w-5 transition-transform group-open/how:rotate-180"/>
            </summary>
            <div className="space-y-5 border-t border-brand-green/10 px-5 py-5 text-sm">
              <label className="block font-medium">{c.tariff}<input className={input} type="number" min=".1" max="200" step=".1" value={tariff || ''} onChange={e=>setTariff(Number(e.target.value))}/></label>
              <label className="block font-medium">{c.selfUse}: {selfUse}%<input className="mt-4 w-full accent-[#1A5C3A]" type="range" min="20" max="100" step="5" value={selfUse} onChange={e=>setSelfUse(Number(e.target.value))}/></label>
              <p className="leading-relaxed text-ink-soft">{c.assumptions}</p>
              <p className="leading-relaxed text-ink-soft">{c.returnNote}</p>
            </div>
          </details>
          <button type="button" onClick={()=>go('telhado')} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"><ArrowLeft aria-hidden className="h-4 w-4"/>{c.back}</button>
        </>}

        {step==='contacto' && <form onSubmit={send} noValidate className="space-y-5">
          <p className="text-sm font-semibold text-brand-green">{fmt(savings.low)}–{fmt(savings.high)} CVE · {kit.name}</p>
          <h3 ref={heading} tabIndex={-1} className={qh}>{c.contactTitle}</h3>
          <label className="block">{c.name}<input autoComplete="name" maxLength={100} className={input} value={name} onChange={e=>setName(e.target.value)} required /></label>
          <label className="block">{c.phoneLabel}<input type="tel" autoComplete="tel" maxLength={20} className={input} value={phone} onChange={e=>setPhone(e.target.value)} required /></label>
          <label className="block">{c.island}<select className={input} value={island} onChange={e=>setIsland(e.target.value)} required><option value="">{c.chooseIsland}</option>{ISLANDS.map(i=><option key={i}>{i}</option>)}</select></label>
          <a className="block text-xs underline underline-offset-4" href="/privacidade">{c.privacy}</a>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{error} <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline">WhatsApp</a></p>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" disabled={busy} onClick={()=>go('resultado')} className="rounded-full border px-6 py-3 transition-colors hover:bg-brand-green/10">{c.back}</button>
            <button disabled={busy} type="submit" className="flex-1 rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-green-deep disabled:opacity-50">{busy?c.sending:c.submitWhatsapp}</button>
          </div>
        </form>}

        {step==='registado' && <div role="status" className="py-7 text-center"><h3 ref={heading} tabIndex={-1} className="text-3xl font-bold outline-none">{c.saved}</h3><p className="mx-auto my-6 max-w-xl leading-relaxed">{c.savedBody}</p><a href={`${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappLeadMessage)}`} className="inline-block rounded-full bg-brand-green px-6 py-3 font-semibold text-white">{c.whatsapp}</a></div>}

        </div>
      </div>
    </div>
    </div>
  </section>;
}
