"use client";

import { useEffect } from "react";
import type { Painting } from "@/data/paintings";

interface Props {
  painting: Painting;
  onClose: () => void;
}

export default function PaintingModal({ painting, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-text-secondary hover:text-text-primary z-10"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="md:w-3/5 bg-warm-gray flex items-center justify-center p-4">
          <img
            src={painting.image}
            alt={painting.title}
            className="max-h-[70vh] w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.svg";
              e.currentTarget.onerror = null;
            }}
          />
        </div>

        <div className="md:w-2/5 p-8 flex flex-col justify-center">
          <h2 className="font-serif text-3xl mb-1">{painting.title}</h2>
          <div className="w-10 h-0.5 bg-gold mb-6" />

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold">Artist</dt>
              <dd className="text-text-secondary">Young K. Jang</dd>
            </div>
            <div>
              <dt className="font-semibold">Year</dt>
              <dd className="text-text-secondary">{painting.year}</dd>
            </div>
            <div>
              <dt className="font-semibold">Medium</dt>
              <dd className="text-text-secondary">{painting.medium}</dd>
            </div>
            <div>
              <dt className="font-semibold">Size</dt>
              <dd className="text-text-secondary">{painting.size}</dd>
            </div>
          </dl>

          <a
            href={`mailto:ykj@ykjgallery.com?subject=Inquiry about ${painting.title}`}
            className="mt-8 inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300 text-center"
          >
            Inquire
          </a>
        </div>
      </div>
    </div>
  );
}
