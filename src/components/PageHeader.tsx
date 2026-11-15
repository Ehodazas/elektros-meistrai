import type { ReactNode } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { to?: string; label: string };

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Subtle technical grid – purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to left, black, transparent 70%)",
        }}
      />
      <div className="wrap relative py-14 md:py-20">
        <nav aria-label="Naršymo kelias" className="mb-8 text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-1.5">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white/90">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow !text-amber">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-[2.25rem] font-extrabold text-white sm:text-5xl lg:text-[3.5rem]">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-white/75">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
