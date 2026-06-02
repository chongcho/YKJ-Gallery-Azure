"use client";

import { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function GalleryLightbox({
  src,
  alt,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-30 text-3xl leading-none text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        &times;
      </button>

      {hasPrevious && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
          }}
          className="absolute bottom-6 left-4 z-30 p-2 text-white/70 hover:text-white transition-colors md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2 md:p-3"
          aria-label="Previous image"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="absolute bottom-6 right-4 z-30 p-2 text-white/70 hover:text-white transition-colors md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 md:p-3"
          aria-label="Next image"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.svg";
            e.currentTarget.onerror = null;
          }}
        />
      </div>
    </div>
  );
}
