/**
 * Pós-build: gera um HTML estático por rota, com as meta tags certas, e o sitemap.xml.
 *
 * Porquê: o site é uma SPA. Sem isto, todas as rotas servem o mesmo index.html —
 * logo o Google vê o mesmo título/descrição em todas, e o WhatsApp/Facebook
 * (que não correm JavaScript) mostram sempre a mesma pré-visualização.
 *
 * A Vercel serve ficheiros estáticos antes de aplicar os rewrites do vercel.json,
 * por isso /residencial/index.html ganha ao fallback da SPA.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const seo = JSON.parse(await readFile(join(root, "src/seo/pages.json"), "utf8"));
const { siteUrl, ogImage, pages } = seo;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = await readFile(join(dist, "index.html"), "utf8");

/** Substitui o conteúdo de uma meta/title já presente no template. */
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender-seo: padrão não encontrado no index.html — ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

let urls = [];

for (const page of pages) {
  const url = siteUrl + (page.path === "/" ? "/" : page.path);
  let html = template;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(page.description)}">`,
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(page.title)}">`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${esc(page.title)}">`,
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(page.description)}">`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${esc(page.description)}">`,
  );

  // Canonical + og:url são por rota, não existem no template.
  const extra = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    page.noindex ? `<meta name="robots" content="noindex, nofollow" />` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
  html = html.replace("</head>", `    ${extra}\n  </head>`);

  const out = page.path === "/" ? join(dist, "index.html") : join(dist, page.path, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, "utf8");
  console.log(`  ${page.path.padEnd(14)} → ${page.noindex ? "noindex" : "indexável"}`);

  if (!page.noindex) urls.push({ url, page });
}

// sitemap.xml — só rotas indexáveis
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, page }) => `  <url>
    <loc>${esc(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq ?? "monthly"}</changefreq>
    <priority>${page.priority ?? "0.5"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
console.log(`  sitemap.xml    → ${urls.length} URLs`);

// Aviso: og:image tem de ser absoluto para o Facebook/WhatsApp resolverem.
if (!template.includes(siteUrl + ogImage)) {
  console.log(`  nota: og:image deve apontar para ${siteUrl}${ogImage}`);
}
