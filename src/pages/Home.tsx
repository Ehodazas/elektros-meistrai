import { Link } from "react-router";
import {
  ArrowRight, ArrowUpRight, Building2, CalendarCheck, Check, ClipboardList, FileText, House, MessageSquare, Ruler, ShieldCheck, Wrench,
} from "lucide-react";
import Photo from "../components/Photo.tsx";
import PhoneLink from "../components/PhoneLink.tsx";
import CtaBand from "../components/CtaBand.tsx";
import { services } from "../data/services.ts";
import { categoryLabels, projects } from "../data/projects.ts";
import { company } from "../data/company.ts";

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

export default function Home() {
  const featured = [projects[0], projects[2], projects[5]];
  const [main, ...rest] = services;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy text-white">
        <div className="grid lg:min-h-[640px] lg:grid-cols-[1fr_1.05fr]">
          <div className="order-2 flex items-center lg:order-1">
            <div className="w-full px-4 pt-9 pb-12 sm:px-6 md:py-16 lg:ml-auto lg:max-w-[620px] lg:py-20 lg:pr-12 lg:pl-8">
              <p className="eyebrow rise !text-amber">Elektriko paslaugos</p>
              <h1 className="rise rise-2 mt-4 text-[2.35rem] font-extrabold text-white sm:text-5xl xl:text-[3.6rem]">
                Patikimi elektros sprendimai jūsų namams ir verslui.
              </h1>
              <p className="rise rise-3 mt-6 max-w-xl text-lg text-white/75">
                Atliekame elektros instaliacijos, gedimų diagnostikos, elektros skydų ir apšvietimo montavimo darbus.
              </p>
              <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/kontaktai#uzklausa" className="btn btn-primary">
                  Gauti pasiūlymą <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/paslaugos" className="btn btn-outline-light">Mūsų paslaugos</Link>
              </div>
              <div className="rise rise-4 mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-white/10 text-amber" aria-hidden="true">
                  <ClipboardList className="h-5 w-5" />
                </span>
                <div className="text-sm">
                  <p className="text-white/60">Pasitarti dėl darbų</p>
                  <PhoneLink showIcon={false} className="inline-flex items-center gap-2 font-display text-lg font-bold text-white hover:text-amber" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 aspect-[4/3] sm:aspect-[16/9] lg:order-2 lg:aspect-auto">
            <Photo
              name="heroPanel"
              alt="Elektrikas montuoja automatinius jungiklius šiuolaikiniame elektros skyde"
              sizes="(min-width: 1024px) 52vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Apie {company.name}</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem]">
              Elektros darbai, kuriuos lengva suplanuoti ir kuriais galima pasitikėti.
            </h2>
          </div>
          <div className="space-y-5 text-lg text-muted lg:pt-10">
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Paslaugos</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Pagrindiniai elektros darbai</h2>
            </div>
            <Link to="/paslaugos" className="link-arrow">
              Visos paslaugos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Link to={`/paslaugos/${main.slug}`} className="img-zoom group relative flex min-h-[420px] overflow-hidden rounded-md bg-navy lg:min-h-full">
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
                <li key={s.slug}>
                  <Link
                    to={`/paslaugos/${s.slug}`}
                    className="img-zoom group flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue/50"
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
        </div>
      </section>

      {/* RESIDENTIAL / COMMERCIAL */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="max-w-2xl">
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
            ].map((b) => (
              <article key={b.title} className="flex flex-col overflow-hidden rounded-md border border-line bg-white">
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
            {featured.map((p) => (
              <li key={p.id}>
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
          <div className="max-w-2xl">
            <p className="eyebrow">Darbo eiga</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Nuo užklausos iki veikiančios instaliacijos</h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-white p-7">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-blue" aria-hidden="true" />
                  <span className="font-display text-4xl font-extrabold text-line">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY PROFESSIONAL */}
      <section className="border-y border-line bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
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
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-5 py-7 first:pt-0 last:pb-0">
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

      <CtaBand />
    </>
  );
}
