import { Link } from "react-router";
import { ArrowRight, Building2, CalendarCheck, Eye, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader.tsx";
import Photo from "../components/Photo.tsx";
import CtaBand from "../components/CtaBand.tsx";
import { company } from "../data/company.ts";
import { stagger } from "../lib/stagger.ts";

const principles = [
  {
    icon: Sparkles,
    title: "Darbų kokybė",
    text: "Tvarkingai sutvarkytos kabelių trasos, pažymėtos grupės ir švarus skydas nėra smulkmenos. Tai požymiai, kad instaliacija įrengta apgalvotai ir ją bus lengva prižiūrėti.",
  },
  {
    icon: MessageSquare,
    title: "Bendravimas su klientu",
    text: "Paaiškiname, ką darysime ir kodėl, be nereikalingų terminų. Jei darbų metu paaiškėja kas nors netikėto, pirmiausia informuojame jus ir tik suderinę tęsiame.",
  },
  {
    icon: ShieldCheck,
    title: "Elektros sauga",
    text: "Dirbame atjungę įtampą, naudojame tinkamus įrankius ir apsaugos priemones. Instaliaciją projektuojame su nuotėkio srovės ir perkrovos apsauga.",
  },
  {
    icon: CalendarCheck,
    title: "Darbų planavimas",
    text: "Prieš pradedant aptariame darbų eigą, terminus ir tai, kaip elektros darbai derės su kitais remonto etapais – tinkavimu, dažymu ar baldų montavimu.",
  },
  {
    icon: Eye,
    title: "Dėmesys detalėms",
    text: "Lizdų aukštis, jungiklių vieta prie durų, apšvietimas virš darbo zonos – tokios detalės lemia, ar instaliacija bus patogi kasdien.",
  },
  {
    icon: Building2,
    title: "Būstas ir verslas",
    text: "Dirbame butuose, namuose ir komercinėse patalpose. Verslo klientams darbus planuojame taip, kad jie kuo mažiau trukdytų įprastai veiklai.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Apie mus"
        title="Elektros darbai be netikėtumų"
        lead={`${company.name} – elektros instaliacijos ir remonto paslaugos namams ir verslui. Mums svarbu, kad darbai būtų atlikti saugiai, tvarkingai ir taip, kaip sutarta.`}
        crumbs={[{ to: "/", label: "Pagrindinis" }, { label: "Apie mus" }]}
      />

      {/* Approach */}
      <section className="py-16 md:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <Photo name="cablesHands" alt="Elektriko rankos replėmis karpo ir rūšiuoja spalvotus laidus" sizes="(min-width: 1024px) 600px, 100vw" priority />
          </div>
          <div>
            <p className="eyebrow">Mūsų požiūris</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Gera elektros instaliacija yra ta, apie kurią negalvojate</h2>
            <div className="prose-lt mt-5 text-lg text-muted">
              <p>
                Ji tiesiog veikia: automatai neišsijungia be priežasties, lizdai yra ten, kur jų reikia, o prireikus pridėti
                naują prietaisą nereikia ardyti sienų.
              </p>
              <p>
                Kad taip būtų, kiekvieną darbą pradedame nuo pokalbio ir apžiūros, o ne nuo gręžimo. Tik supratę, kaip
                naudosite patalpas, siūlome sprendimą ir pateikiame sąmatą.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-line bg-white py-16 md:py-24">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Kaip dirbame</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Principai, kurių laikomės kiekviename objekte</h2>
          </div>
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={stagger(i % 3)} className="border-t-2 border-navy pt-6">
                <p.icon className="h-6 w-6 text-blue" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Residential & commercial */}
      <section className="py-16 md:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="lg:order-2 grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] overflow-hidden rounded-md">
              <Photo name="switchInstall" alt="Elektrikas atsuktuvu montuoja jungiklį bute" sizes="(min-width: 1024px) 300px, 50vw" />
            </div>
            <div className="mt-10 aspect-[3/4] overflow-hidden rounded-md">
              <Photo name="officeCeiling" alt="Šviestuvai komercinės patalpos lubose" sizes="(min-width: 1024px) 300px, 50vw" />
            </div>
          </div>
          <div>
            <p className="eyebrow">Objektai</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Nuo buto iki komercinių patalpų</h2>
            <p className="mt-5 text-lg text-muted">
              Būste dažniausiai dirbame kartu su remontu: keičiame instaliaciją, skydus, montuojame apšvietimą. Komercinėse
              patalpose prisitaikome prie nuomininkų darbo laiko, saugumo reikalavimų ir pastato administratoriaus taisyklių.
            </p>
            <Link to="/paslaugos" className="link-arrow mt-6">
              Peržiūrėti paslaugas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo notice / customization */}
      {company.demoMode && (
        <section id="demo" className="pb-4">
          <div className="wrap">
            <div className="rounded-md border border-dashed border-slate-400 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Apie šią demonstracinę svetainę</h2>
              <p className="mt-3 text-muted">
                „{company.name}“ yra išgalvota įmonė, sukurta tik kaip svetainės pavyzdys. Svetainėje nenurodoma darbo patirtis,
                darbuotojų skaičius, kvalifikacijos, atestatai, licencijos ar apdovanojimai, nes jų nėra – realiai įmonei juos
                reikėtų nurodyti tik tokius, kokie yra iš tikrųjų. Kontaktai yra pavyzdiniai, o nuotraukos – iš Pexels nuotraukų banko
                ir nevaizduoja šios įmonės darbuotojų ar objektų.
              </p>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
