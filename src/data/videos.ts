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
  {
    title: "Video 4",
    description: "Painting process video.",
    placeholder: "/images/paintings/taos.jpg",
    src: "/videos/video-4.mp4",
  },
  {
    title: "Video 5",
    description: "Painting process video.",
    placeholder: "/images/paintings/taos-2.jpg",
    src: "/videos/video-5.mp4",
  },
  {
    title: "Video 6",
    description: "Painting process video.",
    placeholder: "/images/paintings/taos-3.jpg",
    src: "/videos/video-6.mp4",
  },
  {
    title: "Video 7",
    description: "Painting process video.",
    placeholder: "/images/paintings/adobe.jpg",
    src: "/videos/video-7.mp4",
  },
  {
    title: "Video 8",
    description: "Painting process video.",
    placeholder: "/images/paintings/adobe-2.jpg",
    src: "/videos/video-8.mp4",
  },
  {
    title: "Video 9",
    description: "Painting process video.",
    placeholder: "/images/paintings/cactus-1.jpg",
    src: "/videos/video-9.mp4",
  },
  {
    title: "Video 10",
    description: "Painting process video.",
    placeholder: "/images/paintings/blossom.jpg",
    src: "/videos/video-10.mp4",
  },
  {
    title: "Video 11",
    description: "Painting process video.",
    placeholder: "/images/paintings/flowers.jpg",
    src: "/videos/video-11.mp4",
  },
  {
    title: "Video 12",
    description: "Painting process video.",
    placeholder: "/images/paintings/wildflowers.jpg",
    src: "/videos/video-12.mp4",
  },
  {
    title: "Video 13",
    description: "Painting process video.",
    placeholder: "/images/paintings/rose.jpg",
    src: "/videos/video-13.mp4",
  },
  {
    title: "Video 14",
    description: "Painting process video.",
    placeholder: "/images/paintings/piano-and-stairways.jpg",
    src: "/videos/video-14.mp4",
  },
];
