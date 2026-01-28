import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  FloatingShapes,
  IconWatermark,
  SectionDivider,
  useScrollAnimation,
} from "./Decorative";

// Bimini Bay Resort Gallery Images
const biminiGallery = [
  { src: "/images/portfolio/bimini-gallery/DSC00234.jpg", alt: "Bimini Bay Resort 1" },
  { src: "/images/portfolio/bimini-gallery/DSC00239.jpg", alt: "Bimini Bay Resort 2" },
  { src: "/images/portfolio/bimini-gallery/DSC00244.jpg", alt: "Bimini Bay Resort 3" },
  { src: "/images/portfolio/bimini-gallery/DSC00249.jpg", alt: "Bimini Bay Resort 4" },
  { src: "/images/portfolio/bimini-gallery/DSC00254.jpg", alt: "Bimini Bay Resort 5" },
  { src: "/images/portfolio/bimini-gallery/DSC00264.jpg", alt: "Bimini Bay Resort 6" },
  { src: "/images/portfolio/bimini-gallery/DSC00269.jpg", alt: "Bimini Bay Resort 7" },
  { src: "/images/portfolio/bimini-gallery/DSC00278.jpg", alt: "Bimini Bay Resort 8" },
  { src: "/images/portfolio/bimini-gallery/DSC00279.jpg", alt: "Bimini Bay Resort 9" },
  { src: "/images/portfolio/bimini-gallery/DSC00284.jpg", alt: "Bimini Bay Resort 10" },
  { src: "/images/portfolio/bimini-gallery/DSC00292.jpg", alt: "Bimini Bay Resort 11" },
  { src: "/images/portfolio/bimini-gallery/DSC00294.jpg", alt: "Bimini Bay Resort 12" },
  { src: "/images/portfolio/bimini-gallery/DSC00304.jpg", alt: "Bimini Bay Resort 13" },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? biminiGallery.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === biminiGallery.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  const currentImage = biminiGallery[currentImageIndex];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-surface-dark bg-navy-deep py-20 md:py-24"
    >
      <FloatingShapes />
      <IconWatermark icon={2} position="bottom-left" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-4 text-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
        >
          <h2 className="text-4xl font-bold text-text-light tracking-tight lg:text-5xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-gray-muted sm:text-xl">
            Professional media that showcases Tampa Bay properties at their best
          </p>
        </div>

        <SectionDivider />

        {/* Project Title */}
        <div className="mt-8 mb-8 text-center">
          <h3 className="text-2xl font-semibold text-text-light lg:text-3xl">
            Bimini Bay Resort
          </h3>
          <p className="mt-2 text-gray-muted">Vacation Rental Photography</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {biminiGallery.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-surface-dark bg-navy-deep card-glow transition-all duration-300 hover:scale-[1.03]"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Blue overlay on hover */}
              <div className="absolute inset-0 bg-blue-coastal/0 transition-all duration-300 group-hover:bg-blue-coastal/20" />

              {/* View indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-navy-deep/80 px-4 py-2 backdrop-blur-sm">
                  <Eye className="h-5 w-5 text-blue-coastal" />
                  <span className="text-sm font-medium text-text-light">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image count */}
        <p className="mt-6 text-center text-sm text-gray-muted">
          {biminiGallery.length} photos &bull; Click to view gallery
        </p>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-20 rounded-full bg-blue-coastal p-3 text-white shadow-lg shadow-blue-coastal/30 transition-all duration-300 hover:scale-110 hover:bg-blue-coastal-hover md:right-6 md:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-blue-coastal p-3 text-white shadow-lg shadow-blue-coastal/30 transition-all duration-300 hover:scale-110 hover:bg-blue-coastal-hover md:left-6 md:p-4"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-blue-coastal p-3 text-white shadow-lg shadow-blue-coastal/30 transition-all duration-300 hover:scale-110 hover:bg-blue-coastal-hover md:right-6 md:p-4"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Image container */}
          <div
            className="relative flex flex-col items-center px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl transition-opacity duration-300"
            />

            {/* Counter */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-lg font-medium text-text-light">
                {currentImageIndex + 1}
              </span>
              <span className="text-gray-muted">/</span>
              <span className="text-lg text-gray-muted">
                {biminiGallery.length}
              </span>
            </div>

            {/* Keyboard hint */}
            <p className="mt-2 text-xs text-gray-muted/60 hidden md:block">
              Use arrow keys to navigate &bull; ESC to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
