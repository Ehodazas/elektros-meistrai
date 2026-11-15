import { Link } from "react-router";
import {
  AlertTriangle, ArrowRight, ArrowUpRight, Building, Building2, CalendarCheck, CarFront, Check, ClipboardList, FileText, Flame, Gauge,
  House, MapPin, MessageSquare, Plug, PowerOff, Radar, Ruler, ShieldCheck, Sparkles, Wrench, Zap, ZapOff,
} from "lucide-react";
import Photo from "../components/Photo.tsx";
import PhoneLink from "../components/PhoneLink.tsx";
import CtaBand from "../components/CtaBand.tsx";
import QuickCallback from "../components/QuickCallback.tsx";
import StatsBand from "../components/StatsBand.tsx";
import Testimonials from "../components/Testimonials.tsx";
import Faq from "../components/Faq.tsx";
import { extraServices, services } from "../data/services.ts";
import { categoryLabels, projects } from "../data/projects.ts";
import { company } from "../data/company.ts";
import { stagger } from "../lib/stagger.ts";

const promises = [
  { icon: ClipboardList, title: "Raštiška sąmata", text: "prieš pradedant darbus" },
  { icon: CalendarCheck, title: "Suderintas laikas", text: "atvykstame, kada sutarta" },
  { icon: Sparkles, title: "Tvarkinga darbo vieta", text: "išvežame atliekas" },
  { icon: FileText, title: "Schema ir paaiškinimai", text: "pridavus darbus" },
];

const steps = [
  { icon: MessageSquare, title: "Užklausa", text: "Aprašote darbus telefonu arba užklausos formoje. Nuotraukos padeda greičiau įvertinti situaciją." },
  { icon: Ruler, title: "Apžiūra", text: "Atvykstame suderintu laiku, apžiūrime objektą ir aptariame jūsų poreikius bei galimus sprendimus." },
  { icon: ClipboardList, title: "Sąmata ir planas", text: "Pateikiame raštišką sąmatą su darbų apimtimi, medžiagomis ir preliminariu terminu." },
  { icon: Wrench, title: "Darbai ir pridavimas", text: "Atliekame darbus, patikriname instaliaciją, paaiškiname, kas padaryta, ir perduodame schemą." },
];

const reasons = [
  { icon: ShieldCheck, title: "Elektros sauga", text: "Netinkamai atlikti elektros darbai gali sukelti gaisrą ar elektros smūgį. Profesionalas žino, kaip parinkti laidus ir apsaugas pagal apkrovas." },
  { icon: FileText, title: "Reikalavimų laikymasis", text: "Elektros įrenginių įrengimą reglamentuoja teisės aktai. Tinkamai įrengta instaliacija svarbi ir parduodant būstą ar keičiant patalpų paskirtį." },
  { icon: Ruler, title: "Matavimai, ne spėjimai", text: "Gedimai nustatomi matavimo prietaisais, todėl keičiama tik tai, kas iš tikrųjų sugedę." },
  { icon: CalendarCheck, title: "Planuojamas rezultatas", text: "Aiški sąmata, darbų eiga ir terminas leidžia suderinti elektros darbus su kitais remonto etapais." },
];

const urgentSigns = [
  { icon: ZapOff, title: "Dingo elektra", text: "visame bute ar tik dalyje patalpų" },
  { icon: PowerOff, title: "Nuolat išmuša automatą", text: "ar nuotėkio srovės jungiklį" },
  { icon: Flame, title: "Kaista laidai ar lizdai", text: "jaučiamas degėsių kvapas" },
  { icon: Zap, title: "Kibirkščiuoja lizdas", text: "girdisi traškėjimas ar zvimbimas" },
];

const extraIcons = { plug: Plug, car: CarFront, gauge: Gauge, motion: Radar, building: Building, meter: Gauge } as const;

