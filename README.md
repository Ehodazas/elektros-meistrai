# ELEKTROS MEISTRAI – elektriko paslaugų svetainė

Daugiapuslapė elektros paslaugų įmonės svetainė lietuvių kalba.
Sukurta su React, Vite, TypeScript, Tailwind CSS, React Router ir Lucide.

> **Demonstracinė svetainė.** „ELEKTROS MEISTRAI“ yra išgalvota įmonė. Kontaktai, projektai ir nuotraukos yra pavyzdiniai.
> Realiai įmonei pakeiskite duomenis taip, kaip aprašyta toliau, ir išjunkite demonstracinį režimą.

## Puslapiai

| Kelias | Turinys |
|---|---|
| `/` | Pagrindinis: hero, įžanga, paslaugos, būstas / verslas, projektai, darbo eiga, „kodėl profesionalas“, CTA |
| `/paslaugos` | Visų paslaugų apžvalga |
| `/paslaugos/<paslauga>` | 5 atskiri paslaugų puslapiai (bendras šablonas) |
| `/atlikti-darbai` | 8 pavyzdiniai projektai, filtrai, projekto peržiūros langas |
| `/apie-mus` | Įmonės požiūris ir darbo principai |
| `/kontaktai` | Kontaktai, darbo laikas, užklausos forma |
| `/privatumo-politika` | Privatumo politika, slapukai, nuotraukų šaltiniai |

## 1. Paleidimas kompiuteryje

Reikia **Node.js 23.6 ar naujesnės** versijos (build skriptas naudoja Node TypeScript palaikymą).

```bash
npm install
npm run dev          # kūrimo serveris: http://localhost:5173
npm run build        # production versija į dist/
npm run preview      # dist/ peržiūra
npm run typecheck    # tik TypeScript patikra
```

## 2. Įmonės informacijos keitimas

Visi kontaktai ir rekvizitai laikomi **vienoje vietoje**: [`src/data/company.ts`](src/data/company.ts).

```ts
name: "ELEKTROS MEISTRAI",
legalName: "UAB Jūsų įmonė",       // rodomas poraštėje ir privatumo politikoje
companyCode: "123456789",
phone: "+37060000000",            // žr. 5 skyrių
phoneDisplay: "+370 600 00000",
email: "info@jusu-domenas.lt",
serviceArea: "Vilnius ir Vilniaus rajonas",
hours: [...],                     // darbo laikas
emergencyService: false,          // true TIK jei tikrai teikiate avarinę pagalbą
demoMode: false,                  // išjungia „demonstracinė svetainė“ žymes
```

Papildomi blokai, kurie rodomi **tik užpildžius tikrais duomenimis**:

```ts
serviceAreas: ["Vilnius", "Vilniaus rajonas"],             // „Kur dirbame“ sąrašas
stats: [{ value: 120, suffix: "+", label: "atliktų objektų" }], // skaičiai su animacija
testimonials: [{ name: "Vardas", area: "Vilnius", text: "...", rating: 5, source: "Google" }],
```

Neįrašykite išgalvotų skaičių ar atsiliepimų: tai klaidinanti reklama.
DUK klausimai keičiami faile [`src/data/faq.ts`](src/data/faq.ts).

Tuščias laukas (`""`) reiškia „nenurodyta“: tada svetainėje rodomas aiškiai pažymėtas pavyzdys, o nuorodos neaktyvuojamos.

Kiti turinio failai:

- [`src/data/services.ts`](src/data/services.ts): paslaugų tekstai, sąrašai, nuotraukos;
- [`src/data/projects.ts`](src/data/projects.ts): projektai (pakeiskite savo realiais darbais);
- [`src/data/seo.ts`](src/data/seo.ts): kiekvieno puslapio `<title>` ir aprašymas.

Kai įmonė reali, **nurodykite tik tikras** kvalifikacijas, atestatus, draudimą ir garantijas. Svetainėje jų sąmoningai nėra.
Privatumo politikoje patikslinkite saugojimo terminą ir duomenų valdytojo rekvizitus.

## 3. Nuotraukų keitimas

Nuotraukos laikomos pačioje svetainėje (`public/images/`) kaip suspausti **WebP** failai keliais dydžiais.
Kraunantis rodoma neryški tos pačios nuotraukos versija, o ne tuščias plotas.
Sąrašas ir autoriai: [`src/data/photos.data.ts`](src/data/photos.data.ts).

Kaip pakeisti nuotrauką savo:

1. Įdėkite failą į `photos-src/<raktas>.jpg` (arba .png / .webp), pvz. `photos-src/heroPanel.jpg`.
   Raktai yra `photos.data.ts` faile (heroPanel, breakerPanel, kitchenIsland ir t. t.).
2. Paleiskite:
   ```bash
   npm run photos
   ```
   Skriptas sukuria WebP versijas, neryškų pakaitalą ir socialinių tinklų paveikslėlius (`og-*.jpg`).
3. `photos.data.ts` faile to rakto `author` pakeiskite savo įmonės pavadinimu ir ištrinkite `pexels`.
4. Jei reikia, pakeiskite `alt` tekstą `services.ts` / `projects.ts` faile.

