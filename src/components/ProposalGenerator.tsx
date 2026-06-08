import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logoCor from "@/assets/logo-cor.webp";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const GREEN = "#1A5C3A";
const DARK = "#0D2B1F";
const YELLOW = "#F5C842";
const LIGHT = "#F0F7F2";

type TipoPropriedade = "Residencial" | "Comercial";
type TipoTelhado = "Telha" | "Terraço" | "Chapa";
type Ligacao = "Monofásico" | "Trifásico";
type NomeKit =
  | "Casa Autonomia"
  | "Casa Família"
  | "Casa Prestige"
  | "Negócio Essencial"
  | "Negócio Corporativo";

interface KitInfo {
  nome: NomeKit;
  prodDiaria: string;
  poupancaMensal: string;
  payback: string;
  backup: string;
  componentes: string[];
}

const KITS: KitInfo[] = [
  {
    nome: "Casa Autonomia",
    prodDiaria: "14,9 kWh/dia",
    poupancaMensal: "10.000 CVE",
    payback: "1–2 anos",
    backup: "~6h",
    componentes: ["6× Painel 585Wp", "Inversor híbrido 5 kW", "Bateria LiFePO4 5 kWh", "Estrutura e cablagem", "Instalação e comissionamento"],
  },
  {
    nome: "Casa Família",
    prodDiaria: "29,8 kWh/dia",
    poupancaMensal: "20.000 CVE",
    payback: "1–2 anos",
    backup: "~12h",
    componentes: ["12× Painel 585Wp", "2× Inversor 5 kW (10 kW)", "Bateria LiFePO4 10 kWh", "Estrutura e cablagem", "Instalação e comissionamento", "Monitorização remota"],
  },
  {
    nome: "Casa Prestige",
    prodDiaria: "59,6 kWh/dia",
    poupancaMensal: "50.000 CVE",
    payback: "1–2 anos",
    backup: "~18h",
    componentes: ["24× Painel 585Wp", "Inversor 15 kW", "Bateria LiFePO4 15 kWh", "Estrutura e cablagem", "Instalação e comissionamento", "Monitorização remota"],
  },
  {
    nome: "Negócio Essencial",
    prodDiaria: "59,6 kWh/dia",
    poupancaMensal: "50.000 CVE",
    payback: "1–2 anos",
    backup: "~6h",
    componentes: ["24× Painel 585Wp", "Inversor 15 kW", "Bateria LiFePO4 15 kWh", "Estrutura industrial", "Instalação e comissionamento", "Monitorização remota"],
  },
  {
    nome: "Negócio Corporativo",
    prodDiaria: "119,3 kWh/dia",
    poupancaMensal: "100.000 CVE",
    payback: "1–2 anos",
    backup: "~12h",
    componentes: ["48× Painel 585Wp", "2× Inversor 15 kW (30 kW)", "Bateria LiFePO4 30 kWh", "Estrutura industrial", "Monitorização remota 24/7", "Contrato de manutenção 1 ano"],
  },
];

interface FormData {
  // Cliente
  nomeCliente: string;
  moradaRua: string;
  moradaCidade: string;
  telefone: string;
  email: string;
  fotoCasa: string | null; // base64

  // Propriedade
  tipo: TipoPropriedade;
  telhado: TipoTelhado;
  ligacao: Ligacao;
  quartos: string;
  negocioTipo: string;
  equipamentos: string;
  faturaMensal: string;
  numPessoas: string;

  // Kit
  kitSelecionado: NomeKit;
  preco: string;
  observacoes: string;

  // Proposta
  numeroPropostaPart: string;
  vendedor: string;
  vendedorTel: string;
}

function today() {
  return new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}

function formatCVE(value: number) {
  return value.toLocaleString("pt-PT") + " CVE";
}