export default function Home() {
  const featured = [projects[0], projects[2], projects[5]];
  const [main, ...rest] = services;

  return (
    <>
      {/* HERO – full-bleed photo with callback card */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Photo
            name="heroPanel"
            alt="Elektrikas montuoja automatinius jungiklius šiuolaikiniame elektros skyde"
            sizes="100vw"
            priority
            className="kenburns object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40 lg:via-navy/80 lg:to-navy/10" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
        </div>

        <div className="wrap grid items-center gap-10 py-14 md:py-20 lg:min-h-[40rem] lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-24">
          <div>
            <p className="eyebrow rise !text-amber">Elektriko paslaugos</p>
            <h1 className="rise rise-2 mt-4 text-[2.35rem] font-extrabold text-white sm:text-5xl xl:text-[3.6rem]">
              Patikimi elektros sprendimai <span className="text-amber">jūsų namams ir verslui.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-lg text-white/80">
              Atliekame elektros instaliacijos, gedimų diagnostikos, elektros skydų ir apšvietimo montavimo darbus.
            </p>
            <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/kontaktai#uzklausa" className="btn btn-primary">
                Gauti pasiūlymą <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/paslaugos" className="btn btn-outline-light">Mūsų paslaugos</Link>
            </div>
            <ul className="rise rise-4 mt-10 grid gap-x-6 gap-y-3 text-[0.95rem] text-white/85 sm:grid-cols-2">
              {["Raštiška sąmata prieš darbus", "Butai, namai ir verslas", "Darbai pagal galiojančius reikalavimus", "Švari darbo vieta po darbų"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber text-navy" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rise rise-3 lg:justify-self-end lg:w-full lg:max-w-[26rem]">
            <QuickCallback />
          </div>
        </div>
      </section>

      {/* PROMISES / STATS */}
      <StatsBand />
      <section aria-label="Ką užtikriname" className="border-b border-line bg-white">
        <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4">
          {promises.map((p, i) => (
            <li key={p.title} data-reveal style={stagger(i)} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-blue/10 text-blue" aria-hidden="true">
                <p.icon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display font-bold text-navy">{p.title}</p>
                <p className="text-sm text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div data-reveal="left">
            <p className="eyebrow">Apie {company.name}</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem]">
              Elektros darbai, kuriuos lengva suplanuoti ir kuriais galima pasitikėti.
            </h2>
          </div>
          <div className="space-y-5 text-lg text-muted lg:pt-10" data-reveal="right">
            <p>
              Dirbame butuose, individualiuose namuose ir komercinėse patalpose. Kiekvieną darbą pradedame nuo apžiūros
              ir aiškaus plano, o baigiame patikra ir paaiškinimu, kas buvo padaryta.
            </p>
            <p>
              Jums nereikia išmanyti elektros – užtenka papasakoti, ko reikia. Pasiūlysime sprendimą, pateiksime sąmatą
              ir darbus atliksime suderintu laiku.
            </p>
            <Link to="/apie-mus" className="link-arrow text-base">
              Kaip dirbame <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-line bg-white py-16 md:py-24">
        <div className="wrap">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
            <div>
              <p className="eyebrow">Paslaugos</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Pagrindiniai elektros darbai</h2>
            </div>
            <Link to="/paslaugos" className="link-arrow">
              Visos paslaugos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Link to={`/paslaugos/${main.slug}`} data-reveal="zoom" className="img-zoom group relative flex min-h-[26rem] overflow-hidden rounded-md bg-navy lg:min-h-full">
              <Photo name={main.image} alt={main.imageAlt} sizes="(min-width: 1024px) 600px, 100vw" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" aria-hidden="true" />
              <div className="relative mt-auto p-7 text-white sm:p-9">
                <span className="font-display text-sm font-bold text-amber">01</span>
                <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{main.title}</h3>
                <p className="mt-3 max-w-md text-white/80">{main.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display font-bold text-amber">
                  Plačiau <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <ul className="grid gap-5 sm:grid-cols-2">
              {rest.map((s, i) => (
                <li key={s.slug} data-reveal style={stagger(i)}>
                  <Link
                    to={`/paslaugos/${s.slug}`}
                    className="img-zoom group flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_18px_40px_-24px_rgba(16,29,48,0.45)]"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="font-display text-xs font-bold text-blue">0{i + 2}</span>
                      <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                      <p className="mt-2 line-clamp-3 text-[0.95rem] text-muted">{s.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra services */}
          <div className="mt-16">
            <h3 className="text-2xl font-extrabold" data-reveal>Taip pat atliekame</h3>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {extraServices.map((x, i) => {
                const Icon = extraIcons[x.icon];
                return (
                  <li key={x.title} data-reveal style={stagger(i % 3)} className="group flex gap-4 bg-white p-6 transition-colors hover:bg-paper">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy text-amber transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-navy">{x.title}</p>
                      <p className="mt-1 text-[0.93rem] text-muted">{x.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* URGENT SIGNS */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-amber/10 blur-3xl" />
        <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div data-reveal="left">
            <p className="eyebrow !text-amber">Kada nedelsti</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Ženklai, kad elektriko reikia kuo greičiau</h2>
            <p className="mt-5 text-lg text-white/75">
              Tokie gedimai gali kelti gaisro ar elektros smūgio pavojų. Nebandykite jų taisyti patys ir nelaikykite
              išmušusio automato jėga.
            </p>
            <div className="mt-7 flex gap-3 rounded-md border border-amber/40 bg-amber/10 p-5">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber" aria-hidden="true" />
              <p className="text-white/90">
                <strong className="text-white">Pirmiausia saugumas:</strong> jei kibirkščiuoja ar kaista – skyde išjunkite
                atitinkamą automatinį jungiklį arba visą įvadą ir tik tada skambinkite.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneLink className="btn btn-primary" />
              <Link to="/paslaugos/gedimu-diagnostika" className="btn btn-outline-light">Gedimų diagnostika</Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {urgentSigns.map((u, i) => (
              <li key={u.title} data-reveal style={stagger(i)}
                className="group rounded-md border border-white/10 bg-navy-2 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-amber/50">
                <u.icon className="h-8 w-8 text-amber transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-bold text-white">{u.title}</p>
                <p className="mt-1 text-sm text-white/65">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESIDENTIAL / COMMERCIAL */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">Kam dirbame</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Sprendimai būstui ir verslui</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: House,
                title: "Butai ir namai",
                photo: "villaWinter" as const,
                alt: "Šiuolaikinis gyvenamasis namas žiemą su apšviestais langais",
                text: "Instaliacija naujame name, buto renovacija, skydo keitimas, apšvietimas ir gedimų šalinimas.",
                items: ["Naujos statybos namai", "Butų renovacija", "Virtuvės ir vonios kambariai", "Lauko apšvietimas"],
              },
              {
                icon: Building2,
                title: "Komercinės patalpos",
                photo: "roundLamps" as const,
                alt: "Apvalūs pakabinami šviestuvai šiuolaikinėje komercinėje patalpoje",
                text: "Biurai, prekybos ir paslaugų patalpos, sandėliai. Darbus deriname taip, kad prastovos būtų kuo mažesnės.",
                items: ["Biurų elektros instaliacija", "Apšvietimo modernizavimas", "Skydų įrengimas ir keitimas", "Darbai ne darbo valandomis"],
              },
            ].map((b, i) => (
              <article key={b.title} data-reveal style={stagger(i)} className="img-zoom flex flex-col overflow-hidden rounded-md border border-line bg-white">
                <div className="aspect-[16/9] overflow-hidden">
                  <Photo name={b.photo} alt={b.alt} sizes="(min-width: 768px) 600px, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <b.icon className="h-6 w-6 text-blue" aria-hidden="true" />
                    <h3 className="text-2xl font-extrabold">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-muted">{b.text}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-[0.95rem]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-navy py-16 text-white md:py-24">
        <div className="wrap">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
            <div>
              <p className="eyebrow !text-amber">Atlikti darbai</p>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Pavyzdiniai projektai</h2>
              {company.demoMode && (
                <p className="mt-3 max-w-xl text-sm text-white/60">
                  Demonstracinis turinys: projektai ir nuotraukos iliustruoja darbų tipus, tai nėra realūs įmonės objektai.
                </p>
              )}
            </div>
            <Link to="/atlikti-darbai" className="link-arrow !text-amber">
              Visi darbai <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <li key={p.id} data-reveal style={stagger(i)}>
                <Link to={`/atlikti-darbai?projektas=${p.id}`} className="img-zoom group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-md bg-navy-2">
                    <Photo name={p.images[0].key} alt={p.images[0].alt} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-amber">{categoryLabels[p.category]}</p>
                  <h3 className="mt-1 text-xl font-bold text-white group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-white/65">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">Darbo eiga</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Nuo užklausos iki veikiančios instaliacijos</h2>
          </div>
          <div className="relative mt-12">
            <div aria-hidden="true" className="current-line absolute top-0 right-0 left-0 hidden h-0.5 lg:block" />
            <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal style={stagger(i)} className="group flex flex-col bg-white p-7 transition-colors hover:bg-paper">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-6 w-6 text-blue transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    <span className="font-display text-4xl font-extrabold text-line transition-colors group-hover:text-amber">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHY PROFESSIONAL */}
      <section className="border-y border-line bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal="left">
            <p className="eyebrow">Kodėl profesionalas</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Elektra – ne ta sritis, kur verta taupyti ant kokybės</h2>
            <p className="mt-5 text-lg text-muted">
              Elektros darbų klaidos dažnai nematomos iš karto, bet gali kainuoti brangiai. Todėl verta juos patikėti
              žmonėms, kurie dirba atsakingai ir paaiškina savo sprendimus.
            </p>
            <div className="mt-8 hidden aspect-[4/3] overflow-hidden rounded-md lg:block">
              <Photo name="breakerGloves" alt="Elektrikas su apsauginėmis pirštinėmis tikrina automatinius jungiklius" sizes="480px" />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal style={stagger(i)} className="flex gap-5 py-7 first:pt-0 last:pb-0">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-blue/10 text-blue" aria-hidden="true">
                  <r.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{r.title}</h3>
                  <p className="mt-2 text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <Faq />

      {/* SERVICE AREA – only when configured */}
      {company.serviceAreas.length > 0 && (
        <section aria-labelledby="area-h" className="border-t border-line bg-white py-14">
          <div className="wrap">
            <h2 id="area-h" className="flex items-center gap-2 text-2xl font-extrabold" data-reveal>
              <MapPin className="h-6 w-6 text-blue" aria-hidden="true" /> Kur dirbame
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {company.serviceAreas.map((a, i) => (
                <li key={a} data-reveal style={stagger(i % 6)} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy">{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
