import { Link, useParams } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "../components/PageHeader.tsx";
import Photo from "../components/Photo.tsx";
import PhoneCallout from "../components/PhoneCallout.tsx";
import CtaBand from "../components/CtaBand.tsx";
import NotFound from "./NotFound.tsx";
import { serviceBySlug, services } from "../data/services.ts";

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;

  const others = services.filter((x) => x.slug !== s.slug);
  const quoteLink = `/kontaktai?paslauga=${encodeURIComponent(s.formValue)}#uzklausa`;

  return (
    <>
      <PageHeader
        eyebrow="Paslauga"
        title={s.title}
        lead={s.summary}
        crumbs={[{ to: "/", label: "Pagrindinis" }, { to: "/paslaugos", label: "Paslaugos" }, { label: s.short }]}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to={quoteLink} className="btn btn-primary">
            Gauti pasiūlymą <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Apie paslaugą</h2>
            <div className="prose-lt mt-5 text-lg text-muted">
              {s.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>

            <h3 className="mt-12 text-xl font-bold">Ką apima darbai</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {s.includes.map((x) => (
                <li key={x} className="flex items-start gap-3 border-b border-line pb-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            <div className="aspect-[4/3] overflow-hidden rounded-md">
              <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw" priority />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-md lg:aspect-[16/9]">
              <Photo name={s.secondaryImage} alt={s.secondaryAlt} sizes="(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications + benefits */}
      <section className="bg-navy py-16 text-white md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow !text-amber">Tipiniai atvejai</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white">Kada kreipiasi klientai</h2>
            <ul className="mt-8 space-y-4">
              {s.applications.map((a) => (
                <li key={a} className="border-l-2 border-amber pl-4 text-white/85">{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-amber">Nauda</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white">Ką gaunate</h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-3">
              {s.benefits.map((b, i) => (
                <li key={b.title} className="bg-navy-2 p-6">
                  <span className="font-display text-sm font-bold text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{b.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-white/70">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PhoneCallout />

      {/* Related services */}
      <section className="pt-16 md:pt-24">
        <div className="wrap">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Kitos paslaugos</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/paslaugos/${o.slug}`} className="img-zoom group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-md">
                    <Photo name={o.image} alt={o.imageAlt} sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <h3 className="mt-3 flex items-center gap-1.5 text-lg font-bold group-hover:text-blue">
                    {o.short} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Reikia paslaugos „${s.short}“?`}
        query={`?paslauga=${encodeURIComponent(s.formValue)}`}
        photo={s.secondaryImage}
        photoAlt={s.secondaryAlt}
      />
    </>
  );
}
