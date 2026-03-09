import type { Metadata } from "next";
import VideoContent from "@/components/VideoContent";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Watch videos of Young K Jang's painting process and art collections.",
};

export default function VideoPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Video</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <VideoContent />
    </>
  );
}
