/**
 * NUOTRAUKOS
 *
 * Visos nuotraukos – iš Pexels (Pexels licencija / CC0: leidžiama nemokamai
 * naudoti komerciniais tikslais, priskyrimas nebūtinas, bet rodomas
 * puslapyje „Privatumo politika“ → „Nuotraukų šaltiniai“).
 *
 * Kad pakeistumėte nuotrauką savo:
 *  1) įdėkite failą į public/images/, pvz. public/images/skydas.jpg
 *  2) pakeiskite įrašo `src` į "images/skydas.jpg" (be pradinio „/“)
 *     ir nurodykite tikrus `width` / `height`.
 * Savo darbų nuotraukos visada geriau nei bankinės.
 */

export type Photo = {
  /** Pexels nuotraukos ID ARBA kelias iki failo public/ kataloge. */
  src: number | string;
  width: number;
  height: number;
  author: string;
  /** Šaltinio puslapis (kreditams). */
  source?: string;
};

// The slug is only a human-readable hint; Pexels resolves /photo/<id>/ on its own.
const pexels = (id: number, width: number, height: number, author: string, _slug: string): Photo => ({
  src: id,
  width,
  height,
  author,
  source: `https://www.pexels.com/photo/${id}/`,
});

export const photos = {
  heroPanel: pexels(27928762, 4000, 3000, "ranjeet .", "a-man-is-working-on-an-electrical-panel"),
  socketsInstall: pexels(5691588, 4000, 5990, "Ksenia Chernaya", "an-electrician-using-pliers-to-repair-the-ac-power-plugs-and-sockets"),
  switchInstall: pexels(5691589, 4000, 5990, "Ksenia Chernaya", "crop-faceless-man-using-screwdriver"),
  socketsPliers: pexels(5691590, 4000, 5990, "Ksenia Chernaya", "an-electrician-using-pliers-to-repair-the-ac-power-plugs-and-sockets"),
  wallWires: pexels(3615735, 4000, 2665, "La Miko", "holes-on-white-wall-with-electrical-wires"),
  wallWiring: pexels(3614757, 4000, 6000, "La Miko", "photo-of-electrical-wirings-on-white-wall"),
  multimeterPanel: pexels(34054464, 4000, 7110, "Bulat843", "electrician-diagnosing-electrical-panel-with-multimeter"),
  multimeterBox: pexels(14319099, 4000, 2110, "Onics Energy", "man-fixing-electric-box"),
  breakerPanel: pexels(28950842, 4000, 2490, "ranjeet .", "electrical-circuit-breaker-panel-with-color-coded-wiring"),
  switchboardHand: pexels(257736, 4000, 2660, "Pixabay", "electrician-fixing-an-opened-switchboard"),
  ledHall: pexels(6238607, 4000, 2670, "Max Vakhtbovych", "spacious-hall-with-wooden-doors-in-modern-house"),
  ledHallWhite: pexels(6238608, 4000, 2670, "Max Vakhtbovych", "stylish-white-hall-in-big-apartment-building"),
  ceilingLamp: pexels(7641361, 4000, 2665, "MART PRODUCTION", "a-man-installing-a-light-bulb"),
  residentialFuseBox: pexels(32497160, 4000, 2660, "Kathleen Austin Kuhn", "electrician-inspecting-residential-fuse-box-area"),
  drillOutlet: pexels(4981802, 4000, 6000, "Antoni Shkraba", "man-drilling-in-a-wall-in-an-apartment"),
  socketWindow: pexels(5691494, 4000, 2670, "Ksenia Chernaya", "installation-work-and-replacement-of-socket"),
  renovationSite: pexels(29871587, 4000, 5995, "Okan Yaşar", "electrician-working-on-renovation-project-in-turkiye"),
  openSocket: pexels(5691642, 4000, 5990, "Ksenia Chernaya", "power-socket-during-construction-on-building"),
  modernPanel: pexels(35573433, 4000, 4250, "smart-me AG", "high-voltage-electrical-panel-with-circuit-breakers"),
  switchbox: pexels(5767595, 4000, 5990, "Ksenia Chernaya", "an-opened-switchbox"),
  kitchenIsland: pexels(4800175, 4000, 2705, "Curtis Adams", "a-kitchen-with-an-island"),
  kitchenPendant: pexels(10486268, 4000, 2670, "Curtis Adams", "light-bulb-in-glass-lamp-on-ceiling"),
  officeLamps: pexels(7534173, 4000, 2670, "Max Vakhtbovych", "spacious-workspace-with-tables-and-chairs"),
  officeCeiling: pexels(12234617, 4000, 6000, "Dylan Spangler", "modern-commercial-interior-lighting"),
  houseDusk: pexels(4933643, 4000, 2670, "Deepak DK", "illuminated-house-at-countryside"),
  housePorch: pexels(12654965, 4000, 6000, "Erik Mclean", "wooden-house-with-glass-windows"),
  closetLed: pexels(15522918, 4000, 5335, "Aura", "an-empty-dressing-room"),
  breakerGloves: pexels(10871737, 4000, 5330, "Annas Zakaria", "a-man-working-on-an-electric-switch-breakers"),
  breakersCloseup: pexels(38171184, 4000, 6000, "Elite Power Group", "close-up-of-electrical-circuit-breakers-panel"),
  cablesHands: pexels(7285965, 4000, 2665, "Kaboompics", "photo-of-a-person-s-hands-holding-cables"),
  villaWinter: pexels(7031407, 4000, 2670, "Max Vakhtbovych", "modern-villa-with-spacious-yard-in-winter"),
  roundLamps: pexels(16031208, 4000, 6000, "pipop kunachon", "modern-round-lamps-hanging-from-the-ceiling"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

const WIDTHS = [480, 800, 1200, 1600, 2200];

/** Grąžina nuotraukos URL nurodytu pločiu. */
export function photoUrl(p: Photo, w = 1200): string {
  if (typeof p.src === "number") {
    return `https://images.pexels.com/photos/${p.src}/pexels-photo-${p.src}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
  }
  return import.meta.env.BASE_URL + p.src;
}

export function photoSrcSet(p: Photo): string | undefined {
  if (typeof p.src !== "number") return undefined;
  return WIDTHS.filter((w) => w <= p.width).map((w) => `${photoUrl(p, w)} ${w}w`).join(", ");
}
