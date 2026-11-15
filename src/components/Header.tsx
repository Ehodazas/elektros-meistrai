import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.tsx";
import PhoneLink from "./PhoneLink.tsx";

export const navItems = [
  { to: "/", label: "Pagrindinis", end: true },
  { to: "/paslaugos", label: "Paslaugos", end: false },
  { to: "/atlikti-darbai", label: "Atlikti darbai", end: false },
  { to: "/apie-mus", label: "Apie mus", end: false },
  { to: "/kontaktai", label: "Kontaktai", end: false },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    // The panel hangs below the header; size it to the remaining viewport height
    // (the demo banner may still be visible above the header).
    const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 72;
    setPanelHeight(window.innerHeight - bottom);
    setOpen((v) => !v);
  };

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, Escape closes, keep focus inside.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll<HTMLElement>("a, button")];
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 font-display text-[0.93rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-amber after:transition-transform after:duration-200 ${
      isActive ? "text-navy after:scale-x-100" : "text-muted hover:text-navy after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgba(16,29,48,0.25)]" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-[72px] items-center gap-6">
        <Logo />

        <nav aria-label="Pagrindinis meniu" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-6">
          <PhoneLink className="hidden items-center gap-2 font-display text-[0.93rem] font-bold text-navy hover:text-blue xl:inline-flex" />
          <Link to="/kontaktai#uzklausa" className="btn btn-primary hidden sm:inline-flex">
            Gauti pasiūlymą
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-sm text-navy hover:bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
            onClick={toggle}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        style={{ height: panelHeight || undefined }}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-72px)] overflow-y-auto bg-navy text-white lg:hidden"
      >
        <nav aria-label="Mobilusis meniu" className="wrap flex min-h-full flex-col py-6">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center justify-between py-3 font-display text-xl font-bold ${isActive ? "text-amber" : "text-white"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span className="sr-only"> (dabartinis puslapis)</span>}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to="/kontaktai#uzklausa" className="btn btn-primary w-full">
              Gauti pasiūlymą
            </Link>
            <PhoneLink className="btn btn-outline-light w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
