import type { PhotoKey } from "./photos.ts";

export type Service = {
  slug: string;
  /** Pilnas pavadinimas (H1 paslaugos puslapyje). */
  title: string;
  /** Trumpas pavadinimas meniu, kortelėms ir formai. */
  short: string;
  /** Formos „Paslaugos tipas“ reikšmė, kuri parenkama paspaudus „Gauti pasiūlymą“. */
  formValue: string;
  summary: string;
  intro: string[];
  includes: string[];
  applications: string[];
  benefits: { title: string; text: string }[];
  image: PhotoKey;
  imageAlt: string;
  secondaryImage: PhotoKey;
  secondaryAlt: string;
};

export const services: Service[] = [
  {
    slug: "elektros-instaliacija",
    title: "Elektros instaliacijos įrengimas",
    short: "Elektros instaliacija",
    formValue: "Elektros instaliacija",
    summary:
      "Nauja elektros instaliacija namuose ir butuose – nuo planavimo ir kabelių trasų iki lizdų, jungiklių ir grupių paskirstymo skyde.",
    intro: [
      "Gera elektros instaliacija prasideda nuo plano. Kartu su jumis aptariame, kur bus baldai, buitinė technika, darbo vietos ir apšvietimas, ir tik tada žymime lizdų, jungiklių bei kabelių trasų vietas.",
      "Instaliaciją skirstome į logiškas grupes, kad gedimas vienoje patalpoje neišjungtų viso namo, o ateityje būtų paprasta pridėti naujų vartotojų.",
    ],
    includes: [
      "Elektros instaliacija namuose ir butuose",
      "Naujų kabelių trasų įrengimas",
      "Senos instaliacijos atnaujinimas",
      "Lizdų ir jungiklių montavimas",
      "Grupių paskirstymas ir žymėjimas skyde",
      "Instaliacijos schema po darbų",
    ],
    applications: [
      "Naujai statomi individualūs namai",
      "Butai po pirkimo ar kapitalinio remonto",
      "Palėpės, rūsio ar garažo įrengimas",
      "Virtuvės ir vonios kambario perplanavimas",
    ],
    benefits: [
      { title: "Planas prieš darbus", text: "Lizdų ir jungiklių vietas suderiname iš anksto, kad vėliau nereikėtų ilgintuvų ar papildomų angų sienose." },
      { title: "Tvarkingos grupės", text: "Kiekviena grupė pažymėta skyde, todėl prireikus lengva atjungti tik reikiamą patalpą." },
      { title: "Rezervas ateičiai", text: "Numatome vietą elektromobilio įkrovimui, šildymui ar kitiems galingesniems prietaisams." },
    ],
    image: "socketsInstall",
    imageAlt: "Elektrikas replėmis montuoja elektros lizdus ant pilkos sienos",
    secondaryImage: "wallWires",
    secondaryAlt: "Montavimo dėžutės ir elektros laidai baltoje sienoje prieš lizdų montavimą",
  },
  {
    slug: "gedimu-diagnostika",
    title: "Elektros gedimų diagnostika",
    short: "Gedimų diagnostika",
    formValue: "Gedimų šalinimas",
    summary:
      "Išmušantys automatiniai jungikliai, neveikiantys lizdai ar kaistantys laidai. Nustatome gedimo priežastį matavimais ir ją pašaliname.",
    intro: [
      "Gedimas retai būna ten, kur pasireiškia. Išmušantis automatas gali reikšti perkrautą grupę, drėgmę paskirstymo dėžutėje ar pažeistą izoliaciją sienoje.",
      "Todėl pirmiausia matuojame ir tikriname grandines, o tik tada keičiame tai, kas iš tikrųjų sugedę. Taip išvengiama „spėjimo“ darbų ir nereikalingų išlaidų.",
    ],
    includes: [
      "Elektros gedimų paieška ir nustatymas",
      "Grandinių patikra ir matavimai",
      "Elektros sistemos apžiūra",
      "Gedimų šalinimas",
      "Rekomendacijos dėl tolimesnių darbų",
    ],
    applications: [
      "Nuolat išsijungiantys automatiniai ar nuotėkio srovės jungikliai",
      "Neveikiantys lizdai, jungikliai ar šviestuvai",
      "Kaistantys, kibirkščiuojantys ar degėsiais kvepiantys elementai",
      "Patikra prieš perkant ar išnuomojant būstą",
    ],
    benefits: [
      { title: "Priežastis, ne simptomas", text: "Ieškome, kodėl gedimas atsirado, kad jis nepasikartotų po savaitės." },
      { title: "Aiškus paaiškinimas", text: "Paprastais žodžiais pasakome, kas rasta, ir pasiūlome sprendimo variantus." },
      { title: "Sauga pirmiausia", text: "Pavojingas vietas nedelsdami atjungiame ir pažymime, kol jos bus sutvarkytos." },
    ],
    image: "multimeterPanel",
    imageAlt: "Elektrikas multimetru tikrina jungtis atidarytame elektros skyde",
    secondaryImage: "multimeterBox",
    secondaryAlt: "Elektrikas matuoja įtampą skirstomojoje dėžutėje",
  },
  {
    slug: "elektros-skydai",
    title: "Elektros skydų montavimas",
    short: "Elektros skydai",
    formValue: "Elektros skydų montavimas",
    summary:
      "Skirstomųjų skydų surinkimas, montavimas, keitimas ir modernizavimas su šiuolaikinėmis apsaugos priemonėmis.",
    intro: [
      "Elektros skydas – visos instaliacijos centras. Nuo jo priklauso, kaip greitai suveiks apsauga ir kaip lengva bus surasti gedimą.",
      "Surenkame skydus su aiškiu grupių žymėjimu, parenkame apsaugos aparatus pagal apkrovas ir paliekame vietos ateities plėtrai.",
    ],
    includes: [
      "Skirstomųjų skydų montavimas",
      "Senų skydų keitimas",
      "Grandinių apsaugos įrangos montavimas",
      "Elektros skydų modernizavimas",
      "Nuotėkio srovės ir viršįtampių apsauga",
      "Grupių žymėjimas ir schema",
    ],
    applications: [
      "Seni skydai su lydžiaisiais saugikliais",
      "Nauja instaliacija ar namo plėtra",
      "Galios didinimas, šilumos siurblio ar elektromobilio prijungimas",
      "Komercinės patalpos ir biurai",
    ],
    benefits: [
      { title: "Greitesnė apsauga", text: "Šiuolaikiniai apsaugos aparatai greičiau atjungia sutrikusią grandinę." },
      { title: "Aiškus žymėjimas", text: "Kiekviena grupė pažymėta, schema paliekama skyde ar perduodama jums." },
      { title: "Vietos plėtrai", text: "Skydą parenkame su rezervu, kad naujiems vartotojams nereikėtų jo keisti." },
    ],
    image: "breakerPanel",
    imageAlt: "Elektros skydas su automatiniais jungikliais ir spalvomis pažymėtais laidais",
    secondaryImage: "switchboardHand",
    secondaryAlt: "Elektriko ranka atidarytame elektros skyde su laidais",
  },
  {
    slug: "apsvietimo-montavimas",
    title: "Apšvietimo montavimas",
    short: "Apšvietimas",
    formValue: "Apšvietimo montavimas",
    summary:
      "Vidaus ir lauko apšvietimas, LED sprendimai ir apšvietimo valdymas – nuo vieno šviestuvo iki viso namo ar biuro.",
    intro: [
      "Apšvietimas keičia patalpos pojūtį labiau nei bet kuri kita detalė. Padedame suplanuoti bendrą, darbo ir akcentinį apšvietimą taip, kad jis būtų patogus kasdien.",
      "Montuojame šviestuvus, LED juostas, lauko apšvietimą ir valdymo sprendimus – jutiklius, laikmačius, reguliatorius ar išmaniuosius jungiklius.",
    ],
    includes: [
      "Vidaus apšvietimas",
      "Lauko apšvietimas",
      "LED apšvietimas ir juostos",
      "Apšvietimo valdymo sprendimai",
      "Šviestuvų montavimas ir pajungimas",
    ],
    applications: [
      "Svetainės, virtuvės ir koridoriai",
      "Fasadai, takai, terasos ir kiemai",
      "Biurai, parduotuvės ir sandėliai",
      "Laiptinės ir bendros erdvės",
    ],
    benefits: [
      { title: "Apgalvotas planas", text: "Šviesa ten, kur jos reikia, be akinimo ir tamsių kampų." },
      { title: "Mažesnės sąnaudos", text: "LED šviestuvai ir valdymas jutikliais padeda taupyti elektros energiją." },
      { title: "Patogus valdymas", text: "Scenarijai, laikmačiai ar judesio jutikliai pagal jūsų kasdienius poreikius." },
    ],
    image: "ledHall",
    imageAlt: "Šiuolaikinis koridorius su LED apšvietimu lubose",
    secondaryImage: "ceilingLamp",
    secondaryAlt: "Montuojamas pakabinamas šviestuvas modernioje patalpoje",
  },
  {
    slug: "instaliacijos-renovacija",
    title: "Elektros instaliacijos renovacija",
    short: "Instaliacijos renovacija",
    formValue: "Elektros instaliacija",
    summary:
      "Pasenusios ar nusidėvėjusios instaliacijos keitimas, modernizavimas ir elektros saugos gerinimas.",
    intro: [
      "Daugelyje senesnės statybos butų ir namų tebėra aliumininė instaliacija, skirta gerokai mažesnėms apkrovoms nei šiandien. Indukcinė kaitlentė, šildymas ar keli galingi prietaisai vienu metu ją perkrauna.",
      "Įvertiname esamą būklę ir pasiūlome, ką keisti iš karto, o ką galima atnaujinti etapais, kad darbai derėtų su jūsų remonto planu.",
    ],
    includes: [
      "Pasenusios instaliacijos keitimas",
      "Elektros instaliacijos modernizavimas",
      "Elektros saugos gerinimas",
      "Įžeminimo ir apsaugos grandinių įrengimas",
      "Skydo atnaujinimas kartu su instaliacija",
    ],
    applications: [
      "Senos statybos butai su aliumininiais laidais",
      "Namai, kuriuose instaliacija neatnaujinta dešimtmečius",
      "Būstas prieš kapitalinį remontą",
      "Patalpos, kurių paskirtis keičiama",
    ],
    benefits: [
      { title: "Didesnė sauga", text: "Nauji laidai, įžeminimas ir nuotėkio srovės apsauga mažina gaisro ir elektros smūgio riziką." },
      { title: "Atlaiko šiuolaikines apkrovas", text: "Instaliacija skaičiuojama pagal tai, kokią techniką naudojate šiandien." },
      { title: "Darbai etapais", text: "Galime suplanuoti renovaciją dalimis pagal patalpas ir jūsų biudžetą." },
    ],
    image: "residentialFuseBox",
    imageAlt: "Elektrikas apžiūri seną elektros skydą gyvenamajame name",
    secondaryImage: "wallWiring",
    secondaryAlt: "Nauji elektros laidai ir montavimo dėžutės renovuojamoje sienoje",
  },
];

export function serviceBySlug(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Formos „Paslaugos tipas“ pasirinkimai. */
export const formServiceOptions = [
  "Elektros instaliacija",
  "Gedimų šalinimas",
  "Elektros skydų montavimas",
  "Apšvietimo montavimas",
  "Kita",
] as const;

export const formObjectOptions = ["Butas", "Namas", "Komercinės patalpos", "Kita"] as const;
