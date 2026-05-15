// Generates app/icon.png and app/apple-icon.png from the in-site Z orb mark.
// Run: node scripts/make-brand-assets.mjs

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, "..", "app");

// Tokens mirrored from app/globals.css
const ACCENT = "#7ba889";
const INK_3 = "#4a453d";
const BG_HI = "#161616";
const BG_LO = "#060606";
const RING_INNER = "rgba(123,168,137,0.55)";
const RING_OUTER = "rgba(255,255,255,0.18)";

function orbSvg(size) {
  // Work in a 256 viewBox so stroke widths feel right at any output size.
  const vb = 256;
  const cx = vb / 2;
  const cy = vb / 2;
  const r = vb / 2 - 2; // 1px border equivalent
  // Inner ring (CSS: inset 4px on 56px = ~3.5%)
  const innerR = r - Math.round(vb * 0.035);
  // Outer ring (CSS: inset -4px) — sits just outside; we'll clip it inside the badge
  const outerR = r + Math.round(vb * 0.012);

  // Z path from BrutalistHome.tsx: viewBox 0 0 24, "M5 5h14L5 19h14" — center/scale into 256 viewBox
  // Scale factor so the 24-unit path occupies ~50% of the badge
  const targetSpan = 116;
  const k = targetSpan / 24;
  const zw = 14 * k;
  const offX = cx - zw / 2;
  const offY = cy - (14 * k) / 2;
  const zStrokeW = 2.4 * k;
  const zPath = `M${offX} ${offY} h${14 * k} L${offX} ${offY + 14 * k} h${14 * k}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${vb} ${vb}">
  <defs>
    <radialGradient id="bg" cx="35%" cy="30%" r="80%">
      <stop offset="0%" stop-color="${BG_HI}"/>
      <stop offset="100%" stop-color="${BG_LO}"/>
    </radialGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bg)" stroke="${INK_3}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${RING_OUTER}" stroke-width="1.2" stroke-dasharray="3 4"/>
  <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="none" stroke="${RING_INNER}" stroke-width="1.4" stroke-dasharray="3 4"/>
  <path d="${zPath}" fill="none" stroke="${ACCENT}" stroke-width="${zStrokeW}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

async function rasterise(size, outPath) {
  const svg = orbSvg(size);
  const png = await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(outPath, png);
  console.log(`wrote ${outPath} (${size}x${size}, ${png.length} bytes)`);
}

await rasterise(512, resolve(APP, "icon.png"));
await rasterise(180, resolve(APP, "apple-icon.png"));
console.log("done");
