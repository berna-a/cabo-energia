const items = [
  "Stock em Cabo Verde",
  "Contacto em 24 horas",
  "Processo 100% claro",
  "Logística inter-ilhas",
];

export function Marquee() {
  // Repeat content twice for a seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden bg-white"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
      aria-hidden
    >
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
  );
}
