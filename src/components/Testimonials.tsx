import { Quote, Star } from "lucide-react";
import { stagger } from "../lib/stagger.ts";
import { company } from "../data/company.ts";

/** Real customer reviews from company.ts. Hidden while the list is empty – no invented reviews. */
export default function Testimonials() {
  if (company.testimonials.length === 0) return null;
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Atsiliepimai</p>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl" data-reveal>Ką sako klientai</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {company.testimonials.map((t, i) => (
            <li key={t.name + i} data-reveal style={stagger(i % 3)}
              className="flex flex-col rounded-md border border-line bg-white p-7">
              <Quote className="h-7 w-7 text-amber" aria-hidden="true" />
              {t.rating && (
                <p className="mt-4 flex gap-0.5" aria-label={`Įvertinimas: ${t.rating} iš 5`}>
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} className={`h-4 w-4 ${k < t.rating! ? "fill-amber text-amber" : "text-line"}`} aria-hidden="true" />
                  ))}
                </p>
              )}
              <blockquote className="mt-3 flex-1 text-ink">„{t.text}“</blockquote>
              <p className="mt-5 text-sm font-semibold text-navy">
                {t.name}
                {t.area && <span className="font-normal text-muted"> · {t.area}</span>}
                {t.source && <span className="font-normal text-muted"> · {t.source}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
