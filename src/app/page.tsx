import HeroSlideshow from "@/components/HeroSlideshow";
import CollectionGallery from "@/components/CollectionGallery";

export default function Home() {
  return (
    <>
      <HeroSlideshow />

      {/* Full Collection */}
      <section id="collection" className="scroll-mt-20">
        <CollectionGallery />
      </section>
    </>
  );
}
