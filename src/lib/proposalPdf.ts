import { jsPDF } from 'jspdf';
import { CATALOG, CATALOG_VERSION, type KitId } from './catalog';

export interface ProposalData {
  name:string; address:string; phone:string; email:string; property:string; roof:string; connection:string;
  equipment:string; bill:string; kitId:KitId; price:string; notes:string; reference:string;
  seller:string; sellerPhone:string; terms:string; legalEntity:string; taxId:string; validity:string; photo:string;
}
const money = (s:string) => Number(s.replace(/\s/g,'').replace(',','.'));
export function generateProposal(d:ProposalData) {
  const pdf=new jsPDF({unit:'mm',format:'a4'});
  const kit=CATALOG.find(k=>k.id===d.kitId)!;
  let y=47;
  const clean=(s:string)=>s.replace(/[–—]/g,'-').replace(/\u00a0/g,' ');
  function header() {
    pdf.setFillColor('#0D2B1F');pdf.rect(0,0,210,35,'F');
    pdf.setTextColor('#F5C842');pdf.setFont('helvetica','bold');pdf.setFontSize(19);pdf.text('CABO ENERGIA',18,17);
    pdf.setTextColor('#FFFFFF');pdf.setFont('helvetica','normal');pdf.setFontSize(10);pdf.text('Proposta de energia solar | Documento para validação',18,26);
  }
  function room(h:number){if(y+h>273){pdf.addPage();header();y=47;}}
  function text(value:string,{size=9,bold=false,gap=2}:{size?:number;bold?:boolean;gap?:number}={}) {
    pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor('#0D2B1F');
    const lines=pdf.splitTextToSize(clean(value),174) as string[];
    for(const line of lines){room(size*.45+1);pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor('#0D2B1F');pdf.text(line,18,y);y+=size*.45+1;}
    y+=gap;
  }
  function heading(value:string){room(24);y+=3;pdf.setDrawColor('#C6D9CA');pdf.line(18,y-3,192,y-3);text(value,{size:12,bold:true,gap:4});}
  header();
  text(d.reference,{size:11,bold:true});
  text(`${new Date().toLocaleDateString('pt-PT')} | Catálogo ${CATALOG_VERSION}`,{size:9});
  text(d.name,{size:20,bold:true,gap:6});
  text([d.address,d.phone,d.email].filter(Boolean).join(' | '));
  heading('1. Necessidades e local');
  text(`Imóvel: ${d.property || 'Por confirmar'} | Telhado: ${d.roof || 'Por confirmar'} | Ligação: ${d.connection || 'Por confirmar'}`);
  text(`Equipamentos essenciais: ${d.equipment || 'A identificar no levantamento técnico.'}`);
  const bill=money(d.bill);
  if(bill>0)text(`Factura mensal declarada: ${bill.toLocaleString('pt-PT')} CVE. Valor anual de referência: ${(bill*12).toLocaleString('pt-PT')} CVE. Não corresponde à poupança prevista.`);
  if(d.photo){room(65);try{const info=pdf.getImageProperties(d.photo);const w=Math.min(174,55*info.width/info.height);pdf.addImage(d.photo,info.fileType,18,y,w,55);y+=62;}catch{text('Fotografia não incluída: formato não suportado.');}}
  heading(`2. Configuração de referência - ${kit.name}`);
  for(const line of [`${kit.panels} painéis de ${kit.panelWp} Wp`,`Inversor(es): ${kit.inverterKw} kW`,`Bateria nominal: ${kit.batteryKwh} kWh`])text(`- ${line}`);
  text('Modelos exactos, capacidade útil, estruturas, cablagem, protecções e trabalhos necessários são confirmados no levantamento e discriminados no orçamento final.');
  text('Produção, poupança, retorno e autonomia dependem da instalação, tarifa, autoconsumo e cargas. Esta configuração não constitui garantia de desempenho ou de continuidade ilimitada.',{size:9});
  heading('3. Investimento e condições');
  const price=money(d.price);
  text(price>0?`${price.toLocaleString('pt-PT')} CVE - valor introduzido para validação comercial.`:'Sob orçamento - preço a confirmar após levantamento.',{size:14,bold:true});
  text(d.terms || 'Antes da adjudicação, confirmar por escrito: impostos, transporte, instalação, exclusões, calendário, pagamento, garantias por componente e assistência.');
  text(`Validade: ${d.validity || 'A acordar na proposta final'}. Não efectuar pagamentos com base numa minuta por validar.`,{size:9});
  if(d.notes){heading('4. Observações técnicas');text(d.notes);}
  heading('Próximo passo');
  text(`Contacte ${d.seller || 'Kevin'}: ${d.sellerPhone || '+238 995 41 81'}. Confirme a visita e respectivas condições antes da marcação.`);
  text(`Entidade vendedora: ${d.legalEntity || 'A preencher antes da adjudicação'} | NIF: ${d.taxId || 'A preencher'}`,{size:9});
  const pages=pdf.getNumberOfPages();
  for(let n=1;n<=pages;n++){pdf.setPage(n);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor('#667568');pdf.text('CABO ENERGIA | caboenergia.cv | Minuta sujeita a validação',18,287);pdf.text(`${n} / ${pages}`,192,287,{align:'right'});}
  return pdf;
}
