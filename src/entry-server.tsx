import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.tsx";

/**
 * Build-time rendering used by scripts/postbuild.ts: returns the full HTML of a route so
 * search engines and link previews get real content without running JavaScript.
 * `url` is the path without the base, e.g. "/paslaugos".
 */
export function render(url: string): string {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  const location = (basename === "/" ? "" : basename) + url;
  return renderToString(
    <StrictMode>
      <StaticRouter location={location} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
