import type { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of YKJ Gallery — our space, exhibitions, and contemporary art on display in Seattle.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Gallery</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <GalleryContent />
    </>
  );
}
