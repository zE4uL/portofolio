import { chromium } from "playwright";
import { mkdir, copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const url = process.env.RESUME_URL || "http://localhost:3000/resume";

const outResume = resolve(projectRoot, "public/resume.pdf");
const outCv = resolve(projectRoot, "public/cv.pdf");

console.log(`[resume-pdf] rendering ${url} -> ${outResume}`);

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await mkdir(dirname(outResume), { recursive: true });
  await page.pdf({
    path: outResume,
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
  });
  await copyFile(outResume, outCv);
  console.log(`[resume-pdf] wrote ${outResume} and ${outCv}`);
} finally {
  await browser.close();
}
