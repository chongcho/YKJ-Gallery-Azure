/**
 * Seed Supabase with initial data. Run after creating tables:
 * npx tsx scripts/seed.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (for bypassing RLS)
 * Or use anon key with a logged-in admin session - this script uses service role for simplicity.
 */
import { createClient } from "@supabase/supabase-js";
import { paintings } from "../src/data/paintings";
import { videos } from "../src/data/videos";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY) in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const exhibitions = [
  {
    title: "Seattle Art Fair",
    tagline: null,
    description: null,
    location: null,
    link: "https://seattleartfair.com/",
    link_label: "Learn More",
    order: 0,
  },
  {
    title: "Young K. Jang & Young Nam Cho",
    tagline: "Memories, Moments, Hopes",
    description: "THE SPACE Art and Meet. A joint exhibition featuring Young-Nam Cho and Young-Kyung Jang.",
    location: "Event Center",
    link: null,
    link_label: null,
    order: 1,
  },
  {
    title: "Student Exhibition",
    tagline: null,
    description: "Student artwork showcase at THE SPACE.",
    location: null,
    link: null,
    link_label: null,
    order: 2,
  },
];

const exhibitionImages: Record<number, string[]> = {
  0: ["/images/exhibition/seattle-art-fair-2023.jpg", "/images/exhibition/seattle-art-fair-interior.jpg"],
  1: ["/images/exhibition/young-k-jang-young-nam-cho.jpg"],
  2: ["/images/exhibition/student-exhibition-1.jpg", "/images/exhibition/student-exhibition-2.jpg"],
};

async function seed() {
  // Paintings
  const { error: paintingsError } = await supabase.from("paintings").upsert(
    paintings.map((p, i) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      medium: p.medium,
      size: p.size,
      image: p.image,
      order: i,
    })),
    { onConflict: "id" }
  );
  if (paintingsError) console.error("Paintings:", paintingsError);
  else console.log(`Seeded ${paintings.length} paintings`);

  // Exhibitions - delete existing and re-insert for clean seed
  await supabase.from("exhibition_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("exhibitions").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const { data: exhibitionRows, error: exhibitionsError } = await supabase
    .from("exhibitions")
    .insert(exhibitions)
    .select("id");
  if (exhibitionsError) {
    console.error("Exhibitions:", exhibitionsError);
  } else if (exhibitionRows) {
    console.log(`Seeded ${exhibitionRows.length} exhibitions`);
    for (let i = 0; i < exhibitionRows.length; i++) {
      const exId = exhibitionRows[i].id;
      const images = exhibitionImages[i] || [];
      if (images.length) {
        await supabase.from("exhibition_images").insert(
          images.map((src, o) => ({ exhibition_id: exId, src, order: o }))
        );
      }
    }
  }

  // Videos - delete and re-insert
  await supabase.from("videos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: videosError } = await supabase.from("videos").insert(
    videos.map((v, i) => ({
      title: v.title,
      description: v.description,
      placeholder: v.placeholder,
      src: v.src ?? null,
      youtube_id: v.youtubeId ?? null,
      vimeo_id: v.vimeoId ?? null,
      order: i,
    }))
  );
  if (videosError) console.error("Videos:", videosError);
  else console.log(`Seeded ${videos.length} videos`);

  console.log("Seed complete.");
}

seed();
