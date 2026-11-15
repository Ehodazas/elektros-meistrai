/**
 * npm run photos
 *
 * For every key in src/data/photos.data.ts:
 *  - source: photos-src/<key>.(jpg|jpeg|png|webp) if present, otherwise downloads the Pexels
 *    original (2400 px wide) into .cache/photos/<key>.jpg (once);
 *  - writes public/images/<key>-<width>.webp for each width (never wider than the source);
 *  - writes src/data/photos.generated.json with real dimensions, available widths and a tiny
 *    blurred placeholder (data URL) shown while the image loads.
 *
 * Run once after adding or replacing photos; the outputs are committed, so CI needs nothing.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { photoSources } from "../src/data/photos.data.ts";
import { pages } from "../src/data/seo.ts";

// Full-bleed photos get a 2400 px variant (large screens, TVs); everything else tops out at 1600.
const WIDTHS = [480, 960, 1600];
const FULL_BLEED = new Set(["heroPanel"]);
const OUT_DIR = "public/images";
const CACHE = ".cache/photos";
const OWN = "photos-src";
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(CACHE, { recursive: true });

type Gen = Record<string, { width: number; height: number; widths: number[]; blur: string }>;
const generated: Gen = {};

async function sourceFor(key: string, pexels?: number): Promise<Buffer> {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const p = join(OWN, `${key}.${ext}`);
    if (existsSync(p)) return readFileSync(p);
  }
  const cached = join(CACHE, `${key}.jpg`);
  if (existsSync(cached)) return readFileSync(cached);
  if (!pexels) throw new Error(`No source for "${key}": add ${OWN}/${key}.jpg`);
  const url = `https://images.pexels.com/photos/${pexels}/pexels-photo-${pexels}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${key}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(cached, buf);
  return buf;
}

for (const [key, src] of Object.entries(photoSources)) {
  const input = await sourceFor(key, (src as { pexels?: number }).pexels);
  const img = sharp(input).rotate(); // respect EXIF orientation
  const meta = await img.metadata();
  const w = meta.autoOrient?.width ?? meta.width!;
  const h = meta.autoOrient?.height ?? meta.height!;

  // Remove stale variants of this key.
  for (const f of readdirSync(OUT_DIR)) if (f.startsWith(`${key}-`) && f.endsWith(".webp")) unlinkSync(join(OUT_DIR, f));

  const max = FULL_BLEED.has(key) ? 2400 : 1600;
  const widths = [...WIDTHS, 2400].filter((x) => x <= Math.min(w, max));
  if (widths.length === 0) widths.push(w);
  const unique = [...new Set(widths)];
  for (const width of unique) {
    await sharp(input).rotate().resize({ width }).webp({ quality: 72, effort: 5 }).toFile(join(OUT_DIR, `${key}-${width}.webp`));
  }
  const tiny = await sharp(input).rotate().resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  generated[key] = { width: w, height: h, widths: unique, blur: `data:image/webp;base64,${tiny.toString("base64")}` };
  console.log(`${key.padEnd(20)} ${w}x${h} → ${unique.join(", ")}`);
}

// Open Graph images (1200×630 JPEG – widest support in link previews) for photos used in seo.ts.
for (const f of readdirSync(OUT_DIR)) if (f.startsWith("og-")) unlinkSync(join(OUT_DIR, f));
const ogKeys = new Set(pages.map((p) => p.ogImage).filter((k): k is string => Boolean(k)));
for (const key of ogKeys) {
  const input = await sourceFor(key, (photoSources as Record<string, { pexels?: number }>)[key]?.pexels);
  await sharp(input).rotate().resize(1200, 630, { fit: "cover" }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(OUT_DIR, `og-${key}.jpg`));
}
console.log(`${ogKeys.size} Open Graph images`);

writeFileSync("src/data/photos.generated.json", JSON.stringify(generated, null, 2) + "\n");
console.log(`\n${Object.keys(generated).length} photos written to ${OUT_DIR}/`);
