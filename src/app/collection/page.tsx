import type { Metadata } from "next";
import CollectionGallery from "@/components/CollectionGallery";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Browse the full collection of contemporary paintings by Young K Jang — Taos, Adobe, Cactus, Flowers, Blossom, and more.",
};

export default function CollectionPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Collections</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <CollectionGallery />
    </>
  );
}
