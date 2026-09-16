import { useState } from 'react';
import { CATALOG, type KitId } from '@/lib/catalog';
import { generateProposal, type ProposalData } from '@/lib/proposalPdf';

export function ProposalGenerator() {
  const [data,setData]=useState<ProposalData>({
    name:'',address:'',phone:'',email:'',property:'Residencial',roof:'',connection:'',equipment:'',bill:'',kitId:'tranquila',
    price:'',notes:'',reference:`CE-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,12).toUpperCase()}`,
    seller:'Kevin',sellerPhone:'+238 995 41 81',terms:'',legalEntity:'',taxId:'',validity:'',photo:'',
  });
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const set=(key:keyof ProposalData,value:string)=>setData(d=>({...d,[key]:value}));
  const kit=CATALOG.find(k=>k.id===data.kitId)!;
  function field(key:keyof ProposalData,label:string,type='text') {
    return <label key={key} className="block text-sm font-medium">{label}<input className="mt-2 w-full rounded-lg border px-3 py-2 font-normal" type={type} value={data[key]} maxLength={key==='name'?150:500} onChange={e=>set(key,e.target.value)}/></label>;
  }
  async function photo(file?:File){
    if(!file)return;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024){setError('Use uma imagem PNG, JPEG ou WebP até 5 MB.');return;}
    const reader=new FileReader();reader.onload=()=>set('photo',String(reader.result));reader.readAsDataURL(file);
  }
  async function download(){
    if(busy||!data.name.trim())return;
    setBusy(true);setError('');
    try{const pdf=generateProposal(data);pdf.save(`Proposta_${data.reference}.pdf`);}
    catch{setError('Não foi possível gerar o PDF. Verifique os dados e a fotografia.');}
    finally{setBusy(false);}
  }
  return <main className="min-h-screen bg-[#f0f5f1] px-4 py-8 text-brand-green-deep">
    <div className="mx-auto max-w-6xl">
      <a href="/" className="text-sm underline">Voltar ao website</a>
      <h1 className="mt-5 text-3xl font-bold">Gerador de propostas</h1>
      <p className="my-5 max-w-3xl leading-relaxed">Área interna. O catálogo é partilhado com o website. Os preços aguardam validação do Bernardo com Kevin; os documentos gerados são minutas, não propostas comerciais aprovadas. Os dados e fotografias ficam apenas nesta página e no PDF descarregado.</p>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <form onSubmit={e=>{e.preventDefault();download();}} className="space-y-5 rounded-2xl bg-white p-5 md:p-8">
          <h2 className="text-xl font-semibold">Cliente e local</h2>
          {field('name','Nome do cliente *')}
          {field('address','Morada e ilha')}
          <div className="grid gap-4 sm:grid-cols-2">{field('phone','Telefone','tel')}{field('email','Email','email')}</div>
          <div className="grid gap-4 sm:grid-cols-2">{field('property','Tipo de imóvel')}{field('roof','Telhado / terraço')}{field('connection','Ligação eléctrica')}{field('bill','Factura mensal (CVE)','number')}</div>
          {field('equipment','Equipamentos essenciais')}
          <label className="block text-sm">Fotografia do local (opcional)<input className="mt-2 block max-w-full text-sm" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>photo(e.target.files?.[0])}/></label>
          <h2 className="pt-4 text-xl font-semibold">Solução e condições</h2>
          <label className="block text-sm font-medium">Configuração<select className="mt-2 w-full rounded-lg border px-3 py-2" value={data.kitId} onChange={e=>set('kitId',e.target.value as KitId)}>{CATALOG.map(k=><option key={k.id} value={k.id}>{k.name}</option>)}</select></label>
          {field('price','Preço indicativo a validar (CVE)','number')}
          {(['terms','notes'] as const).map((key)=><label key={key} className="block text-sm font-medium">{key==='terms'?'Condições: impostos, transporte, instalação, garantias e pagamento':'Observações técnicas'}<textarea maxLength={10000} rows={4} value={data[key]} onChange={e=>set(key,e.target.value)} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label>)}
          {field('validity','Validade a acordar')}{field('legalEntity','Entidade legal vendedora')}{field('taxId','NIF')}
          {field('reference','Referência única')}{field('seller','Responsável')}{field('sellerPhone','Contacto do responsável','tel')}
          {error&&<p role="alert" className="text-red-700">{error}</p>}
          <button disabled={busy||!data.name.trim()} className="w-full rounded-full bg-brand-green px-6 py-4 font-semibold text-white disabled:opacity-50">{busy?'A gerar…':'Exportar minuta PDF'}</button>
        </form>
        <aside className="overflow-hidden rounded-2xl bg-white">
          <div className="bg-brand-green-deep p-8 text-white"><p className="font-bold tracking-widest text-brand-yellow">CABO ENERGIA</p><p className="mt-4 text-xs">{data.reference}</p><h2 className="mt-3 break-words text-3xl font-semibold">{data.name||'Nome do cliente'}</h2><p className="mt-4 break-words text-sm text-white/80">{data.address}</p></div>
          <div className="space-y-6 p-8">
            {data.photo&&<img src={data.photo} alt="Fotografia do local" className="max-h-56 w-full rounded-xl object-contain"/>}
            <h3 className="text-2xl font-semibold">{kit.name}</h3>
            <ul className="list-inside list-disc space-y-3"><li>{kit.panels} painéis de {kit.panelWp} Wp</li><li>Inversor(es): {kit.inverterKw} kW</li><li>Bateria nominal: {kit.batteryKwh} kWh</li></ul>
            <p className="rounded-xl bg-amber-50 p-4 text-sm leading-relaxed">Configuração indicativa. Equipamento final, desempenho, garantias e condições dependem do levantamento e aprovação comercial. Não pressupõe stock, financiamento ou certificação não comprovados.</p>
            <p className="text-2xl font-bold">{data.price?Number(data.price).toLocaleString('pt-PT')+' CVE':'Sob orçamento'}</p>
            <p className="whitespace-pre-wrap break-words text-sm">{data.terms}</p>
            <p className="whitespace-pre-wrap break-words text-sm">{data.notes}</p>
          </div>
        </aside>
      </div>
    </div>
  </main>;
}
