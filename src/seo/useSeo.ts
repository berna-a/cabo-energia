import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "./pages.json";

/**
 * Mantém title/description/canonical sincronizados com a rota actual.
 *
 * O HTML estático de cada rota já é gerado no build (scripts/prerender-seo.mjs) —
 * é isso que os motores de busca e o WhatsApp lêem. Este hook trata da navegação
 * dentro da SPA, onde não há novo pedido ao servidor.
 */
function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page =
      seo.pages.find((p) => p.path === pathname) ??
      seo.pages.find((p) => p.path === "/");
    if (!page) return;

    document.title = page.title;
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);

    const url = seo.siteUrl + (page.path === "/" ? "/" : page.path);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Páginas internas nunca devem ser indexadas, mesmo se descobertas por link.
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if ("noindex" in page && page.noindex) {
      setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);
}
