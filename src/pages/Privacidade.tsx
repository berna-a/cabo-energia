import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";

/**
 * Política de Privacidade.
 *
 * Só em português: é o texto com valor legal, e a lei aplicável é a de Cabo Verde
 * (Lei n.º 133/V/2001, alterada pelas Leis n.º 41/VIII/2013 e n.º 121/IX/2021).
 * Traduzir texto legal sem revisão jurídica criaria versões que se contradizem.
 *
 * O conteúdo descreve o tratamento REAL: os dados são enviados por email para a
 * Cabo Energia (Resend) — não há, hoje, base de dados a guardá-los.
 */

const ATUALIZADO_EM = "28 de julho de 2026";

function Seccao({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2
        className="font-display text-ink"
        style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", fontWeight: 600, lineHeight: 1.25 }}
      >
        <span style={{ color: "hsl(var(--brand-green))" }}>{n}.</span> {titulo}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-ink-soft" style={{ lineHeight: 1.7 }}>
        {children}
      </div>
    </section>
  );
}

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Cabeçalho — sóbrio, sem hero de venda: é uma página de confiança. */}
        <section style={{ background: "#0D2B1F" }} className="pt-32 pb-16 text-white">
          <div className="site-container">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
              <span className="text-overline text-white/80">Os seus dados</span>
            </div>
            <h1
              className="font-display max-w-3xl"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                lineHeight: 1.05,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              Política de Privacidade
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-white/70">
              O que recolhemos, porquê, durante quanto tempo, e o que pode exigir de nós a
              qualquer momento.
            </p>
            <p className="mt-6 text-white/50" style={{ fontSize: 13 }}>
              Última atualização: {ATUALIZADO_EM}
            </p>
          </div>
        </section>

        <div className="site-container py-16 md:py-20">
          <div className="max-w-[760px]">
            <Seccao n="1" titulo="Quem trata os seus dados">
              <p>
                A responsável pelo tratamento dos dados pessoais recolhidos neste site é a{" "}
                <strong>CABO ENERGIA</strong>, com sede em Cabo Verde.
              </p>
              <p>
                Para qualquer questão sobre esta política ou sobre os seus dados, escreva para{" "}
                <a
                  href="mailto:contacto@caboenergia.cv"
                  className="underline underline-offset-4"
                  style={{ color: "hsl(var(--brand-green))" }}
                >
                  contacto@caboenergia.cv
                </a>
                .
              </p>
            </Seccao>

            <Seccao n="2" titulo="Que dados recolhemos">
              <p>
                Só recolhemos o que nos dá voluntariamente ao pedir contacto ou ao usar o
                simulador de poupança. Não recolhemos nada sem que o preencha.
              </p>
              <p>
                <strong>Quando pede contacto:</strong> nome, número de telemóvel, ilha onde se
                encontra, e se o pedido é para casa ou para negócio.
              </p>
              <p>
                <strong>Quando usa o simulador de poupança:</strong> além do acima, o valor
                aproximado da sua fatura de eletricidade, o tipo de habitação ou negócio, se tem
                telhado disponível, e o resultado que o simulador calcula (pacote sugerido e
                poupança estimada).
              </p>
              <p>
                <strong>Não recolhemos</strong> dados bancários, número de identificação, morada
                exata, nem quaisquer dados sensíveis — como saúde, convicções religiosas,
                filiação política ou origem étnica.
              </p>
            </Seccao>

            <Seccao n="3" titulo="Para que usamos os dados">
              <p>
                Para uma coisa apenas: <strong>entrar em contacto consigo</strong> a respeito do
                pedido que nos fez — responder-lhe, marcar um levantamento técnico, preparar uma
                proposta e acompanhar o processo.
              </p>
              <p>
                Os dados do simulador servem para preparar essa conversa com números que já fazem
                sentido para o seu caso, em vez de começarmos do zero.
              </p>
              <p>
                <strong>Não vendemos os seus dados</strong>, não os cedemos a terceiros para fins
                comerciais e não os usamos para fins diferentes daquele para que os deu.
              </p>
            </Seccao>

            <Seccao n="4" titulo="Com que fundamento">
              <p>
                Tratamos os seus dados com base no seu <strong>consentimento</strong>, dado no
                momento em que submete o formulário, e porque são necessários a{" "}
                <strong>diligências prévias a um contrato</strong> que nos pediu — a proposta que
                quer receber. São os fundamentos previstos no artigo 7.º da lei aplicável.
              </p>
              <p>
                Pode retirar o consentimento a qualquer momento, sem justificar. Ver o ponto 8.
              </p>
            </Seccao>

            <Seccao n="5" titulo="Quem mais lhes toca">
              <p>
                Os seus dados chegam-nos por email e ficam acessíveis apenas à equipa da CABO
                ENERGIA que trata do seu pedido.
              </p>
              <p>Para o site funcionar, recorremos a dois prestadores técnicos:</p>
              <ul className="ml-5 flex list-disc flex-col gap-2">
                <li>
                  <strong>Vercel</strong> — alojamento do site (Estados Unidos e infraestrutura
                  global).
                </li>
                <li>
                  <strong>Resend</strong> — envio do email que nos entrega o seu pedido (servidores
                  na União Europeia).
                </li>
              </ul>
              <p>
                Estes prestadores tratam os dados por nossa conta e instrução, e não os podem usar
                para fins próprios.
              </p>
            </Seccao>

            <Seccao n="6" titulo="Transferência para fora de Cabo Verde">
              <p>
                Porque usamos os prestadores acima, os seus dados são processados fora de Cabo
                Verde — na União Europeia e nos Estados Unidos. Escolhemos prestadores que aplicam
                salvaguardas contratuais e técnicas de proteção reconhecidas internacionalmente.
              </p>
              <p>
                Esta transferência é admitida pelo artigo 20.º da lei aplicável, por ser necessária
                a diligências prévias ao contrato que nos pediu, e conta ainda com o consentimento
                que nos dá ao submeter o formulário.
              </p>
              <p>
                Se preferir não ter os seus dados tratados fora do país, contacte-nos diretamente
                por telefone ou WhatsApp em vez de usar os formulários do site.
              </p>
            </Seccao>

            <Seccao n="7" titulo="Durante quanto tempo guardamos">
              <p>
                A lei obriga-nos a guardar os dados apenas durante o período necessário à
                finalidade para que os recolhemos (artigo 6.º). Para um pedido de proposta,
                fixámos esse período em <strong>24 meses</strong> a contar do último contacto entre
                nós — o tempo em que uma decisão de investimento desta natureza costuma
                amadurecer. Findo o prazo, os dados são eliminados.
              </p>
              <p>
                Se se tornar nosso cliente, guardamos o necessário para cumprir a garantia, o
                suporte pós-venda e as obrigações legais e fiscais aplicáveis.
              </p>
              <p>Pode pedir a eliminação antes destes prazos, a qualquer momento.</p>
            </Seccao>

            <Seccao n="8" titulo="Os seus direitos">
              <p>
                Ao abrigo da lei cabo-verdiana de proteção de dados pessoais, tem direito a:
              </p>
              <ul className="ml-5 flex list-disc flex-col gap-2">
                <li>
                  <strong>Ser informado</strong> sobre que dados temos e o que fazemos com eles
                  (artigo 11.º);
                </li>
                <li>
                  <strong>Aceder</strong> aos seus dados e obter uma cópia inteligível, sem custos
                  excessivos (artigo 12.º);
                </li>
                <li>
                  <strong>Corrigir</strong> o que estiver errado ou incompleto, e obter o
                  apagamento ou bloqueio dos dados cujo tratamento não cumpra a lei (artigo 12.º);
                </li>
                <li>
                  <strong>Opor-se</strong> ao tratamento por razões ligadas à sua situação, e
                  recusar gratuitamente o uso dos seus dados para marketing (artigo 13.º);
                </li>
                <li>
                  <strong>Não ficar sujeito</strong> a decisões tomadas apenas por meios
                  automáticos que o afetem de forma significativa (artigo 14.º);
                </li>
                <li>
                  <strong>Reclamar</strong> junto da CNPD e recorrer judicialmente (artigo 30.º).
                </li>
              </ul>
              <p>
                <strong>Além do que a lei exige:</strong> se nos pedir para apagar os seus dados,
                apagamos — mesmo que o tratamento seja legítimo e não sejamos obrigados a fazê-lo.
                Basta pedir.
              </p>
              <p>
                Para exercer qualquer um destes direitos, basta escrever para{" "}
                <a
                  href="mailto:contacto@caboenergia.cv"
                  className="underline underline-offset-4"
                  style={{ color: "hsl(var(--brand-green))" }}
                >
                  contacto@caboenergia.cv
                </a>
                . Respondemos no prazo máximo de 30 dias e não cobramos nada por isso.
              </p>
            </Seccao>

            <Seccao n="9" titulo="Cookies e medição">
              <p>
                Este site <strong>não usa cookies de publicidade nem de rastreio</strong>. Guardamos
                apenas, no seu próprio navegador, a preferência de idioma que escolher — para não
                ter de a repetir. Essa informação não sai do seu dispositivo e não o identifica.
              </p>
              <p>
                Se no futuro passarmos a usar ferramentas de medição de audiência ou de
                publicidade — como o Google Analytics ou o Meta Pixel — atualizaremos esta página
                antes de o fazer e pediremos o seu consentimento.
              </p>
            </Seccao>

            <Seccao n="10" titulo="Segurança">
              <p>
                O site é servido exclusivamente por ligação cifrada (HTTPS) e o acesso aos pedidos
                recebidos está limitado a quem, na CABO ENERGIA, precisa deles para o atender.
              </p>
              <p>
                Nenhum sistema é infalível. Se alguma vez ocorrer uma violação de dados que o possa
                afetar, informá-lo-emos e comunicaremos o facto à autoridade de controlo.
              </p>
            </Seccao>

            <Seccao n="11" titulo="Lei aplicável e autoridade de controlo">
              <p>
                Esta política rege-se pela lei de Cabo Verde, nomeadamente pela Lei n.º 133/V/2001,
                de 22 de janeiro, alterada pela Lei n.º 41/VIII/2013, de 17 de setembro, e pela Lei
                n.º 121/IX/2021, de 17 de março.
              </p>
              <p>
                A autoridade de controlo é a <strong>Comissão Nacional de Proteção de Dados
                (CNPD)</strong>, com sede na Avenida China, Praia, Cabo Verde. Se considerar que os
                seus direitos não foram respeitados, pode apresentar reclamação através de{" "}
                <a
                  href="mailto:cnpd@cnpd.cv"
                  className="underline underline-offset-4"
                  style={{ color: "hsl(var(--brand-green))" }}
                >
                  cnpd@cnpd.cv
                </a>{" "}
                ou de{" "}
                <a
                  href="https://www.cnpd.cv"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                  style={{ color: "hsl(var(--brand-green))" }}
                >
                  www.cnpd.cv
                </a>
                .
              </p>
              <p>
                Se residir na União Europeia, beneficia adicionalmente dos direitos previstos no
                Regulamento Geral sobre a Proteção de Dados (RGPD), que exercemos nos mesmos termos
                descritos acima.
              </p>
            </Seccao>

            <Seccao n="12" titulo="Alterações a esta política">
              <p>
                Se alterarmos esta política, mudamos a data no topo da página. Se a alteração for
                significativa — por exemplo, começarmos a tratar novos tipos de dados — avisamos de
                forma visível no site.
              </p>
            </Seccao>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
