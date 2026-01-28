import { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  FloatingShapes,
  IconWatermark,
  SectionDivider,
  useScrollAnimation,
} from "./Decorative";

type FilterType = "all" | "photos" | "videos" | "vacation-rentals" | "3d-tours";

interface PortfolioItem {
  id: number;
  type: FilterType;
  title: string;
  category: string;
  thumbnail: string;
  isVideo?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: "photos",
    title: "Connerton Home",
    category: "Photography",
    thumbnail: "/images/portfolio/connerton-1.jpg",
  },
];

const filters = [
  { id: "all", label: "All Work" },
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "vacation-rentals", label: "Vacation Rentals" },
  { id: "3d-tours", label: "3D Tours" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentItem = filteredItems[currentImageIndex];

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

        {/* Filter Tabs */}
        <div className="mt-8 mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as FilterType)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-blue-coastal to-blue-coastal-hover text-white shadow-lg shadow-blue-coastal/20"
                  : "border border-surface-dark bg-navy-deep text-gray-muted hover:border-blue-coastal/40 hover:text-text-light"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-surface-dark bg-navy-deep card-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-sm font-medium text-blue-coastal">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-semibold text-text-light">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Blue overlay tint on hover */}
              <div className="absolute inset-0 bg-blue-coastal/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Video Icon */}
              {item.isVideo && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-coastal/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-coastal/30">
                    <Play className="ml-1 h-8 w-8 fill-white text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-surface-dark/80 p-2 text-white backdrop-blur-sm transition-colors hover:bg-blue-coastal/20"
          >
            <X className="h-6 w-6" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface-dark/80 p-3 text-white backdrop-blur-sm transition-colors hover:bg-blue-coastal/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface-dark/80 p-3 text-white backdrop-blur-sm transition-colors hover:bg-blue-coastal/20"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.isVideo ? (
              <div className="relative aspect-video w-full">
                <div className="flex h-full items-center justify-center rounded-lg bg-surface-dark">
                  <p className="text-gray-muted">Video player would go here</p>
                </div>
              </div>
            ) : (
              <img
                src={currentItem.thumbnail}
                alt={currentItem.title}
                className="max-h-[90vh] w-full rounded-lg object-contain"
              />
            )}

            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-blue-coastal">
                {currentItem.category}
              </p>
              <h3 className="text-xl font-semibold text-text-light">
                {currentItem.title}
              </h3>
              <p className="mt-2 text-sm text-gray-muted/60">
                {currentImageIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
