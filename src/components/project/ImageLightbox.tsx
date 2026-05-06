"use client";

import { X } from "lucide-react";
import { capture } from "@/lib/analytics";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImageLightboxProps {
  children: React.ReactNode;
}

export const ImageLightbox = ({ children }: ImageLightboxProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const img = (e.target as HTMLElement).closest("img[data-zoomable]");
      if (img) {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") ?? "";
        if (src) {
          setSelectedImage({ src, alt });
          capture("image_lightbox_opened", {
            image_src: src,
            image_alt: alt,
          });
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, handleClose]);

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: event delegation for zoomable images */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        role="presentation"
      >
        {children}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          {/* biome-ignore lint/performance/noImgElement: lightbox needs unknown-dimension images */}
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
};
