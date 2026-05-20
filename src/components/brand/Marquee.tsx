const items = [
  "Instalação chave-na-mão",
  "Logística inter-ilhas",
  "Parceiro certificado Sunwaytech",
  "Serviço pós-instalação incluído",
];

export function Marquee() {
  // Repeat content twice for a seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className="w-full bg-white"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
      aria-hidden
    >
      <div className="site-container overflow-hidden">
        <div className="flex whitespace-nowrap py-3.5 marquee-track">
          {loop.map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8 text-sm font-medium text-brand-green"
            >
              {item}
              <span className="text-brand-green/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
