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

function parseCsvMetadata(csvText) {
  const metadata = new Map();
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim());

  for (const line of lines.slice(1)) {
    const [title, , yearRaw, medium, sizeRaw] = parseCsvLine(line);
    if (!title || title === "Art Title") continue;

    const year = Number.parseInt(yearRaw, 10);
    if (!Number.isFinite(year)) continue;

    const entry = {
      title,
      year,
      medium: medium || "Acrylic on canvas",
      size: cleanSize(sizeRaw || ""),
      category: inferCategory(title),
    };

    metadata.set(normalizeTitle(title), entry);
  }

  return metadata;
}

function listImageFiles() {
  return fs
    .readdirSync(paintingsDir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function findMetadata(filename, metadata) {
  const titleFromFile = filename.replace(IMAGE_EXT, "");
  const key = normalizeTitle(titleFromFile);
  if (metadata.has(key)) return metadata.get(key);

  for (const [metaKey, entry] of metadata.entries()) {
    if (metaKey === key) return entry;
  }

  return null;
}

function buildPaintings(files, metadata) {
  const usedIds = new Set();
  const paintings = [];

  for (const filename of files) {
    const titleFromFile = filename.replace(IMAGE_EXT, "");
    const meta = findMetadata(filename, metadata);

    let id = titleToId(meta?.title ?? titleFromFile);
    if (usedIds.has(id)) {
      id = `${id}-${path.extname(filename).slice(1).toLowerCase()}`;
    }
    usedIds.add(id);

    paintings.push({
      id,
      title: meta?.title ?? titleFromFile,
      category: meta?.category ?? inferCategory(titleFromFile),
      year: meta?.year ?? 2020,
      medium: meta?.medium ?? "Acrylic on canvas",
      size: meta?.size ?? "",
      image: `/images/paintings/${encodeURI(filename)}`,
    });
  }

  return paintings;
}

function emitTs(paintings) {
  const lines = [
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
const metadata = parseCsvMetadata(csvText);
const files = listImageFiles();
const paintings = buildPaintings(files, metadata);

fs.writeFileSync(outPath, emitTs(paintings), "utf8");

console.log(`Wrote ${paintings.length} paintings to ${outPath}`);

const csvTitles = [...metadata.values()].map((entry) => entry.title);
const matchedTitles = new Set(
  files
    .map((file) => findMetadata(file, metadata)?.title)
    .filter(Boolean)
);
const csvWithoutImages = csvTitles.filter((title) => !matchedTitles.has(title));
const imagesWithoutCsv = paintings.filter((painting) => {
  const fileTitle = decodeURIComponent(path.basename(painting.image)).replace(
    IMAGE_EXT,
    ""
  );
  return !metadata.has(normalizeTitle(fileTitle));
});

if (csvWithoutImages.length) {
  console.log(
    `CSV entries without image files (${csvWithoutImages.length}):`,
    csvWithoutImages.join(", ")
  );
}

if (imagesWithoutCsv.length) {
  console.log(
    `Image files without CSV metadata (${imagesWithoutCsv.length}):`,
    imagesWithoutCsv.map((painting) => painting.title).join(", ")
  );
}

const missingSize = paintings.filter((painting) => !painting.size);
if (missingSize.length) {
  console.log(
    `Paintings missing size (${missingSize.length}):`,
    missingSize.map((painting) => painting.title).join(", ")
  );
}
