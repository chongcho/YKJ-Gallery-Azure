import ExhibitionImage from "./ExhibitionImage";

const galleryImages = [
  { src: "/images/Gallery/Gallery%201.JPG", alt: "YKJ Gallery 1" },
  { src: "/images/Gallery/Gallery%202.JPG", alt: "YKJ Gallery 2" },
  { src: "/images/Gallery/Gallery%203.JPG", alt: "YKJ Gallery 3" },
  { src: "/images/Gallery/Gallery%204.JPG", alt: "YKJ Gallery 4" },
  { src: "/images/Gallery/Gallery%205.JPG", alt: "YKJ Gallery 5" },
  { src: "/images/Gallery/Gallery%206.JPG", alt: "YKJ Gallery 6" },
];

export default function GalleryContent() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
        A look inside YKJ Gallery — our space, exhibitions, and the art on
        display.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-sm bg-warm-gray"
          >
            <ExhibitionImage
              src={image.src}
              alt={image.alt}
              className="block w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
