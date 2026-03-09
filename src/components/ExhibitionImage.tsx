"use client";

export default function ExhibitionImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/images/placeholder.svg";
        e.currentTarget.onerror = null;
      }}
    />
  );
}
