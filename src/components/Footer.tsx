import { Link } from "react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import Logo from "./Logo.tsx";
import PhoneLink from "./PhoneLink.tsx";
import { navItems } from "./Header.tsx";
import { company, hasEmail, placeholders } from "../data/company.ts";
import { services } from "../data/services.ts";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white/75">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-[0.95rem]">
            Elektros instaliacija, gedimų diagnostika, elektros skydai ir apšvietimas namams ir verslui.
          </p>
          <Link to="/kontaktai#uzklausa" className="btn btn-primary mt-6">Gauti pasiūlymą</Link>
        </div>

        <nav aria-label="Svetainės puslapiai">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Puslapiai</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-amber">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Paslaugos">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Paslaugos</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/paslaugos/${s.slug}`} className="hover:text-amber">{s.short}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Kontaktai</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <PhoneLink className="inline-flex items-center gap-2 hover:text-amber" />
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {hasEmail ? (
                <a href={`mailto:${company.email}`} className="hover:text-amber">{company.email}</a>
              ) : (
                <span>{placeholders.email} <span className="text-white/65">(pavyzdys)</span></span>
              )}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{company.serviceArea || placeholders.serviceArea}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{company.hours[0].days}: {company.hours[0].time}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName || company.name}
            {company.companyCode && <>, įm. k. {company.companyCode}</>}
            {company.demoMode && <> · Demonstracinė svetainė</>}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/privatumo-politika" className="hover:text-white">Privatumo politika</Link>
            <Link to="/privatumo-politika#nuotraukos" className="hover:text-white">Nuotraukos: Pexels</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
