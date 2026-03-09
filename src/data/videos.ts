export interface Video {
  title: string;
  description: string;
  placeholder: string;
  /** YouTube video ID - add after uploading to YouTube (from youtube.com/watch?v=THIS_PART) */
  youtubeId?: string;
  /** Vimeo video ID - add after uploading to Vimeo (from vimeo.com/THIS_PART) */
  vimeoId?: string;
}

export const videos: Video[] = [
  {
    title: "Adobe 3a",
    description: "A painting process video showcasing the Adobe series.",
    placeholder: "/images/paintings/adobe-3.jpg",
    // youtubeId: "YOUR_VIDEO_ID", // Add after uploading to YouTube
  },
  {
    title: "Golf",
    description: "Art inspired by the greens and landscapes of the golf course.",
    placeholder: "/images/paintings/wildflowers.jpg",
    // youtubeId: "YOUR_VIDEO_ID",
  },
  {
    title: "Cactus 5",
    description: "Watch the creation of the Cactus 5 painting.",
    placeholder: "/images/paintings/cactus-5.jpg",
    // youtubeId: "YOUR_VIDEO_ID",
  },
];
