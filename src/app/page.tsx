import HeroSlideshow from "@/components/HeroSlideshow";
import CollectionGallery from "@/components/CollectionGallery";

export default function Home() {
  return (
    <>
      <HeroSlideshow />

      {/* Full Collection */}
      <section id="collection" className="scroll-mt-20">
        <div className="bg-warm-gray py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-serif text-5xl mb-4">Collections</h2>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </div>
        </div>
        <CollectionGallery />
      </section>
    </>
  );
}
