export interface Video {
  title: string;
  description: string;
  placeholder: string;
  /** Path to your video file in public/videos/ (e.g. /videos/adobe-3.mp4) */
  src?: string;
  /** YouTube video ID - alternative to src */
  youtubeId?: string;
  /** Vimeo video ID - alternative to src */
  vimeoId?: string;
}

/** Local `src` omitted: Azure Static Web Apps free tier limits deploy size (~250MB); large MP4s are not bundled. Add `src` when hosting elsewhere or after upgrading plan. */
export const videos: Video[] = [
  {
    title: "Taos",
    description: "Painting process video for the Taos series.",
    placeholder: "/images/paintings/taos.jpg",
  },
  {
    title: "Adobe 1",
    description: "Painting process video for Adobe 1.",
    placeholder: "/images/paintings/adobe.jpg",
  },
  {
    title: "Adobe 2",
    description: "Painting process video for Adobe 2.",
    placeholder: "/images/paintings/adobe-2.jpg",
  },
  {
    title: "Adobe 3",
    description: "Painting process video for Adobe 3.",
    placeholder: "/images/paintings/adobe-3.jpg",
  },
  {
    title: "Cactus 1",
    description: "Painting process video for Cactus 1.",
    placeholder: "/images/paintings/cactus-1.jpg",
  },
  {
    title: "Cactus 2",
    description: "Painting process video for Cactus 2.",
    placeholder: "/images/paintings/cactus-2.jpg",
  },
  {
    title: "Cactus 3",
    description: "Painting process video for Cactus 3.",
    placeholder: "/images/paintings/cactus-3.jpg",
  },
  {
    title: "Cactus 5",
    description: "Painting process video for Cactus 5.",
    placeholder: "/images/paintings/cactus-5.jpg",
  },
  {
    title: "Cactus 6",
    description: "Painting process video for Cactus 6.",
    placeholder: "/images/paintings/cactus-6.jpg",
  },
  {
    title: "Blossom",
    description: "Painting process video for Blossom.",
    placeholder: "/images/paintings/blossom.jpg",
  },
  {
    title: "Flowers",
    description: "Painting process video for Flowers.",
    placeholder: "/images/paintings/flowers.jpg",
  },
  {
    title: "Flowers 2",
    description: "Painting process video for Flowers 2.",
    placeholder: "/images/paintings/flowers-2.jpg",
  },
  {
    title: "Rose 2",
    description: "Painting process video for Rose 2.",
    placeholder: "/images/paintings/rose-2.jpg",
  },
  {
    title: "Autumn Leaves",
    description: "Painting process video for Autumn Leaves.",
    placeholder: "/images/paintings/wildflowers.jpg",
  },
];
