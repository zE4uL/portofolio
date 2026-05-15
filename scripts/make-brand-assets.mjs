// Generates app/icon.png and app/apple-icon.png from public/images/profile/Logo.svg:
// black background, logo in the site's sage accent.
// Run: node scripts/make-brand-assets.mjs

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APP = resolve(ROOT, "app");
const SRC_LOGO = resolve(ROOT, "public", "images", "profile", "Logo.svg");

const BG = "#0a0a0a";              // --c-black
const ACCENT = "#7ba889";           // --c-accent (sage)
const RADIUS_PCT = 0.22;            // slight squircle so it doesn't look like a flag

async function buildIcon(size, outPath) {
  // Recolor the source SVG: swap every `fill="white"` for the accent
  const srcSvg = await readFile(SRC_LOGO, "utf8");
  const recoloured = srcSvg.replace(/fill="white"/gi, `fill="${ACCENT}"`);

  // Centre the logo at ~62% of the canvas
  const inset = Math.round(size * 0.19);
  const inner = size - inset * 2;

  const logoPng = await sharp(Buffer.from(recoloured))
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const r = Math.round(size * RADIUS_PCT);
  // Rounded-square black background
  const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${BG}"/>
  </svg>`;
  const bgPng = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const final = await sharp(bgPng)
    .composite([{ input: logoPng, top: inset, left: inset }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(outPath, final);
  console.log(`wrote ${outPath} (${size}x${size}, ${final.length} bytes)`);
}

await buildIcon(512, resolve(APP, "icon.png"));
await buildIcon(180, resolve(APP, "apple-icon.png"));
console.log("done");
