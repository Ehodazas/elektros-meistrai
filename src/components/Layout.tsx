import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Clock, Info, MapPin } from "lucide-react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import MobileCallBar from "./MobileCallBar.tsx";
import FloatingCall from "./FloatingCall.tsx";
import PhoneLink from "./PhoneLink.tsx";
import { company } from "../data/company.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";
import { useReveal } from "../lib/useReveal.ts";

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
  useReveal();

  return (
    <div className="flex min-h-dvh flex-col pb-[68px] lg:pb-0">
      <a
        href="#turinys"
        className="sr-only z-50 rounded-sm bg-amber px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pereiti prie turinio
      </a>

      {/* Top info bar */}
      <div className="bg-ink text-[0.8rem] text-white/80">
        <div className="wrap flex items-center justify-between gap-4 py-2">
          {company.demoMode ? (
            <p className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 text-amber" aria-hidden="true" />
              <span>
                Demonstracinė svetainė: įmonė, kontaktai ir projektai yra pavyzdiniai.{" "}
                <Link to="/apie-mus#demo" className="underline underline-offset-2 hover:text-white">Daugiau</Link>
              </span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-amber" aria-hidden="true" />
              {company.serviceArea || "Elektros darbai namams ir verslui"}
            </p>
          )}
          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              {company.hours[0].days.replace("Pirmadienis–penktadienis", "I–V")} {company.hours[0].time}
            </span>
            <PhoneLink className="flex items-center gap-1.5 font-semibold text-white hover:text-amber" iconClassName="h-3.5 w-3.5 text-amber" />
          </div>
        </div>
      </div>

      <Header />
      <main id="turinys" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
      <FloatingCall />
    </div>
  );
}
