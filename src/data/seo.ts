/**
 * SEO: kiekvieno puslapio pavadinimas ir aprašymas.
 * Naudojama ir naršyklėje (usePageMeta), ir build metu (scripts/postbuild.ts),
 * kuris kiekvienam maršrutui sugeneruoja atskirą HTML su teisingais meta
 * žymenimis bei sitemap.xml. Todėl šiame faile negali būti importų.
 */

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** Įtraukti į sitemap.xml (numatyta – taip). */
  sitemap?: boolean;
  /** Nuotrauka socialiniams tinklams – raktas iš photos.data.ts (npm run photos sukuria og-<raktas>.jpg). */
  ogImage?: string;
  priority?: number;
};

const BRAND = "ELEKTROS MEISTRAI";

export const pages: PageSeo[] = [
  {
    path: "/",
    title: `Elektriko paslaugos namams ir verslui | ${BRAND}`,
    description:
      "Elektros instaliacija, gedimų šalinimas, elektros skydų ir apšvietimo montavimas. Aiški sąmata, tvarkingas darbas ir dokumentai pridavus objektą.",
    ogImage: "heroPanel",
    priority: 1,
  },
  {
    path: "/paslaugos",
    title: `Elektros darbai: visos paslaugos | ${BRAND}`,
    description:
      "Elektros instaliacijos įrengimas, gedimų diagnostika, elektros skydų montavimas, apšvietimas ir instaliacijos renovacija butuose, namuose ir komercinėse patalpose.",
    ogImage: "socketsInstall",
    priority: 0.9,
  },
  {
    path: "/paslaugos/elektros-instaliacija",
    title: `Elektros instaliacijos įrengimas | ${BRAND}`,
    description:
      "Nauja elektros instaliacija namuose ir butuose: kabelių trasos, lizdai, jungikliai, grupių paskirstymas. Darbai pagal suderintą planą ir sąmatą.",
    ogImage: "socketsInstall",
    priority: 0.8,
  },
  {
    path: "/paslaugos/gedimu-diagnostika",
    title: `Elektros gedimų diagnostika ir šalinimas | ${BRAND}`,
    description:
      "Išmušantys automatai, neveikiantys lizdai, kaistantys laidai. Nustatome gedimo priežastį matavimais ir ją pašaliname.",
    ogImage: "multimeterPanel",
    priority: 0.8,
  },
  {
    path: "/paslaugos/elektros-skydai",
    title: `Elektros skydų montavimas ir keitimas | ${BRAND}`,
    description:
      "Elektros skydų surinkimas, montavimas, keitimas ir modernizavimas: automatiniai jungikliai, nuotėkio srovės ir viršįtampių apsauga.",
    ogImage: "breakerPanel",
    priority: 0.8,
  },
  {
    path: "/paslaugos/apsvietimo-montavimas",
    title: `Apšvietimo montavimas: vidaus, lauko, LED | ${BRAND}`,
    description:
      "Vidaus ir lauko apšvietimo montavimas, LED juostos ir šviestuvai, apšvietimo valdymas jutikliais ir išmaniais jungikliais.",
    ogImage: "ledHall",
    priority: 0.8,
  },
  {
    path: "/paslaugos/instaliacijos-renovacija",
    title: `Elektros instaliacijos renovacija | ${BRAND}`,
    description:
      "Senos aliumininės ar nusidėvėjusios elektros instaliacijos keitimas, modernizavimas ir elektros saugos gerinimas butuose ir namuose.",
    ogImage: "residentialFuseBox",
    priority: 0.8,
  },
  {
    path: "/atlikti-darbai",
    title: `Atlikti darbai – pavyzdiniai projektai | ${BRAND}`,
    description:
      "Pavyzdiniai elektros instaliacijos, elektros skydų, apšvietimo ir renovacijos projektai. Filtruokite pagal darbų tipą.",
    ogImage: "modernPanel",
    priority: 0.7,
  },
  {
    path: "/apie-mus",
    title: `Apie mus – kaip dirbame | ${BRAND}`,
    description:
      "Mūsų požiūris į elektros darbus: kokybė, elektros sauga, aiškus bendravimas, darbų planavimas ir dėmesys detalėms.",
    ogImage: "cablesHands",
    priority: 0.6,
  },
  {
    path: "/kontaktai",
    title: `Kontaktai – užsakyti elektriką | ${BRAND}`,
    description:
      "Aprašykite elektros darbus ir gaukite pasiūlymą. Kontaktai, darbo laikas ir užklausos forma.",
    ogImage: "socketsPliers",
    priority: 0.7,
  },
  {
    path: "/privatumo-politika",
    title: `Privatumo politika | ${BRAND}`,
    description: "Kaip tvarkome per svetainę pateiktus asmens duomenis, kokias teises turite ir kokie slapukai naudojami.",
    priority: 0.2,
  },
];

export const notFoundSeo: PageSeo = {
  path: "/404",
  title: `Puslapis nerastas | ${BRAND}`,
  description: "Ieškomas puslapis nerastas.",
  sitemap: false,
};

export function seoFor(path: string): PageSeo {
  const clean = path !== "/" ? path.replace(/\/+$/, "") : path;
  return pages.find((p) => p.path === clean) ?? notFoundSeo;
}
