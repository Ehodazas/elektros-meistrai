import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo.tsx";
import { services } from "../data/services.ts";
import { stagger } from "../lib/stagger.ts";

/**
 * Desktop: numbered list on the left, a large photo on the right that crossfades to the
 * hovered / focused service. Phones and tablets: the same list as image cards.
 */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <ol className="grid gap-5 sm:grid-cols-2 lg:block lg:gap-0 lg:border-t lg:border-line">
        {services.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.slug} data-reveal style={stagger(i)} className="lg:border-b lg:border-line">
              <Link
                to={`/paslaugos/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group img-zoom flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_18px_40px_-24px_rgba(16,29,48,0.45)] lg:h-auto lg:flex-row lg:items-center lg:gap-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-2 lg:py-6 lg:hover:translate-y-0 lg:hover:shadow-none"
              >
                {/* Card image – phones/tablets only */}
                <div className="aspect-[16/10] overflow-hidden lg:hidden">
                  <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
                <span
                  className={`hidden w-14 shrink-0 font-display text-4xl font-extrabold tabular-nums transition-colors duration-300 lg:block ${
                    on ? "text-amber" : "text-line group-hover:text-slate-300"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col p-5 lg:p-0">
                  <span className="font-display text-xs font-bold text-blue lg:hidden">{String(i + 1).padStart(2, "0")}</span>
                  <h3
                    className={`mt-1 text-lg font-bold transition-colors duration-300 lg:mt-0 lg:text-[1.65rem] lg:font-extrabold ${
                      on ? "lg:text-navy" : "lg:text-slate-400"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-2 text-[0.95rem] text-muted lg:grid lg:transition-[grid-template-rows,opacity,margin] lg:duration-500 ${
                      on ? "lg:mt-2 lg:grid-rows-[1fr] lg:opacity-100" : "lg:mt-0 lg:grid-rows-[0fr] lg:opacity-0"
                    }`}
                  >
                    <span className="line-clamp-3 lg:overflow-hidden lg:line-clamp-none">{s.summary}</span>
                  </p>
                </div>
                <ArrowUpRight
                  className={`hidden h-7 w-7 shrink-0 transition-[transform,color] duration-300 lg:block ${
                    on ? "translate-x-0 text-blue" : "-translate-x-2 text-line"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Large crossfading photo – desktop only */}
      <div className="relative hidden lg:block" data-reveal="right">
        <div className="sticky top-28 aspect-[4/5] max-h-[38rem] w-full overflow-hidden rounded-md bg-navy">
          {services.map((s, i) => (
            <div
              key={s.slug}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            >
              <Photo name={s.image} alt={i === active ? s.imageAlt : ""} sizes="(min-width: 1024px) 560px, 0px" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="font-display text-sm font-bold text-amber">{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-white">{current.short}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {current.includes.slice(0, 3).map((x) => (
                <li key={x} className="rounded-sm border border-white/25 bg-navy/40 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-white/85">{x}</li>
              ))}
            </ul>
            <Link to={`/paslaugos/${current.slug}`} className="btn btn-primary mt-6">
              Plačiau apie paslaugą <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          {/* Progress ticks */}
          <div className="absolute top-6 right-6 flex gap-1.5" aria-hidden="true">
            {services.map((s, i) => (
              <span key={s.slug} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-amber" : "w-3 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
