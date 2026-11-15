/**
 * ĮMONĖS DUOMENYS — vienintelė vieta, kur keičiami kontaktai ir rekvizitai.
 *
 * Tušti laukai ("") reiškia, kad duomuo dar nenurodytas: svetainėje tada
 * rodomas aiškiai pažymėtas pavyzdinis tekstas, o skambinimo ar el. pašto
 * nuorodos neaktyvuojamos.
 *
 * Šį failą taip pat skaito scripts/postbuild.ts (sitemap, JSON-LD),
 * todėl jame negali būti importų.
 */

export type HoursRow = { days: string; time: string };
export type Stat = { value: number; suffix?: string; label: string };
export type Testimonial = { name: string; area?: string; text: string; rating?: 1 | 2 | 3 | 4 | 5; source?: string };

export const company = {
  /** Prekės ženklas, rodomas svetainėje. */
  name: "ELEKTROS MEISTRAI",

  /** Juridinis pavadinimas, pvz. „UAB Elektros meistrai“. Tuščias – nerodomas. */
  legalName: "",

  /** Įmonės kodas. Tuščias – nerodomas. */
  companyCode: "",

  /** Telefonas tarptautiniu formatu, pvz. "+37060000000". Tuščias – skambinimo nuorodos išjungtos. */
  phone: "",

  /** Kaip numeris rodomas žmonėms, pvz. "+370 600 00000". */
  phoneDisplay: "",

  /** El. paštas. Tuščias – rodomas pavyzdinis adresas be nuorodos. */
  email: "",

  /** Aptarnaujama teritorija, pvz. "Vilnius ir Vilniaus rajonas". */
  serviceArea: "",

  /** Biuro / sandėlio adresas, jei norite jį rodyti. Tuščias – nerodomas. */
  address: "",

  /** Darbo laikas. Pakeiskite pagal realų grafiką. */
  hours: [
    { days: "Pirmadienis–penktadienis", time: "8:00–18:00" },
    { days: "Šeštadienis", time: "Pagal susitarimą" },
    { days: "Sekmadienis", time: "Nedirbame" },
  ] as HoursRow[],

  /**
   * Avarinė pagalba visą parą. Įjunkite (true) TIK jei įmonė iš tikrųjų
   * teikia šią paslaugą. Kol false – svetainėje apie ją neužsimenama.
   */
  emergencyService: false,

  /**
   * Konkrečios vietovės (miestai, rajonai, mikrorajonai), rodomos kaip sąrašas
   * pagrindiniame ir kontaktų puslapyje. Tuščias – sąrašas nerodomas.
   * Pvz.: ["Vilnius", "Vilniaus rajonas", "Trakai"]
   */
  serviceAreas: [] as string[],

  /**
   * Skaičiai su animacija (pvz. įvykdytų projektų skaičius). Įrašykite TIK
   * tikrus, pagrįstus duomenis. Tuščias masyvas – blokas nerodomas.
   * Pvz.: [{ value: 120, suffix: "+", label: "atliktų objektų" }]
   */
  stats: [] as Stat[],

  /**
   * Klientų atsiliepimai. Įrašykite TIK tikrus atsiliepimus, gautus su
   * kliento sutikimu (pvz. iš Google ar el. laiškų). Tuščias – blokas nerodomas.
   */
  testimonials: [] as Testimonial[],

  /**
   * Demonstracinis režimas: rodoma juosta, kad tai pavyzdinė svetainė,
   * o projektai pažymimi kaip pavyzdiniai. Realiai įmonei – false.
   */
  demoMode: true,
} as const;

/** Pavyzdiniai tekstai, rodomi kol tikri duomenys nenurodyti. */
export const placeholders = {
  phone: "+370 6XX XXXXX",
  email: "info@jusu-domenas.lt",
  serviceArea: "Aptarnaujama teritorija bus nurodyta",
} as const;

export const hasPhone = company.phone.trim() !== "";
export const hasEmail = company.email.trim() !== "";
