/**
 * NUOTRAUKŲ SĄRAŠAS (be importų – jį skaito ir scripts/photos.ts).
 *
 * Kiekviena nuotrauka turi raktą (pvz. heroPanel). Optimizuotos WebP versijos
 * guli public/images/<raktas>-<plotis>.webp ir generuojamos komanda:
 *
 *     npm run photos
 *
 * Kaip pakeisti nuotrauką savo:
 *  1) įdėkite failą į photos-src/<raktas>.jpg (arba .png / .webp),
 *     pvz. photos-src/heroPanel.jpg;
 *  2) paleiskite `npm run photos`;
 *  3) žemiau pakeiskite to rakto author (ir ištrinkite pexels), pvz.
 *     heroPanel: { author: "ELEKTROS MEISTRAI" }.
 *
 * Jei photos-src/ failo nėra, skriptas parsisiunčia nuotrauką iš Pexels pagal ID
 * (Pexels licencija / CC0: leidžiama naudoti komerciškai ir redaguoti).
 */

export type PhotoSource = { pexels?: number; author: string };

export const photoSources = {
  heroPanel: { pexels: 27928762, author: "ranjeet ." },
  socketsInstall: { pexels: 5691588, author: "Ksenia Chernaya" },
  switchInstall: { pexels: 5691589, author: "Ksenia Chernaya" },
  socketsPliers: { pexels: 5691590, author: "Ksenia Chernaya" },
  wallWires: { pexels: 3615735, author: "La Miko" },
  wallWiring: { pexels: 3614757, author: "La Miko" },
  multimeterPanel: { pexels: 34054464, author: "Bulat843" },
  multimeterBox: { pexels: 14319099, author: "Onics Energy" },
  breakerPanel: { pexels: 28950842, author: "ranjeet ." },
  switchboardHand: { pexels: 257736, author: "Pixabay" },
  ledHall: { pexels: 6238607, author: "Max Vakhtbovych" },
  ledHallWhite: { pexels: 6238608, author: "Max Vakhtbovych" },
  ceilingLamp: { pexels: 7641361, author: "MART PRODUCTION" },
  residentialFuseBox: { pexels: 32497160, author: "Kathleen Austin Kuhn" },
  drillOutlet: { pexels: 4981802, author: "Antoni Shkraba" },
  socketWindow: { pexels: 5691494, author: "Ksenia Chernaya" },
  renovationSite: { pexels: 29871587, author: "Okan Yaşar" },
  openSocket: { pexels: 5691642, author: "Ksenia Chernaya" },
  modernPanel: { pexels: 35573433, author: "smart-me AG" },
  switchbox: { pexels: 5767595, author: "Ksenia Chernaya" },
  kitchenIsland: { pexels: 4800175, author: "Curtis Adams" },
  kitchenPendant: { pexels: 10486268, author: "Curtis Adams" },
  officeLamps: { pexels: 7534173, author: "Max Vakhtbovych" },
  officeCeiling: { pexels: 12234617, author: "Dylan Spangler" },
  houseDusk: { pexels: 4933643, author: "Deepak DK" },
  housePorch: { pexels: 12654965, author: "Erik Mclean" },
  closetLed: { pexels: 15522918, author: "Aura" },
  breakerGloves: { pexels: 10871737, author: "Annas Zakaria" },
  breakersCloseup: { pexels: 38171184, author: "Elite Power Group" },
  cablesHands: { pexels: 7285965, author: "Kaboompics" },
  villaWinter: { pexels: 7031407, author: "Max Vakhtbovych" },
  roundLamps: { pexels: 16031208, author: "pipop kunachon" },
} satisfies Record<string, PhotoSource>;

export type PhotoKey = keyof typeof photoSources;
