import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowUp, Phone } from "lucide-react";
import { company, hasPhone } from "../data/company.ts";

/**
 * Desktop-only floating buttons that appear after scrolling: call (or contact page
 * while no number is configured) and back to top. Phones use MobileCallBar instead.
 */
export default function FloatingCall() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "grid h-14 w-14 place-items-center rounded-full shadow-lg transition-[transform,background-color] duration-200 hover:-translate-y-0.5";

  return (
    <div
      className={`fixed right-6 bottom-6 z-30 hidden flex-col items-end gap-3 transition-[opacity,transform] duration-300 min-[1440px]:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${base} h-11 w-11 bg-white text-navy hover:bg-paper`}
        aria-label="Į puslapio viršų"
        tabIndex={show ? 0 : -1}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
      {hasPhone ? (
        <a href={`tel:${company.phone}`} className={`${base} bg-amber text-navy`} aria-label="Skambinti" tabIndex={show ? 0 : -1}>
          <Phone className="h-6 w-6" aria-hidden="true" />
        </a>
      ) : (
        <Link to="/kontaktai#uzklausa" className={`${base} bg-amber text-navy`} aria-label="Gauti pasiūlymą" tabIndex={show ? 0 : -1}>
          <Phone className="h-6 w-6" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
