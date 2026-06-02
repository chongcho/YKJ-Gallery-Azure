"use client";

import { useState } from "react";
import ExhibitionImage from "./ExhibitionImage";
import GalleryLightbox from "./GalleryLightbox";

const galleryImages = [
  { src: "/images/Gallery/Gallery%201.JPG", alt: "YKJ Gallery 1" },
  { src: "/images/Gallery/Gallery%202.JPG", alt: "YKJ Gallery 2" },
  { src: "/images/Gallery/Gallery%203.JPG", alt: "YKJ Gallery 3" },
  { src: "/images/Gallery/Gallery%204.JPG", alt: "YKJ Gallery 4" },
  { src: "/images/Gallery/Gallery%205.JPG", alt: "YKJ Gallery 5" },
  { src: "/images/Gallery/Gallery%206.JPG", alt: "YKJ Gallery 6" },
];

export default function GalleryContent() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  function goToPrevious() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }

  function goToNext() {
    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
        A look inside YKJ Gallery — our space, exhibitions, and the art on
        display.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className="overflow-hidden rounded-sm bg-warm-gray text-left cursor-pointer group"
            aria-label={`View ${image.alt}`}
          >
            <ExhibitionImage
              src={image.src}
              alt={image.alt}
              className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {selectedImage && selectedIndex !== null && (
        <GalleryLightbox
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedIndex(null)}
          onPrevious={goToPrevious}
          onNext={goToNext}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < galleryImages.length - 1}
        />
      )}
    </section>
  );
}
