import { Navbar } from '@/components/brand/Navbar';
import { Footer } from '@/components/brand/Footer';
export default function Privacidade() {
  const sections=[
    ['Quem responde pelo pedido','Os formulários destinam-se à Cabo Energia, em Cabo Verde. Kevin é o contacto operacional, através do número +238 995 41 81 ou de contacto@caboenergia.cv. A ARDO presta suporte técnico ao website.'],
    ['Dados que fornece','No pedido de contacto: nome, telefone, ilha e segmento residencial ou empresarial. Na avaliação de consumo: factura aproximada, tarifa de cálculo, percentagem de autoconsumo, acesso ao telhado e cenário apresentado. Os campos do formulário são necessários para responder ao pedido; não envie dados bancários ou informação sensível. Os prestadores de alojamento podem ainda registar informação técnica de acesso e segurança.'],
    ['Finalidade','Usamos os dados para responder ao seu pedido, analisar necessidades, preparar uma visita ou proposta e acompanhar essa conversa. A submissão não inscreve o contacto numa campanha publicitária. Não há compra ou pagamento através destes formulários.'],
    ['Armazenamento e prestadores','Os pedidos ficam numa base Convex dedicada, na Irlanda, e originam uma notificação de email através do Resend. O website e a API são alojados na Vercel. A equipa que responde aos pedidos e o suporte técnico autorizado podem aceder aos dados para estas finalidades. Estes serviços envolvem tratamento fora de Cabo Verde; nem toda a infraestrutura de email e alojamento está na União Europeia.'],
    ['Conservação','Os dados devem ser conservados apenas durante o período necessário ao tratamento do pedido e às obrigações aplicáveis se houver contratação. Pode pedir a revisão, correcção ou eliminação do seu registo através dos contactos abaixo. A eliminação pode estar limitada por obrigações legais de conservação.'],
    ['Direitos e contacto','Pode pedir informação sobre o tratamento, acesso aos seus dados, correcção, apagamento ou bloqueio e opor-se ao tratamento nos termos aplicáveis. Contacte a Cabo Energia pelo telefone +238 995 41 81 ou por contacto@caboenergia.cv. Pode também dirigir-se à Comissão Nacional de Protecção de Dados de Cabo Verde (CNPD).'],
    ['Navegador e serviços externos','Guardamos no navegador a preferência de idioma. Não foi instalado Google Analytics, Meta Pixel ou rastreio publicitário nesta versão. As fontes são obtidas do Google Fonts. Ao seguir ligações para WhatsApp ou redes sociais, passa a usar serviços com políticas próprias; usar WhatsApp não garante tratamento apenas em Cabo Verde.'],
    ['Segurança','O site usa HTTPS; as credenciais da base de dados e do email não são disponibilizadas ao navegador. A área de propostas exige autenticação. Nenhum sistema permite garantir risco zero. A informação de incidentes é tratada de acordo com as obrigações aplicáveis.'],
  ];
  return <div className="min-h-screen bg-background"><Navbar/><main>
    <section className="bg-brand-green-deep pb-14 pt-32 text-white"><div className="site-container"><h1 className="max-w-3xl text-4xl font-semibold md:text-5xl">Privacidade dos seus dados</h1><p className="mt-5 text-white/75">Informação sobre os formulários e serviços deste website. Actualizado em 17 de Setembro de 2026.</p></div></section>
    <div className="site-container py-14"><div className="max-w-3xl">{sections.map(([title,body],i)=><section className="mb-10" key={title}><h2 className="mb-4 text-xl font-semibold text-brand-green-deep">{i+1}. {title}</h2><p className="leading-relaxed text-ink-soft">{body}</p></section>)}
      <p className="flex flex-wrap gap-6"><a className="underline" href="tel:+2389954181">+238 995 41 81</a><a className="underline" href="mailto:contacto@caboenergia.cv">contacto@caboenergia.cv</a><a className="underline" href="https://www.cnpd.cv/direitos/" target="_blank" rel="noreferrer">Direitos — CNPD Cabo Verde</a></p>
    </div></div>
  </main><Footer/></div>;
}