Sugeneruotus failus (`public/images/`, `photos.generated.json`) įkelkite į GitHub kartu su kodu.

Realiai įmonei patariama naudoti savo darbų nuotraukas. Bankinės nuotraukos negali būti pateikiamos kaip įmonės darbai ar darbuotojai.

## 4. Tikro el. laiškų siuntimo prijungimas

Užklausos forma ([`src/lib/inquiry.ts`](src/lib/inquiry.ts)) siunčia JSON `POST` užklausą į adresą iš `VITE_FORM_ENDPOINT`.
Kol jis nenustatytas, forma veikia **demonstraciniu režimu**: patikrina laukus, bet nieko nesiunčia ir taip ir parašo.

Paprasčiausias būdas yra [Formspree](https://formspree.io) (arba Basin, Getform, savo API):

1. Sukurkite formą paslaugoje ir nukopijuokite jos adresą, pvz. `https://formspree.io/f/abcdwxyz`.
2. Sukurkite `.env` failą (pagal `.env.example`):
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
3. Perbuildinkite svetainę (`npm run build`). GitHub Pages atveju nustatykite kintamąjį repozitorijos nustatymuose (žr. 6 skyrių).

Siunčiami laukai: `vardas`, `telefonas`, `elPastas`, `miestas`, `paslauga`, `objektas`, `aprasymas`, `sutikimas`, `_subject`, `puslapis`.
Apsauga nuo šlamšto: paslėptas „spąstų“ laukas ir minimalus pildymo laikas. Formspree papildomai turi savo filtrus.

## 5. Telefono numerio nustatymas

[`src/data/company.ts`](src/data/company.ts):

```ts
phone: "+37060000000",          // be tarpų, su +370
phoneDisplay: "+370 600 00000", // kaip rodoma žmonėms
```

Kai `phone` užpildytas, visur (antraštėje, mobiliojoje apatinėje juostoje, paslaugų puslapiuose, poraštėje) įsijungia `tel:` nuorodos.
Kol `phone` tuščias, rodomas `+370 6XX XXXXX` su žyme „demo“, o paspaudus atidaromas kontaktų puslapis vietoj skambučio.

## 6. Diegimas į GitHub Pages

Projekte jau yra workflow failas [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Įkelkite projektą į GitHub repozitoriją (šaka `main`).
2. **Settings → Pages → Source:** pasirinkite **GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables** pridėkite:
   - `SITE_URL`, pvz. `https://<vartotojas>.github.io/<repo>` (arba jūsų domenas);
   - `BASE_PATH`, pvz. `/<repo>/` (jei naudojate savo domeną, rašykite `/`). Jei nenustatysite, bus naudojamas `/<repo>/`;
   - `VITE_FORM_ENDPOINT`, jei norite tikro formos siuntimo.
4. Įkelkite pakeitimus į `main`. Svetainė susibuildins ir pasiskelbs automatiškai.

Tiesioginės nuorodos (pvz. `/paslaugos/elektros-skydai/`) veikia, nes build metu kiekvienam puslapiui sukuriamas atskiras
`index.html`, o nežinomi adresai gauna `404.html`.

### Netlify / Vercel

- Build komanda: `npm run build`, katalogas: `dist`.
- Aplinkos kintamieji: `SITE_URL` (jūsų domenas), `BASE_PATH=/`, pasirinktinai `VITE_FORM_ENDPOINT`.
- Papildomų nukreipimų nereikia.

## SEO

- **Visas puslapių turinys sugeneruojamas build metu** (prerender): paieškos sistemos gauna pilną HTML su tekstu, o ne tuščią puslapį.
- Unikalūs `<title>`, aprašymai, kanoniniai URL ir Open Graph paveikslėliai kiekvienam puslapiui.
- `sitemap.xml`, `robots.txt` generuojami automatiškai iš `SITE_URL`. **Būtinai nustatykite `SITE_URL` prieš diegdami.**
- Pagrindiniame puslapyje yra `Electrician` JSON-LD tik su užpildytais duomenimis (telefonas, el. paštas, teritorija). Kai žinosite aptarnaujamą teritoriją, įrašykite ją į `serviceArea`.
- Netikrų miestų puslapių ir atsiliepimų nėra.

## Struktūra

```
src/
  data/        company.ts, services.ts, projects.ts, photos.ts, seo.ts   ← turinys
  components/  Header, Footer, MobileCallBar, PhoneLink, InquiryForm, ...
  pages/       Home, Services, ServiceDetail, Projects, About, Contact, Privacy, NotFound
  lib/         inquiry.ts (formos logika), usePageMeta.ts (SEO naršyklėje)
scripts/
  postbuild.ts ← puslapių HTML, 404, sitemap, robots
```

Slapukų sutikimo juostos nėra, nes svetainė nenaudoja slapukų ir sekimo. Jei pridėsite analitiką, reikės sutikimo mechanizmo ir privatumo politikos atnaujinimo.

Ankstesnė vieno puslapio versija: `archyvas/v1/`.
