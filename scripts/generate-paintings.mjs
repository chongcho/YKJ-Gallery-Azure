import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const paintingsDir = path.join(root, "public", "images", "paintings");
const oldPaintingsPath = path.join(root, "src", "data", "paintings.ts");
const outPath = oldPaintingsPath;

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

function parseOldPaintings(source) {
  const metadata = new Map();
  const blockRe =
    /\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*year:\s*(\d+),\s*medium:\s*"([^"]*)",\s*size:\s*"([^"]*)",\s*image:\s*"([^"]+)",\s*\}/g;

  for (const match of source.matchAll(blockRe)) {
    const [, , title, category, year, medium, size, imagePath] = match;
    const basename = decodeURIComponent(path.basename(imagePath));
    const key = normalizeTitle(basename.replace(IMAGE_EXT, ""));
    metadata.set(key, {
      title,
      category,
      year: Number(year),
      medium,
      size,
    });
  }

  return metadata;
}

function listImageFiles() {
  return fs
    .readdirSync(paintingsDir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function buildPaintings(files, metadata) {
  const usedIds = new Set();
  const paintings = [];

  for (const filename of files) {
    const titleFromFile = filename.replace(IMAGE_EXT, "");
    const meta = metadata.get(normalizeTitle(titleFromFile));

    let id = titleToId(titleFromFile);
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

const oldSource = execSync("git show HEAD:src/data/paintings.ts", {
  cwd: root,
  encoding: "utf8",
});
const metadata = parseOldPaintings(oldSource);

// Carry over metadata for renamed files.
const renameAliases = [
  ["flower-1", "flower-1"],
  ["flower-2", "flower-2"],
  ["flower--5", "flower-5"],
  ["flower--11", "flower-11"],
  ["taos-2", "taos-2"],
  ["taos-3", "taos-3"],
];

for (const [oldKey, newKey] of renameAliases) {
  const oldMeta = metadata.get(normalizeTitle(oldKey));
  if (oldMeta) metadata.set(normalizeTitle(newKey), oldMeta);
}

const manualMetadata = {
  "abstract-12": {
    title: "Abstract-12",
    category: "other",
    year: 2018,
    medium: "Acrylic on canvas",
    size: "36” x 36”",
  },
  "flower-6": {
    title: "Flower-6",
    category: "flowers",
    year: 2018,
    medium: "Acrylic and Mixed Media on canvas",
    size: "16” x 20”",
  },
  "flower-7": {
    title: "Flower-7",
    category: "flowers",
    year: 2019,
    medium: "Acrylic and Mixed Media on canvas",
    size: "12” x 12”",
  },
  "flower-8": {
    title: "Flower-8",
    category: "flowers",
    year: 2019,
    medium: "Acrylic and Mixed Media on canvas",
    size: "12” x 12”",
  },
  "flower-9": {
    title: "Flower-9",
    category: "flowers",
    year: 2019,
    medium: "Acrylic and Mixed Media on canvas",
    size: "12” x 12”",
  },
  "flower-11": {
    title: "Flower-11",
    category: "flowers",
    year: 2018,
    medium: "Acrylic and Mixed Media on canvas",
    size: "36” x 24”",
  },
  "flower-5": {
    title: "Flower-5",
    category: "flowers",
    year: 2018,
    medium: "Acrylic and Mixed Media on canvas",
    size: "36” x 24”",
  },
  fox: {
    title: "Fox",
    category: "other",
    year: 2018,
    medium: "Acrylic on canvas",
    size: "24” x 30”",
  },
  "the witch": {
    title: "The Witch",
    category: "other",
    year: 2018,
    medium: "Acrylic on canvas",
    size: "24” x 30”",
  },
  "yacht on lake": {
    title: "Yacht on Lake",
    category: "other",
    year: 2017,
    medium: "Acrylic on canvas",
    size: "24” x 24”",
  },
  sunflowers: {
    title: "Sunflowers",
    category: "flowers",
    year: 2020,
    medium: "Acrylic on canvas",
    size: "",
  },
  fire: {
    title: "Fire",
    category: "other",
    year: 2020,
    medium: "Acrylic on canvas",
    size: "",
  },
  "un finished": {
    title: "Un finished",
    category: "other",
    year: 2020,
    medium: "Acrylic on canvas",
    size: "",
  },
  unfinished: {
    title: "Unfinished",
    category: "other",
    year: 2020,
    medium: "Acrylic on canvas",
    size: "",
  },
};

for (const [key, value] of Object.entries(manualMetadata)) {
  metadata.set(normalizeTitle(key), value);
}

for (let i = 1; i <= 9; i++) {
  metadata.set(normalizeTitle(`practice-${i}`), {
    title: `Practice-${i}`,
    category: "other",
    year: 2020,
    medium: "Acrylic on canvas",
    size: "",
  });
}

const files = listImageFiles();
const paintings = buildPaintings(files, metadata);
fs.writeFileSync(outPath, emitTs(paintings), "utf8");

console.log(`Wrote ${paintings.length} paintings to ${outPath}`);

const missingMeta = paintings.filter((p) => !p.size);
if (missingMeta.length) {
  console.log(
    `Note: ${missingMeta.length} paintings have no size metadata:`,
    missingMeta.map((p) => p.title).join(", ")
  );
}
