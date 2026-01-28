import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Images, PlayCircle } from "lucide-react";
import {
  FloatingShapes,
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

// Project cards for the Work grid
interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  type: "gallery" | "photo" | "video";
  photoCount?: number;
  videoUrl?: string;
}

const projects: Project[] = [
  {
    id: "bimini-gallery",
    title: "Bimini Bay Resort",
    category: "Photo Gallery",
    thumbnail: "/images/portfolio/bimini-gallery/DSC00234.jpg",
    type: "gallery",
    photoCount: 13,
  },
  {
    id: "bimini-video",
    title: "Bimini Bay Resort",
    category: "Property Tour",
    thumbnail: "/images/portfolio/bimini-gallery/DSC00269.jpg",
    type: "video",
    videoUrl: "/videos/Jalen-Bimini-horizontal.mp4",
  },
  {
    id: "connerton",
    title: "Connerton Home",
    category: "Residential",
    thumbnail: "/images/portfolio/connerton-1.jpg",
    type: "photo",
  },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<typeof biminiGallery | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const openProject = (project: Project) => {
    if (project.type === "gallery" && project.id === "bimini-gallery") {
      setActiveGallery(biminiGallery);
      setCurrentImageIndex(0);
      setLightboxOpen(true);
    } else if (project.type === "photo") {
      // Single photo opens as a one-image gallery
      setActiveGallery([{ src: project.thumbnail, alt: project.title }]);
      setCurrentImageIndex(0);
      setLightboxOpen(true);
    } else if (project.type === "video" && project.videoUrl) {
      setActiveVideoUrl(project.videoUrl);
      setVideoModalOpen(true);
    }
  };

  const closeVideoModal = useCallback(() => {
    setVideoModalOpen(false);
    setActiveVideoUrl(null);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setActiveGallery(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (!activeGallery) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeGallery.length - 1 : prev - 1
    );
  }, [activeGallery]);

  const goToNext = useCallback(() => {
    if (!activeGallery) return;
    setCurrentImageIndex((prev) =>
      prev === activeGallery.length - 1 ? 0 : prev + 1
    );
  }, [activeGallery]);

  // Keyboard navigation for lightbox
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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Keyboard navigation for video modal
  useEffect(() => {
    if (!videoModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVideoModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoModalOpen, closeVideoModal]);

  const currentImage = activeGallery?.[currentImageIndex];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-surface-dark bg-navy-deep py-20 md:py-24"
    >
      <FloatingShapes />

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

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-lg border border-surface-dark bg-navy-deep card-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Blue overlay on hover */}
              <div className="absolute inset-0 bg-blue-coastal/0 transition-all duration-300 group-hover:bg-blue-coastal/20" />

              {/* Gradient overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-80" />

              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-medium text-blue-coastal mb-1">
                  {project.category}
                </p>
                <h3 className="text-xl font-semibold text-text-light">
                  {project.title}
                </h3>
                {project.photoCount && (
                  <p className="mt-1 text-sm text-gray-muted flex items-center gap-1">
                    <Images className="h-4 w-4" />
                    {project.photoCount} photos
                  </p>
                )}
              </div>

              {/* Play button for video cards */}
              {project.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-navy-deep/60 p-2 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}

              {/* View indicator on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-navy-deep/80 px-5 py-2.5 backdrop-blur-sm border border-blue-coastal/30">
                  <Eye className="h-5 w-5 text-blue-coastal" />
                  <span className="text-sm font-medium text-text-light">
                    {project.type === "gallery" ? "View Gallery" : project.type === "video" ? "Watch Video" : "View Photo"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && activeGallery && (
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
                {activeGallery.length}
              </span>
            </div>

            {/* Keyboard hint */}
            <p className="mt-2 text-xs text-gray-muted/60 hidden md:block">
              Use arrow keys to navigate &bull; ESC to close
            </p>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && activeVideoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 backdrop-blur-md"
          onClick={closeVideoModal}
        >
          {/* Close button */}
          <button
            onClick={closeVideoModal}
            className="absolute right-4 top-4 z-20 rounded-full bg-blue-coastal p-3 text-white shadow-lg shadow-blue-coastal/30 transition-all duration-300 hover:scale-110 hover:bg-blue-coastal-hover md:right-6 md:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Video container */}
          <div
            className="relative w-full max-w-[90vw] max-h-[90vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoUrl}
              controls
              autoPlay
              className="w-full h-full rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Keyboard hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-muted/60 hidden md:block">
            Press ESC to close
          </p>
        </div>
      )}
    </section>
  );
}
