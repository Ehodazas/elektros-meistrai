import { Plus } from "lucide-react";
import { stagger } from "../lib/stagger.ts";
import { faq } from "../data/faq.ts";
import PhoneLink from "./PhoneLink.tsx";

export default function Faq() {
  return (
    <section aria-labelledby="duk-h" className="py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal="left">
          <p className="eyebrow">DUK</p>
          <h2 id="duk-h" className="mt-4 text-3xl font-extrabold sm:text-4xl">Dažniausi klausimai</h2>
          <p className="mt-4 text-muted">Neradote atsakymo? Paskambinkite arba parašykite – pakonsultuosime.</p>
          <PhoneLink className="btn btn-outline mt-6 text-navy" />
        </div>
        <div className="border-t border-line">
          {faq.map((f, i) => (
            <details key={f.q} className="group border-b border-line" data-reveal style={stagger(i)}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-amber group-open:border-amber">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="pr-12 pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
