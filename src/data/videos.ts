export interface Video {
  title: string;
  description: string;
  placeholder: string;
  /** Path to your video file in public/videos/ (e.g. /videos/adobe-3a.mp4) */
  src?: string;
  /** YouTube video ID - alternative to src */
  youtubeId?: string;
  /** Vimeo video ID - alternative to src */
  vimeoId?: string;
}

export const videos: Video[] = [
  {
    title: "Adobe 3a",
    description: "A painting process video showcasing the Adobe series.",
    placeholder: "/images/paintings/adobe-3.jpg",
    src: "/videos/adobe-3a.mp4",
  },
  {
    title: "Golf",
    description: "Art inspired by the greens and landscapes of the golf course.",
    placeholder: "/images/paintings/wildflowers.jpg",
    src: "/videos/golf.mp4",
  },
  {
    title: "Cactus 5",
    description: "Watch the creation of the Cactus 5 painting.",
    placeholder: "/images/paintings/cactus-5.jpg",
    src: "/videos/cactus-5.mp4",
  },
];
