import type { PhotoKey } from "./photos.ts";

/**
 * PAVYZDINIAI PROJEKTAI
 *
 * Tai demonstracinis turinys su bankinėmis nuotraukomis – jis NĖRA tikri
 * įmonės atlikti darbai. Realiai įmonei pakeiskite juos savo projektais
 * ir savo nuotraukomis, o company.ts nustatykite demoMode: false.
 */

export type ProjectCategory = "instaliacija" | "skydai" | "apsvietimas" | "renovacija";

export const categoryLabels: Record<ProjectCategory, string> = {
  instaliacija: "Elektros instaliacija",
  skydai: "Elektros skydai",
  apsvietimas: "Apšvietimas",
  renovacija: "Renovacija",
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  objectType: string;
  summary: string;
  scope: string[];
  details: string;
  images: { key: PhotoKey; alt: string }[];
};

export const projects: Project[] = [
  {
    id: "moderniu-namu-instaliacija",
    title: "Elektros instaliacija moderniame name",
    category: "instaliacija",
    objectType: "Individualus namas",
    summary: "Visa naujo namo elektros instaliacija nuo kabelių trasų iki galutinio pajungimo.",
    details:
      "Pavyzdinis projektas parodo, kaip planuojama naujo namo instaliacija: kartu su užsakovu sudaromas lizdų ir jungiklių planas, numatomos atskiros grupės virtuvei, šildymui ir lauko vartotojams, paliekamas rezervas elektromobilio įkrovimui.",
    scope: ["Lizdų ir jungiklių planas", "Kabelių trasos sienose ir lubose", "Atskiros grupės galingiems prietaisams", "Instaliacijos schema"],
    images: [
      { key: "drillOutlet", alt: "Meistras gręžia angą elektros lizdui buto sienoje" },
      { key: "socketWindow", alt: "Naujai montuojamas elektros lizdas šviesioje patalpoje prie lango" },
    ],
  },
  {
    id: "buto-instaliacijos-renovacija",
    title: "Buto elektros instaliacijos renovacija",
    category: "renovacija",
    objectType: "Butas",
    summary: "Senos aliumininės instaliacijos pakeitimas varine kartu su buto remontu.",
    details:
      "Pavyzdyje aprašoma tipinė senos statybos buto renovacija: išardoma sena instaliacija, įrengiamos naujos kabelių trasos, įžeminimas ir nuotėkio srovės apsauga, lizdai perkeliami pagal naują baldų išdėstymą.",
    scope: ["Senos instaliacijos demontavimas", "Naujos varinės linijos", "Įžeminimas ir apsauga", "Lizdų perkėlimas pagal naują planą"],
    images: [
      { key: "renovationSite", alt: "Elektrikas tiesia laidus renovuojamoje patalpoje" },
      { key: "openSocket", alt: "Atidaryta lizdo dėžutė su laidais renovacijos metu" },
    ],
  },
  {
    id: "skirstomojo-skydo-irengimas",
    title: "Skirstomojo elektros skydo įrengimas",
    category: "skydai",
    objectType: "Individualus namas",
    summary: "Naujas skydas su aiškiai pažymėtomis grupėmis ir viršįtampių apsauga.",
    details:
      "Pavyzdinis skydo projektas: parenkami apsaugos aparatai pagal apkrovas, įrengiama nuotėkio srovės ir viršįtampių apsauga, kiekviena grupė pažymima, o skyde paliekama vietos būsimiems vartotojams.",
    scope: ["Apsaugos aparatų parinkimas", "Nuotėkio srovės apsauga", "Viršįtampių apsauga", "Grupių žymėjimas ir schema"],
    images: [
      { key: "modernPanel", alt: "Šiuolaikinis elektros skydas su automatiniais jungikliais" },
      { key: "switchbox", alt: "Atidarytas elektros skydas su sujungtais laidais ant baltos sienos" },
    ],
  },
  {
    id: "virtuves-elektros-instaliacija",
    title: "Virtuvės elektros instaliacija",
    category: "instaliacija",
    objectType: "Butas",
    summary: "Atskiros linijos buitinei technikai ir apšvietimas virš salos.",
    details:
      "Pavyzdyje parodoma, kaip virtuvėje suplanuojamos atskiros linijos kaitlentei, orkaitei ir indaplovei, lizdai darbastalio zonoje bei pakabinamų šviestuvų pajungimas virš virtuvės salos.",
    scope: ["Atskiros linijos buitinei technikai", "Lizdai darbastalio zonoje", "Pakabinami šviestuvai virš salos", "Apšvietimas po spintelėmis"],
    images: [
      { key: "kitchenIsland", alt: "Virtuvė su sala ir pakabinamais šviestuvais" },
      { key: "kitchenPendant", alt: "Stiklinis pakabinamas šviestuvas virtuvėje" },
    ],
  },
  {
    id: "biuro-elektros-instaliacija",
    title: "Biuro elektros instaliacija",
    category: "instaliacija",
    objectType: "Komercinės patalpos",
    summary: "Darbo vietų elektra ir bendras apšvietimas atviroje biuro erdvėje.",
    details:
      "Pavyzdinis komercinių patalpų projektas: darbo vietų lizdų grupės, atskiros linijos serverinei ar virtuvėlei, bendrasis apšvietimas ir darbų grafikas, suderintas su nuomininko poreikiais.",
    scope: ["Darbo vietų lizdų grupės", "Atskiros linijos įrangai", "Bendrasis apšvietimas", "Darbai pagal suderintą grafiką"],
    images: [
      { key: "officeLamps", alt: "Šiuolaikinis biuras su darbo stalais ir lubiniais šviestuvais" },
      { key: "officeCeiling", alt: "Minimalistiniai šviestuvai komercinės patalpos lubose" },
    ],
  },
  {
    id: "lauko-apsvietimas",
    title: "Lauko apšvietimo įrengimas",
    category: "apsvietimas",
    objectType: "Individualus namas",
    summary: "Fasado, įėjimo ir kiemo apšvietimas su automatiniu valdymu.",
    details:
      "Pavyzdyje aprašomas namo lauko apšvietimas: fasado ir įėjimo šviestuvai, takų apšvietimas, lauko lizdai terasoje ir valdymas prieblandos jutikliu bei laikmačiu.",
    scope: ["Fasado ir įėjimo šviestuvai", "Takų apšvietimas", "Lauko lizdai", "Prieblandos jutiklis ir laikmatis"],
    images: [
      { key: "houseDusk", alt: "Namas sutemus su įjungtu lauko apšvietimu" },
      { key: "housePorch", alt: "Medinio namo prieangis su šiltu lauko apšvietimu naktį" },
    ],
  },
  {
    id: "led-apsvietimo-projektas",
    title: "LED apšvietimo projektas",
    category: "apsvietimas",
    objectType: "Butas",
    summary: "Įleidžiamos LED linijos koridoriuje ir drabužinėje.",
    details:
      "Pavyzdinis LED apšvietimo projektas: įleidžiamos šviesos linijos lubose, LED juostos lentynose, maitinimo šaltinių vietų planavimas ir valdymas judesio jutikliais.",
    scope: ["Įleidžiamos LED linijos", "LED juostos lentynose", "Maitinimo šaltinių išdėstymas", "Judesio jutikliai"],
    images: [
      { key: "closetLed", alt: "Drabužinė su LED apšvietimu lentynose" },
      { key: "ledHallWhite", alt: "Baltas koridorius su LED šviesos linijomis lubose" },
    ],
  },
  {
    id: "elektros-sistemos-modernizavimas",
    title: "Elektros sistemos modernizavimas",
    category: "renovacija",
    objectType: "Komercinės patalpos",
    summary: "Seno skydo ir apsaugos aparatų pakeitimas be ilgų prastovų.",
    details:
      "Pavyzdyje parodoma, kaip modernizuojama veikiančių patalpų elektros sistema: esamos būklės įvertinimas, darbų etapai ne darbo valandomis, naujas skydas ir apsaugos aparatai, atnaujinta schema.",
    scope: ["Esamos būklės įvertinimas", "Darbai etapais", "Naujas skydas ir apsauga", "Atnaujinta schema"],
    images: [
      { key: "breakerGloves", alt: "Elektrikas su apsauginėmis pirštinėmis dirba prie automatinių jungiklių" },
      { key: "breakersCloseup", alt: "Automatiniai jungikliai elektros skyde iš arti" },
    ],
  },
];
