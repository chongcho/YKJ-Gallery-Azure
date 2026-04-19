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

export const videos: Video[] = [
  {
    title: "Taos",
    description: "Painting process video for the Taos series.",
    placeholder: "/images/paintings/taos.jpg",
    src: "/videos/Taos.mp4",
  },
  {
    title: "Adobe 1",
    description: "Painting process video for Adobe 1.",
    placeholder: "/images/paintings/adobe.jpg",
    src: "/videos/Adobe 1.mp4",
  },
  {
    title: "Adobe 2",
    description: "Painting process video for Adobe 2.",
    placeholder: "/images/paintings/adobe-2.jpg",
    // Skipped until file is under GitHub 100MB limit; add src when re-encoded
  },
  {
    title: "Adobe 3",
    description: "Painting process video for Adobe 3.",
    placeholder: "/images/paintings/adobe-3.jpg",
    src: "/videos/Adobe 3.mp4",
  },
  {
    title: "Cactus 1",
    description: "Painting process video for Cactus 1.",
    placeholder: "/images/paintings/cactus-1.jpg",
    src: "/videos/Cactus 1.mp4",
  },
  {
    title: "Cactus 2",
    description: "Painting process video for Cactus 2.",
    placeholder: "/images/paintings/cactus-2.jpg",
    src: "/videos/Cactus 2.mp4",
  },
  {
    title: "Cactus 3",
    description: "Painting process video for Cactus 3.",
    placeholder: "/images/paintings/cactus-3.jpg",
    // Skipped until file is under GitHub 100MB limit; add src when re-encoded
  },
  {
    title: "Cactus 5",
    description: "Painting process video for Cactus 5.",
    placeholder: "/images/paintings/cactus-5.jpg",
    src: "/videos/Cactus 5.mp4",
  },
  {
    title: "Cactus 6",
    description: "Painting process video for Cactus 6.",
    placeholder: "/images/paintings/cactus-6.jpg",
    src: "/videos/Cactus 6.mp4",
  },
  {
    title: "Blossom",
    description: "Painting process video for Blossom.",
    placeholder: "/images/paintings/blossom.jpg",
    src: "/videos/Blossom.mp4",
  },
  {
    title: "Flowers",
    description: "Painting process video for Flowers.",
    placeholder: "/images/paintings/flowers.jpg",
    src: "/videos/Flowers.mp4",
  },
  {
    title: "Flowers 2",
    description: "Painting process video for Flowers 2.",
    placeholder: "/images/paintings/flowers-2.jpg",
    src: "/videos/Flowers 2.mp4",
  },
  {
    title: "Rose 2",
    description: "Painting process video for Rose 2.",
    placeholder: "/images/paintings/rose-2.jpg",
    src: "/videos/Rose 2.mp4",
  },
  {
    title: "Autumn Leaves",
    description: "Painting process video for Autumn Leaves.",
    placeholder: "/images/paintings/wildflowers.jpg",
    src: "/videos/Autumn Leaves.mp4",
  },
];
