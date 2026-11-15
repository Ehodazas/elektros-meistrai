import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.tsx";

// BASE_URL is "/" or "/<repo>/" (GitHub Pages). Router needs it without trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root")!;
// Production pages are prerendered (scripts/postbuild.ts) → hydrate; dev server → render.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

// Tells the inline script in index.html that the app is running (see reveal fallback there).
(window as Window & { __appReady?: boolean }).__appReady = true;
