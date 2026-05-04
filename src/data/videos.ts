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
    placeholder: "/images/paintings/Taos-1.jpg",
    src: "/videos/Taos.mp4",
  },
  {
    title: "Cactus",
    description: "Painting process video for Cactus.",
    placeholder: "/images/paintings/Cactus in vase.jpg",
    src: "/videos/Cactus.mp4",
  },
  {
    title: "Autumn Leaves",
    description: "Painting process video for Autumn Leaves.",
    placeholder: "/images/paintings/Autumn Leaves-1.JPG",
    src: "/videos/Autumn Leaves.mp4",
  },
  {
    title: "Golf",
    description: "Painting process video for Golf.",
    placeholder: "/images/paintings/Golf.jpg",
    src: "/videos/Golf.mp4",
  },
];
