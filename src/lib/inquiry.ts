/**
 * Užklausos formos logika: validacija ir siuntimas.
 *
 * Siuntimas: jei nustatytas VITE_FORM_ENDPOINT (.env), forma siunčia JSON
 * POST užklausą į tą adresą (tinka Formspree, Basin, Getform, savo API ir pan.).
 * Jei nenustatytas – forma veikia DEMONSTRACINIU režimu ir nieko nesiunčia.
 */

export type InquiryData = {
  vardas: string;
  telefonas: string;
  elPastas: string;
  miestas: string;
  paslauga: string;
  objektas: string;
  aprasymas: string;
  sutikimas: boolean;
  /** Problem chosen in the „Kokia elektros problema?“ assistant (label), optional. */
  problema: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryData, string>>;

export const emptyInquiry: InquiryData = {
  vardas: "",
  telefonas: "",
  elPastas: "",
  miestas: "",
  paslauga: "",
  objektas: "",
  aprasymas: "",
  sutikimas: false,
  problema: "",
};

export const FORM_ENDPOINT = ((import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "").trim();
export const isDemoForm = FORM_ENDPOINT === "";

/** Lithuanian numbers: +370XXXXXXXX or 8XXXXXXXX (spaces, dashes, brackets allowed). */
export function isValidLtPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(\+370|8)\d{8}$/.test(digits) || /^00370\d{8}$/.test(digits);
}

export function validateInquiry(d: InquiryData): InquiryErrors {
  const e: InquiryErrors = {};
  if (d.vardas.trim().length < 2) e.vardas = "Įrašykite savo vardą.";
  if (!d.telefonas.trim()) e.telefonas = "Įrašykite telefono numerį.";
  else if (!isValidLtPhone(d.telefonas)) e.telefonas = "Neteisingas numeris. Pavyzdys: +370 612 34567 arba 8 612 34567.";
  if (d.elPastas.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.elPastas.trim()))
    e.elPastas = "Neteisingas el. pašto adresas. Pavyzdys: vardas@pastas.lt";
  if (d.miestas.trim().length < 2) e.miestas = "Nurodykite miestą arba rajoną.";
  if (!d.paslauga) e.paslauga = "Pasirinkite paslaugos tipą.";
  if (!d.objektas) e.objektas = "Pasirinkite objekto tipą.";
  if (d.aprasymas.trim().length < 10) e.aprasymas = "Trumpai aprašykite darbus (bent 10 simbolių).";
  else if (d.aprasymas.length > 3000) e.aprasymas = "Aprašymas per ilgas (daugiausia 3000 simbolių).";
  if (!d.sutikimas) e.sutikimas = "Norėdami išsiųsti užklausą, sutikite su duomenų tvarkymu.";
  return e;
}

export type SubmitResult = { ok: true } | { ok: false; message: string };

async function postPayload(payload: Record<string, unknown>): Promise<SubmitResult> {
  if (isDemoForm) return { ok: false, message: "demo" };
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, puslapis: window.location.href }),
    });
    if (!res.ok) return { ok: false, message: `HTTP ${res.status}` };
    return { ok: true };
  } catch {
    return { ok: false, message: "network" };
  }
}

export function sendInquiry(d: InquiryData): Promise<SubmitResult> {
  return postPayload({ ...d, _subject: `Nauja užklausa: ${d.paslauga} – ${d.miestas}` });
}

/* ---------- Greitas „Perskambinkite man“ formos variantas ---------- */

export type CallbackData = { vardas: string; telefonas: string; problema: string };
export type CallbackErrors = Partial<Record<keyof CallbackData, string>>;

export function validateCallback(d: CallbackData): CallbackErrors {
  const e: CallbackErrors = {};
  if (d.vardas.trim().length < 2) e.vardas = "Įrašykite vardą.";
  if (!d.telefonas.trim()) e.telefonas = "Įrašykite telefono numerį.";
  else if (!isValidLtPhone(d.telefonas)) e.telefonas = "Pavyzdys: +370 612 34567";
  if (d.problema.length > 1000) e.problema = "Daugiausia 1000 simbolių.";
  return e;
}

export function sendCallback(d: CallbackData): Promise<SubmitResult> {
  return postPayload({ ...d, tipas: "Perskambinti", _subject: `Prašymas perskambinti: ${d.vardas}` });
}
