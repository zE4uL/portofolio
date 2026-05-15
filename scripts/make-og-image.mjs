// Captures a 1200x630 screenshot of the running hero section and writes it to
// app/opengraph-image.png and app/twitter-image.png (Next.js App Router picks
// these up automatically and emits the og:image / twitter:image meta tags).
//
// Requires `next dev` (or any local serve) on http://localhost:3000.
// Run: node scripts/make-og-image.mjs

import { chromium } from "playwright";
import sharp from "sharp";
import { writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, "..", "app");
const URL = process.env.OG_URL || "http://localhost:3000";

// OG target output is 1200x630. We capture at a wider viewport so the
// hero-split layout (breakpoint at 1080px) renders two columns with the CRT
// visible, then sharp resizes the capture into the OG dimensions.
const OUT_W = 1200;
const OUT_H = 630;
const CAP_W = 1600;
const CAP_H = Math.round(CAP_W * (OUT_H / OUT_W)); // 840

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: CAP_W, height: CAP_H },
  deviceScaleFactor: 1.5,
  colorScheme: "dark",
});
const page = await ctx.newPage();

console.log(`navigating to ${URL}`);
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

// Hide cursor effects, focus rings, and the Next.js dev indicator badge.
// Do NOT pause animations — several hero elements (.crt-mon, morph) start
// at opacity:0 and rely on their intro animation to land on a visible frame.
await page.addStyleTag({
  content: `
    [data-cursor], .cursor-dot, .cursor-trail, .custom-cursor { display: none !important; }
    /* Next.js dev-mode build/error indicator (the floating N badge) */
    nextjs-portal,
    [data-nextjs-toast],
    [data-nextjs-dialog-overlay],
    #__next-build-watcher,
    .__next-dev-overlay-indicator { display: none !important; }
  `,
});

// Make sure the hero is the visible region
await page.evaluate(() => {
  const hero = document.querySelector("#hero");
  if (hero) hero.scrollIntoView({ behavior: "instant", block: "start" });
  window.scrollTo(0, 0);
});

// Wait for the CRT mount and its intro animation (crtMonIn: 0.8s delay + 1.2s
// duration = 2s) to land at opacity:1.
try {
  await page.waitForSelector(".crt-mon", { state: "attached", timeout: 5000 });
} catch {
  console.warn(".crt-mon not attached within 5s — proceeding anyway");
}
await page.waitForLoadState("networkidle");
await page.waitForTimeout(2500);

const outOg = resolve(APP, "opengraph-image.png");
const outTw = resolve(APP, "twitter-image.png");

const raw = await page.screenshot({
  type: "png",
  clip: { x: 0, y: 0, width: CAP_W, height: CAP_H },
});
const buf = await sharp(raw)
  .resize(OUT_W, OUT_H, { fit: "cover", position: "top" })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(outOg, buf);
await copyFile(outOg, outTw);
console.log(`wrote ${outOg} (${buf.length} bytes, ${OUT_W}x${OUT_H})`);
console.log(`wrote ${outTw}`);

await browser.close();
