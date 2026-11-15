import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Info } from "lucide-react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import MobileCallBar from "./MobileCallBar.tsx";
import { company } from "../data/company.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target exists after route render.
      requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}

export default function Layout() {
  usePageMeta();
  useScrollOnNavigate();

  return (
    <div className="flex min-h-dvh flex-col pb-[68px] lg:pb-0">
      <a
        href="#turinys"
        className="sr-only z-50 rounded-sm bg-amber px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pereiti prie turinio
      </a>

      {company.demoMode && (
        <div className="bg-ink text-[0.8rem] text-white/80">
          <div className="wrap flex items-center gap-2 py-2">
            <Info className="h-3.5 w-3.5 shrink-0 text-amber" aria-hidden="true" />
            <p>
              Demonstracinė svetainė: įmonė, kontaktai ir projektai yra pavyzdiniai.{" "}
              <Link to="/apie-mus#demo" className="underline underline-offset-2 hover:text-white">Daugiau</Link>
            </p>
          </div>
        </div>
      )}

      <Header />
      <main id="turinys" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
