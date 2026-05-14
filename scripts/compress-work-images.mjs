import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public/images/work");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 78;
const PNG_QUALITY = 80;
const MIN_BYTES = 250 * 1024;

async function walk(dir) {
  const ents = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function fmt(b) {
  return (b / 1024 / 1024).toFixed(2) + " MB";
}

const files = await walk(ROOT);
let savedTotal = 0;
let processed = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) continue;

  try {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();
    const needsResize = (meta.width ?? 0) > MAX_WIDTH;

    let pipeline = sharp(file, { failOn: "none" });
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === ".png") {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: false });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }

    const tmp = file + ".tmp";
    await pipeline.toFile(tmp);
    const newStat = await fs.stat(tmp);

    if (newStat.size < stat.size * 0.95) {
      await fs.rename(tmp, file);
      const saved = stat.size - newStat.size;
      savedTotal += saved;
      processed++;
      console.log(`✓ ${path.relative(ROOT, file)}  ${fmt(stat.size)} → ${fmt(newStat.size)}  (-${fmt(saved)})`);
    } else {
      await fs.unlink(tmp);
    }
  } catch (err) {
    console.warn(`! ${path.relative(ROOT, file)}: ${err.message}`);
  }
}

console.log(`\nProcessed ${processed} files. Saved ${fmt(savedTotal)} total.`);
