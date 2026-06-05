import crypto from "crypto";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const paintingsDir = path.join(root, "public", "images", "paintings");
const csvPath = path.join(paintingsDir, "Homepage Paintings.csv");
const outPath = path.join(root, "src", "data", "paintings.ts");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/\.(jpe?g|png|webp|gif)$/i, "")
    .replace(/\s+/g, " ")
    .replace(/[-–—]/g, "-")
    .trim();
}

function titleToId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanSize(size) {
  return size
    .replace(/\uFFFD/g, "\u201d")
    .replace(/""/g, "\u201d")
    .replace(/^[\u201c\u201d"]+|[\u201c\u201d"]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferCategory(title) {
  const t = title.toLowerCase();
  if (t.startsWith("taos")) return "adobe";
  if (t.includes("cactus") || t.startsWith("saguaro")) return "cactus";
  if (
    t.startsWith("flower") ||
    t.startsWith("blossom") ||
    t.includes("waterlily") ||
    t.includes("sunflower")
  ) {
    return "flowers";
  }
  if (t.startsWith("moon over cloud")) return "imaginary";
  return "other";
}

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  fields.push(current.trim());
  return fields;
}

function parseCsvEntries(csvText) {
  const entries = [];
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim());

  for (const line of lines.slice(1)) {
    const [title, , yearRaw, medium, sizeRaw] = parseCsvLine(line);
    if (!title || title === "Art Title") continue;

    const year = Number.parseInt(yearRaw, 10);
    if (!Number.isFinite(year)) continue;

    entries.push({
      title,
      year,
      medium: medium || "Acrylic on canvas",
      size: cleanSize(sizeRaw || ""),
      category: inferCategory(title),
    });
  }

  return entries;
}

function listImageFiles() {
  const index = new Map();

  try {
    const tracked = execSync("git ls-files public/images/paintings/", {
      cwd: root,
      encoding: "utf8",
    });
    for (const line of tracked.split(/\r?\n/)) {
      const filename = path.basename(line.trim());
      if (!filename || !IMAGE_EXT.test(filename)) continue;
      const key = normalizeTitle(filename.replace(IMAGE_EXT, ""));
      if (!index.has(key)) index.set(key, filename);
    }
  } catch {
    // Fall back to disk listing when git is unavailable.
  }

  for (const filename of fs.readdirSync(paintingsDir)) {
    if (!IMAGE_EXT.test(filename)) continue;
    const key = normalizeTitle(filename.replace(IMAGE_EXT, ""));
    if (!index.has(key)) index.set(key, filename);
  }

  return [...index.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

function buildFileIndex(files) {
  const index = new Map();

  for (const filename of files) {
    const key = normalizeTitle(filename.replace(IMAGE_EXT, ""));
    if (!index.has(key)) {
      index.set(key, filename);
    }
  }

  return index;
}

function buildPaintings(csvEntries, fileIndex) {
  const usedIds = new Set();
  const paintings = [];

  for (const entry of csvEntries) {
    const filename = fileIndex.get(normalizeTitle(entry.title));
    if (!filename) continue;

    let id = titleToId(entry.title);
    if (usedIds.has(id)) {
      id = `${id}-${path.extname(filename).slice(1).toLowerCase()}`;
    }
    usedIds.add(id);

    paintings.push({
      id,
      title: entry.title,
      category: entry.category,
      year: entry.year,
      medium: entry.medium,
      size: entry.size,
      image: `/images/paintings/${encodeURI(filename)}`,
    });
  }

  return paintings;
}

function emitTs(paintings, catalogVersion) {
  const lines = [
    `export const PAINTING_CATALOG_VERSION = ${JSON.stringify(catalogVersion)};`,
    "",
    "export interface Painting {",
    '  id: string;',
    "  title: string;",
    '  category: "adobe" | "cactus" | "flowers" | "imaginary" | "other";',
    "  year: number;",
    "  medium: string;",
    "  size: string;",
    "  image: string;",
    "}",
    "",
    "export const paintings: Painting[] = [",
  ];

  for (const painting of paintings) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(painting.id)},`);
    lines.push(`    title: ${JSON.stringify(painting.title)},`);
    lines.push(`    category: ${JSON.stringify(painting.category)},`);
    lines.push(`    year: ${painting.year},`);
    lines.push(`    medium: ${JSON.stringify(painting.medium)},`);
    lines.push(`    size: ${JSON.stringify(painting.size)},`);
    lines.push(`    image: ${JSON.stringify(painting.image)},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  lines.push("export const categories = [");
  lines.push('  { id: "all", label: "All" },');
  lines.push('  { id: "adobe", label: "Adobe" },');
  lines.push('  { id: "cactus", label: "Cactus" },');
  lines.push('  { id: "flowers", label: "Flowers" },');
  lines.push('  { id: "imaginary", label: "Imaginary" },');
  lines.push('  { id: "other", label: "Other" },');
  lines.push("];");
  lines.push("");

  return lines.join("\n");
}

const csvText = fs.readFileSync(csvPath, "utf8");
const catalogVersion = crypto
  .createHash("sha256")
  .update(csvText)
  .digest("hex")
  .slice(0, 12);
const csvEntries = parseCsvEntries(csvText);
const files = listImageFiles();
const fileIndex = buildFileIndex(files);
const paintings = buildPaintings(csvEntries, fileIndex);

fs.writeFileSync(outPath, emitTs(paintings, catalogVersion), "utf8");

console.log(`Wrote ${paintings.length} paintings to ${outPath}`);

const includedTitles = new Set(paintings.map((painting) => painting.title));
const csvWithoutImages = csvEntries
  .map((entry) => entry.title)
  .filter((title) => !includedTitles.has(title));

const csvTitleKeys = new Set(
  csvEntries.map((entry) => normalizeTitle(entry.title))
);
const excludedImages = files.filter(
  (file) => !csvTitleKeys.has(normalizeTitle(file.replace(IMAGE_EXT, "")))
);

if (csvWithoutImages.length) {
  console.log(
    `CSV entries without image files (${csvWithoutImages.length}):`,
    csvWithoutImages.join(", ")
  );
}

if (excludedImages.length) {
  console.log(
    `Image files excluded (not in CSV) (${excludedImages.length}):`,
    excludedImages.join(", ")
  );
}
