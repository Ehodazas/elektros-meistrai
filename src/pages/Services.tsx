import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "../components/PageHeader.tsx";
import Photo from "../components/Photo.tsx";
import PhoneCallout from "../components/PhoneCallout.tsx";
import CtaBand from "../components/CtaBand.tsx";
import { services } from "../data/services.ts";

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Paslaugos"
        title="Elektros darbai namams ir verslui"
        lead="Nuo vieno lizdo iki visos instaliacijos. Kainą visada nurodome sąmatoje po apžiūros – be fiksuotų kainoraščių, kurie neatspindi realios darbų apimties."
        crumbs={[{ to: "/", label: "Pagrindinis" }, { label: "Paslaugos" }]}
      >
        <nav aria-label="Paslaugų sąrašas" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center rounded-sm border border-white/20 px-4 text-sm font-semibold text-white/85 hover:border-amber hover:text-white">
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="py-8 md:py-12">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-h`} className="py-10 md:py-16">
            <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={`img-zoom relative aspect-[4/3] overflow-hidden rounded-md ${i % 2 ? "lg:order-2" : ""}`}>
                <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 600px, 100vw" />
                <span className="absolute top-4 left-4 rounded-sm bg-navy px-2.5 py-1 font-display text-sm font-bold text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 id={`${s.slug}-h`} className="text-3xl font-extrabold sm:text-[2.25rem]">{s.title}</h2>
                <p className="mt-4 text-lg text-muted">{s.summary}</p>

                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Ką atliekame</h3>
                    <ul className="mt-3 space-y-2">
                      {s.includes.slice(0, 4).map((x) => (
                        <li key={x} className="flex items-start gap-2 text-[0.95rem]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" /> {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Kada kreiptis</h3>
                    <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                      {s.applications.slice(0, 3).map((x) => (
                        <li key={x} className="border-l-2 border-amber pl-3">{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-7 text-[0.95rem]">
                  <strong className="text-navy">Nauda jums: </strong>
                  <span className="text-muted">{s.benefits.map((b) => b.title.toLowerCase()).join(", ")}.</span>
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={`/kontaktai?paslauga=${encodeURIComponent(s.formValue)}#uzklausa`} className="btn btn-primary">
                    Gauti pasiūlymą
                  </Link>
                  <Link to={`/paslaugos/${s.slug}`} className="btn btn-outline text-navy">
                    Plačiau apie paslaugą <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <PhoneCallout />
      <CtaBand photo="socketWindow" photoAlt="Naujai montuojamas elektros lizdas šviesioje patalpoje" />
    </>
  );
}
