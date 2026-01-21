import { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

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
    title: "Luxury Estate Photography",
    category: "Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    type: "videos",
    title: "Modern Home Tour",
    category: "Videography",
    thumbnail:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    isVideo: true,
  },
  {
    id: 3,
    type: "3d-tours",
    title: "Virtual Walkthrough",
    category: "3D Tour",
    thumbnail:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    type: "vacation-rentals",
    title: "Beach House Rental",
    category: "Vacation Rental",
    thumbnail:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    type: "photos",
    title: "Downtown Condo",
    category: "Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    type: "videos",
    title: "Waterfront Property",
    category: "Videography",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    isVideo: true,
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

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

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
    <section id="portfolio" className="border-t border-white/5 bg-envoy-navy py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-envoy-muted sm:text-xl">
            Professional media that showcases Tampa Bay properties at their best
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as FilterType)}
              className={`rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-envoy-blue text-white shadow-lg shadow-envoy-blue/20"
                  : "bg-envoy-navy border border-envoy-blue/30 text-envoy-text hover:border-envoy-blue/50 hover:bg-envoy-blue/10"
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
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-envoy-navy"
            >
              {/* Image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-envoy-navy via-envoy-navy/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-sm font-medium text-envoy-blue">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-semibold text-envoy-text">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Video Icon */}
              {item.isVideo && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-envoy-blue/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Next Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Image/Video Content */}
          <div
            className="relative max-h-[90vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.isVideo ? (
              <div className="relative aspect-video w-full">
                <div className="flex h-full items-center justify-center bg-envoy-navy">
                  <p className="text-envoy-text">Video player would go here</p>
                </div>
              </div>
            ) : (
              <img
                src={currentItem.thumbnail}
                alt={currentItem.title}
                className="max-h-[90vh] w-full object-contain"
              />
            )}

            {/* Image Info */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-envoy-blue">
                {currentItem.category}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {currentItem.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">
                {currentImageIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