export function ProposalGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const [form, setForm] = useState<FormData>({
    nomeCliente: "",
    moradaRua: "",
    moradaCidade: "",
    telefone: "",
    email: "",
    fotoCasa: null,
    tipo: "Residencial",
    telhado: "Telha",
    ligacao: "Monofásico",
    quartos: "",
    negocioTipo: "",
    equipamentos: "",
    faturaMensal: "",
    numPessoas: "",
    kitSelecionado: "Casa Autonomia",
    preco: "",
    observacoes: "",
    numeroPropostaPart: String(Math.floor(Math.random() * 900) + 100),
    vendedor: "Kevin",
    vendedorTel: "995 41 81",
  });

  const kit = KITS.find((k) => k.nome === form.kitSelecionado)!;
  const faturaMensalNum = parseFloat(form.faturaMensal.replace(/\D/g, "")) || 0;
  const custoAnual = faturaMensalNum * 12;
  const precoNum = parseFloat(form.preco.replace(/\D/g, "")) || 0;
  const dataPropostaFormatada = today();
  const numeroCompleto = `CE-${new Date().getFullYear()}-${form.numeroPropostaPart}`;

  function set(key: keyof FormData, value: string | null) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("fotoCasa", reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleExport() {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const canvasH = (canvas.height * pdfW) / canvas.width;

      if (canvasH <= pdfH) {
        pdf.addImage(imgData, "JPEG", 0, 0, pdfW, canvasH);
      } else {
        // Multi-page: slice canvas into A4 chunks
        let yOffset = 0;
        const pageHeightPx = (pdfH / pdfW) * canvas.width;
        while (yOffset < canvas.height) {
          const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceH;
          const ctx = pageCanvas.getContext("2d")!;
          ctx.drawImage(canvas, 0, -yOffset);
          const pageImg = pageCanvas.toDataURL("image/jpeg", 0.95);
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(pageImg, "JPEG", 0, 0, pdfW, (sliceH * pdfW) / canvas.width);
          yOffset += sliceH;
        }
      }

      const nomeSlug = form.nomeCliente.replace(/\s+/g, "_") || "Cliente";
      const dataSlug = new Date().toISOString().slice(0, 10);
      pdf.save(`Proposta_${nomeSlug}_${dataSlug}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div style={{ fontFamily: FONT, minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: DARK,
            marginBottom: 4,
          }}
        >
          Gerador de Propostas
        </h1>
        <p style={{ fontSize: 13, color: "rgba(13,43,31,0.55)", marginBottom: 32 }}>
          Preencha os dados do cliente e o kit recomendado. A proposta é gerada em tempo real.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(340px,420px) 1fr",
            gap: 32,
            alignItems: "start",
          }}
          className="flex flex-col md:grid"
        >
          {/* ── Formulário ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              border: "1px solid rgba(26,92,58,0.1)",
            }}
          >
            <Section title="Cliente">
              <Field label="Nome completo *" value={form.nomeCliente} onChange={(v) => set("nomeCliente", v)} placeholder="Ex: João Silva" />
              <Field label="Rua / Morada" value={form.moradaRua} onChange={(v) => set("moradaRua", v)} placeholder="Ex: Rua da Paz, 12" />
              <Field label="Cidade" value={form.moradaCidade} onChange={(v) => set("moradaCidade", v)} placeholder="Ex: Praia" />
              <Field label="Telefone" value={form.telefone} onChange={(v) => set("telefone", v)} />
              <Field label="Email" value={form.email} onChange={(v) => set("email", v)} />
              <div>
                <label style={labelStyle}>Foto da casa/negócio</label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    height: 38,
                    marginTop: 4,
                    border: "1px dashed rgba(26,92,58,0.35)",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: GREEN,
                    background: LIGHT,
                    cursor: "pointer",
                  }}
                >
                  {form.fotoCasa ? "Trocar foto" : "⬆ Carregar foto"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoUpload}
                    style={{ display: "none" }}
                  />
                </label>
                {form.fotoCasa && (
                  <img
                    src={form.fotoCasa}
                    alt="preview"
                    style={{
                      marginTop: 8,
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
              </div>
            </Section>

            <Section title="Propriedade">
              <SelectField
                label="Tipo"
                value={form.tipo}
                options={["Residencial", "Comercial"]}
                onChange={(v) => set("tipo", v as TipoPropriedade)}
              />
              <SelectField
                label="Tipo de telhado"
                value={form.telhado}
                options={["Telha", "Terraço", "Chapa"]}
                onChange={(v) => set("telhado", v as TipoTelhado)}
              />
              <SelectField
                label="Ligação actual"
                value={form.ligacao}
                options={["Monofásico", "Trifásico"]}
                onChange={(v) => set("ligacao", v as Ligacao)}
              />
              {form.tipo === "Residencial" ? (
                <Field label="Nº de quartos" value={form.quartos} onChange={(v) => set("quartos", v)} placeholder="Ex: 3" />
              ) : (
                <Field label="Tipo de negócio" value={form.negocioTipo} onChange={(v) => set("negocioTipo", v)} placeholder="Ex: Restaurante, Oficina" />
              )}
              <Field label="Equipamentos principais" value={form.equipamentos} onChange={(v) => set("equipamentos", v)} placeholder="Ex: Ar condicionado, frigorífico..." />
              <Field label="Fatura eléctrica mensal (CVE)" value={form.faturaMensal} onChange={(v) => set("faturaMensal", v)} placeholder="Ex: 15000" />
              <Field label="Nº pessoas / funcionários" value={form.numPessoas} onChange={(v) => set("numPessoas", v)} placeholder="Ex: 4" />
            </Section>

            <Section title="Kit Recomendado">
              <SelectField
                label="Kit"
                value={form.kitSelecionado}
                options={["Casa Autonomia", "Casa Família", "Casa Prestige", "Negócio Essencial", "Negócio Corporativo"]}
                onChange={(v) => set("kitSelecionado", v as NomeKit)}
              />
              <Field label="Preço final (CVE)" value={form.preco} onChange={(v) => set("preco", v)} placeholder="Ex: 850000" />
              <div>
                <label style={labelStyle}>Observações técnicas</label>
                <textarea
                  value={form.observacoes}
                  onChange={(e) => set("observacoes", e.target.value)}
                  rows={3}
                  style={{
                    ...inputStyle,
                    height: "auto",
                    resize: "vertical",
                    padding: "8px 12px",
                  }}
                  placeholder="Notas do levantamento técnico..."
                />
              </div>
              <Field label="Nº Proposta" value={form.numeroPropostaPart} onChange={(v) => set("numeroPropostaPart", v)} />
              <Field label="Vendedor" value={form.vendedor} onChange={(v) => set("vendedor", v)} placeholder="Ex: Kevin" />
              <Field label="Contacto do vendedor" value={form.vendedorTel} onChange={(v) => set("vendedorTel", v)} placeholder="Ex: 995 41 81" />
            </Section>

            <button
              onClick={handleExport}
              disabled={exporting || !form.nomeCliente.trim()}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 999,
                background: GREEN,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                border: "none",
                cursor: exporting || !form.nomeCliente.trim() ? "not-allowed" : "pointer",
                opacity: exporting || !form.nomeCliente.trim() ? 0.6 : 1,
                fontFamily: FONT,
                marginTop: 8,
              }}
            >
              {exporting ? "A exportar..." : "⬇ Exportar PDF"}
            </button>
          </div>

          {/* ── Preview ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(26,92,58,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid rgba(26,92,58,0.1)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(13,43,31,0.45)",
              }}
            >
              Preview da Proposta
            </div>
            <div
              ref={previewRef}
              style={{ fontFamily: FONT, background: "#fff" }}
            >
              {/* Página 1 — Capa */}
              <div
                style={{
                  background: `linear-gradient(160deg, ${DARK} 0%, ${GREEN} 100%)`,
                  padding: "48px 40px 40px",
                  color: "#fff",
                  minHeight: 320,
                  position: "relative",
                }}
              >
                <img src={logoCor} alt="Cabo Energia" style={{ height: 48, objectFit: "contain", marginBottom: 32, filter: "brightness(0) invert(1)" }} />
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: YELLOW,
                    marginBottom: 12,
                  }}
                >
                  Proposta de Protecção Energética
                </div>
                <h1
                  style={{
                    fontSize: "clamp(22px, 3vw, 36px)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    margin: "0 0 24px",
                  }}
                >
                  {form.nomeCliente || "Nome do Cliente"}
                </h1>
                <div style={{ display: "flex", gap: 32, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>Data</div>
                    {dataPropostaFormatada}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>Proposta</div>
                    {numeroCompleto}
                  </div>
                  {(form.moradaRua || form.moradaCidade) && (
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>Localização</div>
                      {[form.moradaRua, form.moradaCidade].filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
                {form.fotoCasa && (
                  <img
                    src={form.fotoCasa}
                    alt="Propriedade"
                    style={{
                      position: "absolute",
                      right: 40,
                      top: 40,
                      width: 180,
                      height: 140,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "3px solid rgba(255,255,255,0.2)",
                    }}
                  />
                )}
              </div>

              {/* Página 2 — O Problema */}
              <div style={{ padding: "40px", background: LIGHT }}>
                <SectionHeader color={GREEN} overline="Situação Actual" title="O custo invisível da electricidade" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginTop: 24,
                  }}
                >
                  <StatBox
                    label="Gasto mensal estimado"
                    value={faturaMensalNum > 0 ? formatCVE(faturaMensalNum) : "—"}
                    sub="Com a rede pública"
                    accent={false}
                  />
                  <StatBox
                    label="Gasto anual estimado"
                    value={custoAnual > 0 ? formatCVE(custoAnual) : "—"}
                    sub="Dinheiro que poderia poupar"
                    accent
                  />
                </div>
                <p
                  style={{
                    marginTop: 20,
                    fontSize: 13,
                    color: "rgba(13,43,31,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  Em Cabo Verde, a rede pública sofre cortes frequentes e a tarifa eléctrica
                  está entre as mais altas da África Ocidental. Com um sistema solar Cabo Energia,{" "}
                  {form.nomeCliente || "o seu negócio"} deixa de depender da ELECTRA e passa a
                  controlar a sua própria energia.
                </p>
              </div>

              {/* Página 3 — A Solução */}
              <div style={{ padding: "40px", background: "#fff" }}>
                <SectionHeader color={GREEN} overline="A Solução" title={kit.nome} />
                <div
                  style={{
                    marginTop: 20,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <StatBox label="Produção diária" value={kit.prodDiaria} sub="" accent={false} />
                  <StatBox label="Poupança mensal" value={kit.poupancaMensal} sub="" accent />
                  <StatBox label="Retorno do investimento" value={kit.payback} sub="" accent={false} />
                  <StatBox label="Autonomia em apagão" value={kit.backup} sub="" accent={false} />
                </div>
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(13,43,31,0.45)",
                      marginBottom: 10,
                    }}
                  >
                    Componentes incluídos
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {kit.componentes.map((c) => (
                      <li
                        key={c}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: 13,
                          color: DARK,
                          padding: "4px 0",
                          borderBottom: "1px solid rgba(26,92,58,0.06)",
                        }}
                      >
                        <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                {form.observacoes && (
                  <div
                    style={{
                      marginTop: 20,
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: LIGHT,
                      fontSize: 12,
                      color: "rgba(13,43,31,0.7)",
                      fontStyle: "italic",
                      borderLeft: `3px solid ${GREEN}`,
                    }}
                  >
                    <strong>Nota técnica:</strong> {form.observacoes}
                  </div>
                )}
              </div>

              {/* Página 4 — O Processo */}
              <div style={{ padding: "40px", background: LIGHT }}>
                <SectionHeader color={GREEN} overline="Como funciona" title="5 passos. Sem complicações." />
                <div style={{ marginTop: 20 }}>
                  {[
                    { n: "01", t: "Levantamento", d: "Visita técnica ao local (5.000 CVE, dedutível)." },
                    { n: "02", t: "Orçamento", d: "Plano de protecção energética personalizado." },
                    { n: "03", t: "Contrato + 50%", d: "Assinatura e pagamento de entrada." },
                    { n: "04", t: "Instalação", d: "Equipa certificada, materiais em stock local." },
                    { n: "05", t: "Suporte", d: "Acompanhamento, manutenção e garantia Suntech." },
                  ].map((s) => (
                    <div
                      key={s.n}
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(26,92,58,0.08)",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: GREEN,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {s.n}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{s.t}</div>
                        <div style={{ fontSize: 12, color: "rgba(13,43,31,0.6)", marginTop: 2 }}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 24,
                    padding: "16px",
                    borderRadius: 12,
                    background: `rgba(245,200,66,0.12)`,
                    border: `1px solid rgba(245,200,66,0.4)`,
                    fontSize: 12,
                    color: DARK,
                  }}
                >
                  <strong>Garantias:</strong> Painéis Suntech 25 anos · Inversor 10 anos · Mão-de-obra 2 anos
                </div>
              </div>

              {/* Página 5 — Investimento */}
              <div
                style={{
                  padding: "40px",
                  background: `linear-gradient(160deg, ${DARK} 0%, ${GREEN} 100%)`,
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: YELLOW,
                    marginBottom: 8,
                  }}
                >
                  Investimento
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 24px" }}>
                  {kit.nome}
                </h2>

                <div style={{ display: "flex", gap: 32, alignItems: "flex-end", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: YELLOW, lineHeight: 1 }}>
                      {precoNum > 0 ? formatCVE(precoNum) : "Sob orçamento"}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                      {precoNum > 0
                        ? "Investimento total, instalação incluída"
                        : "Valor definido após levantamento técnico"}
                    </div>
                  </div>
                </div>

                {precoNum > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
                    <PaymentBox label="Entrada (50%)" value={formatCVE(Math.round(precoNum * 0.5))} />
                    <PaymentBox label="Após instalação (50%)" value={formatCVE(Math.round(precoNum * 0.5))} />
                  </div>
                )}

                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    fontSize: 13,
                    marginBottom: 20,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  ⏱ Esta proposta é válida por <strong style={{ color: "#fff" }}>30 dias</strong> a partir de {dataPropostaFormatada}.
                </div>

                <div
                  style={{
                    background: YELLOW,
                    borderRadius: 12,
                    padding: "16px 20px",
                    color: DARK,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Para avançar, contacte {form.vendedor || "a Cabo Energia"}:
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{form.vendedorTel || "995 41 81"}</div>
                  <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>WhatsApp disponível</div>
                </div>
              </div>

              {/* Página 6 — Sobre a Cabo Energia */}
              <div style={{ padding: "40px", background: LIGHT }}>
                <SectionHeader color={GREEN} overline="Quem somos" title="Cabo Energia" />
                <p style={{ marginTop: 16, fontSize: 13, color: "rgba(13,43,31,0.7)", lineHeight: 1.7 }}>
                  A Cabo Energia é especialista em sistemas fotovoltaicos com armazenamento em Cabo Verde.
                  Trabalhamos com equipamento Suntech certificado, com stock local em Praia para instalações
                  sem esperas. Em parceria com a ENGTEC, garantimos projecto, instalação e suporte pós-venda
                  de excelência.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginTop: 20,
                  }}
                >
                  {[
                    ["Stock local em Praia", "Resposta imediata sem importações de emergência"],
                    ["Contacto em 24h", "Toda a lead recebe primeiro contacto em até 24 horas"],
                    ["Instalação Chave-na-Mão", "Do levantamento à última ligação eléctrica"],
                    ["Garantia Suntech", "25 anos nos painéis, 10 anos no inversor"],
                  ].map(([t, d]) => (
                    <div
                      key={t}
                      style={{
                        padding: "14px 16px",
                        background: "#fff",
                        borderRadius: 10,
                        border: "1px solid rgba(26,92,58,0.1)",
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 4 }}>
                        {t}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(13,43,31,0.6)", lineHeight: 1.5 }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(26,92,58,0.12)",
                    paddingTop: 20,
                  }}
                >
                  <div>
                    <img src={logoCor} alt="Cabo Energia" style={{ height: 36, objectFit: "contain" }} />
                    <div style={{ fontSize: 11, color: "rgba(13,43,31,0.5)", marginTop: 4 }}>
                      Achada Grande Frente · Praia · Santiago · Cabo Verde
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(13,43,31,0.5)" }}>
                      995 41 81 · contacto@caboenergia.cv · caboenergia.cv
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(13,43,31,0.45)", textAlign: "right" }}>
                    In Partnership with
                    <div style={{ fontSize: 14, fontWeight: 800, color: DARK }}>ENGTEC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(13,43,31,0.5)",
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 38,
  border: "1px solid rgba(26,92,58,0.2)",
  borderRadius: 8,
  padding: "0 12px",
  fontSize: 13,
  fontFamily: FONT,
  color: DARK,
  outline: "none",
  boxSizing: "border-box",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: GREEN,
          marginBottom: 12,
          paddingBottom: 6,
          borderBottom: `2px solid ${GREEN}`,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionHeader({
  color,
  overline,
  title,
}: {
  color: string;
  overline: string;
  title: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color,
          marginBottom: 6,
        }}
      >
        {overline}
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: 0, lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
  );
}

function StatBox({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: boolean;
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: 12,
        background: accent ? GREEN : "#fff",
        border: accent ? "none" : "1px solid rgba(26,92,58,0.12)",
        color: accent ? "#fff" : DARK,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function PaymentBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{value}</div>
    </div>
  );
}
