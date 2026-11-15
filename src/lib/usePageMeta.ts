import { useEffect } from "react";
import { useLocation } from "react-router";
import { seoFor } from "../data/seo.ts";

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Keeps <title>, description, canonical and Open Graph tags in sync on client-side
 * navigation. The first load already has them baked in by scripts/postbuild.ts.
 */
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoFor(pathname);
    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    if (seo.ogImage && SITE_URL) {
      setMeta("property", "og:image", `${SITE_URL}/images/og-${seo.ogImage}.jpg`);
    }
    const isNotFound = seo.path === "/404";
    setMeta("name", "robots", isNotFound ? "noindex" : "index, follow");

    if (SITE_URL && !isNotFound) {
      // Trailing slash matches the prerendered folders (dist/<route>/index.html).
      const href = SITE_URL + (seo.path === "/" ? "/" : `${seo.path}/`);
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
      setMeta("property", "og:url", href);
    }
  }, [pathname]);
}
