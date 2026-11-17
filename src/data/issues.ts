/**
 * Užklausos asistento „Kokia elektros problema?“ turinys.
 *
 * Tai NE gedimų taisymo instrukcija ir ne diagnostika: patarimai apsiriboja saugiais
 * veiksmais (nesinaudoti, atjungti pasiekiamu jungikliu, kviesti 112 esant pavojui)
 * ir padeda tiksliau aprašyti užklausą elektrikui.
 */

export type IssueLevel = "danger" | "caution" | "routine";

export type Issue = {
  id: string;
  code: string;
  label: string;
  level: IssueLevel;
  /** Užklausos formos „Paslaugos tipas“ reikšmė. */
  service: string;
  /** Trumpi, saugūs kitų žingsnių patarimai. */
  advice: string[];
  /** Ką verta nurodyti aprašyme (rodoma kaip užuomina). */
  hint: string;
};

export const issues: Issue[] = [
  {
    id: "automatas",
    code: "P-01",
    label: "Nuolat išmuša automatinį jungiklį",
    level: "caution",
    service: "Gedimų šalinimas",
    advice: [
      "Nejunkite automato vis iš naujo ir nelaikykite jo jėga – apsauga suveikia dėl priežasties.",
      "Jei žinote, kuris prietaisas buvo įjungtas prieš pat išsijungimą, ištraukite jo kištuką iš lizdo.",
      "Priežastį (perkrovą, izoliacijos pažeidimą ar drėgmę) elektrikas nustatys matavimais.",
    ],
    hint: "Kada išsijungia (įjungus konkretų prietaisą, lyjant, atsitiktinai), kuri patalpų dalis lieka be elektros.",
  },
  {
    id: "dingo",
    code: "P-02",
    label: "Dingo elektra dalyje patalpų",
    level: "caution",
    service: "Gedimų šalinimas",
    advice: [
      "Pasiteiraukite, ar elektra yra kaimynams ir bendrose patalpose. Jei jos nėra visame pastate, tai gali būti tinklo sutrikimas – apie jį praneškite elektros tinklų operatoriui.",
      "Jei elektros nėra tik jūsų patalpose ar jų dalyje, nebandykite ardyti lizdų, jungiklių ar skydo.",
    ],
    hint: "Kurios patalpos ar prietaisai be elektros, ar prieš tai buvo atliekami kokie nors darbai.",
  },
  {
    id: "lizdas",
    code: "P-03",
    label: "Kaista arba kibirkščiuoja elektros lizdas",
    level: "danger",
    service: "Gedimų šalinimas",
    advice: [
      "Nebenaudokite šio lizdo ir jo nelieskite.",
      "Jei tai saugu ir jungiklis lengvai pasiekiamas, atjunkite elektrą atitinkamu automatiniu ar pagrindiniu jungikliu.",
      "Nebandykite lizdo ardyti ar taisyti patys.",
    ],
    hint: "Kuriame kambaryje lizdas, kas buvo įjungta, ar matėte pajuodavimą ar lydymosi žymes.",
  },
  {
    id: "kvapas",
    code: "P-04",
    label: "Jaučiamas degėsių kvapas",
    level: "danger",
    service: "Gedimų šalinimas",
    advice: [
      "Nebandykite ieškoti šaltinio ardydami lizdus, jungiklius ar šviestuvus.",
      "Jei tai saugu ir jungiklis lengvai pasiekiamas, atjunkite elektrą pagrindiniu jungikliu.",
      "Jei kvapas stiprėja, nesate tikri, ar saugu likti patalpoje, – išeikite.",
    ],
    hint: "Kur kvapas stipriausias ir kada jį pajutote.",
  },
  {
    id: "apsvietimas",
    code: "P-05",
    label: "Neveikia apšvietimas",
    level: "routine",
    service: "Apšvietimo montavimas",
    advice: ["Nurodykite, ar neveikia vienas šviestuvas, ar visa patalpų grupė – tai padės greičiau įvertinti darbų apimtį."],
    hint: "Kiek šviestuvų neveikia, kokio tipo (lubiniai, LED juostos, lauko) ir ar pakeitus lemputę nepadėjo.",
  },
  {
    id: "instaliacija",
    code: "P-06",
    label: "Reikia naujos elektros instaliacijos",
    level: "routine",
    service: "Elektros instaliacija",
    advice: ["Nurodykite objekto tipą ir apytikslį plotą – pagal tai suderinsime apžiūrą ir paruošime sąmatą."],
    hint: "Apytikslis plotas, ar vyksta remontas, ar keičiama visa instaliacija, ar tik dalis.",
  },
  {
    id: "kita",
    code: "P-07",
    label: "Kita problema",
    level: "routine",
    service: "Kita",
    advice: ["Trumpai aprašykite situaciją – atsakysime ir pasiūlysime, kaip spręsti."],
    hint: "Kas nutiko arba ką reikia atlikti.",
  },
];

export const issueById = (id: string | null | undefined) => issues.find((i) => i.id === id);
