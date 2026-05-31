"use client";

import { useEffect, useRef, useState } from "react";
import type { Painting } from "@/data/paintings";
import { useSwAuth } from "@/hooks/useSwAuth";

interface Props {
  painting: Painting;
  /** Resolved image URL (static path or blob override) */
  imageSrc: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onImageUploaded?: () => void;
}

function fileToBase64(file: File): Promise<{ base64: string; contentType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const comma = dataUrl.indexOf(",");
      if (comma === -1) {
        reject(new Error("Invalid file data"));
        return;
      }
      const header = dataUrl.slice(0, comma);
      const contentTypeMatch = header.match(/data:([^;]+)/);
      const contentType = contentTypeMatch
        ? contentTypeMatch[1]
        : file.type || "image/jpeg";
      const base64 = dataUrl.slice(comma + 1);
      resolve({ base64, contentType });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function PaintingModal({
  painting,
  imageSrc,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  onImageUploaded,
}: Props) {
  const { isAuthenticated } = useSwAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

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

  useEffect(() => {
    setPreviewKey(0);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [painting.id]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError("Choose an image file first.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      const { base64, contentType } = await fileToBase64(file);
      const res = await fetch("/api/upload-painting-image", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paintingId: painting.id,
          imageBase64: base64,
          contentType,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadError(data.error || `Upload failed (${res.status})`);
        return;
      }
      onImageUploaded?.();
      setPreviewKey((k) => k + 1);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={painting.title}
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

      <div className="absolute top-4 left-4 sm:left-6 md:left-8 z-30 pointer-events-none max-w-[min(50vw,calc(100%-6rem))]">
        <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-white text-left">
          {painting.title}
        </h2>
        <div className="w-10 h-0.5 bg-gold mt-2" />
      </div>

      {hasPrevious && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white/70 hover:text-white transition-colors"
          aria-label="Previous artwork"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
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
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white/70 hover:text-white transition-colors"
          aria-label="Next artwork"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
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
          key={`${imageSrc}-${previewKey}`}
          src={imageSrc}
          alt={painting.title}
          className="h-full w-full object-contain select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.svg";
            e.currentTarget.onerror = null;
          }}
        />
      </div>

      {isAuthenticated && (
        <form
          onSubmit={handleUpload}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-4 z-30 max-w-sm rounded-sm bg-black/80 border border-white/20 p-3 space-y-2"
        >
          <p className="text-xs text-white/60">
            Replace image for this painting (saved to Azure Blob; public URL
            updates the gallery).
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="text-xs max-w-full text-white"
              disabled={uploading}
            />
            <button
              type="submit"
              disabled={uploading}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold text-white hover:bg-gold/90 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
          {uploadError && (
            <p className="text-xs text-red-400">{uploadError}</p>
          )}
        </form>
      )}
    </div>
  );
}
