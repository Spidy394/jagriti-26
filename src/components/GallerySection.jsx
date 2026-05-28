import { useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { galleryData } from "../data/galleryData";
import { useGalleryStore } from "../store/useGalleryStore";

gsap.registerPlugin(ScrollTrigger);

// Helper to handle Google Drive IDs vs Local Paths
const getImageUrl = (source, size = "w400") => {
  if (!source) return "";
  if (source.startsWith("/") || source.startsWith("http")) return source;
  // Use lh3 endpoint which provides direct image access and avoids CORS/redirect issues
  return `https://lh3.googleusercontent.com/d/${source}=${size}`;
};

const GalleryImage = memo(({ photo, alt, onClick }) => {
  const { imageStates, setImageLoaded, setImageSpan } = useGalleryStore();

  const isLoaded = imageStates[photo]?.isLoaded || false;
  const span = imageStates[photo]?.span || 23;

  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setImageSpan(photo, Math.ceil((height + 24) / 10));
        }
      }
    });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [photo, setImageSpan]);

  return (
    <div style={{ gridRowEnd: `span ${span}` }} className="w-full relative">
      <div
        onClick={() => onClick(photo)}
        className={`w-full break-inside-avoid rounded-sm overflow-hidden cursor-zoom-in group relative border border-white/5 hover:border-accent/40 transition-colors ${
          !isLoaded ? "min-h-[200px]" : ""
        }`}
      >
        <img
          ref={imgRef}
          src={getImageUrl(photo, "w400")}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(photo, true)}
          className={`w-full h-auto object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${
            isLoaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-110 blur-md"
          }`}
        />
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
      </div>
    </div>
  );
});
GalleryImage.displayName = "GalleryImage";

const GallerySection = () => {
  const {
    isGalleryOpen,
    setIsGalleryOpen,
    selectedYear,
    setSelectedYear,
    lightboxImg,
    setLightboxImg,
    isLightboxLoaded,
    setIsLightboxLoaded,
    visibleCount,
    incrementVisibleCount,
    isLoading,
    displayPhotos,
    loadPhotos,
    resetGallery,
  } = useGalleryStore();

  const containerRef = useRef(null);
  const observerTarget = useRef(null);

  // Grid handles responsiveness automatically via grid-cols classes

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          visibleCount < displayPhotos.length
        ) {
          incrementVisibleCount(20);
        }
      },
      { rootMargin: "800px", threshold: 0.1 }, // Increased rootMargin to load images long before they are visible
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, visibleCount, displayPhotos.length, incrementVisibleCount]);

  // Hash change listener
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#gallery") {
        setIsGalleryOpen(true);
      } else {
        resetGallery();
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [resetGallery, setIsGalleryOpen]);

  // Entrance animations for cards when modal opens
  useEffect(() => {
    if (isGalleryOpen && !selectedYear) {
      const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
          gsap.to(".gallery-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)", // Nice pop-up bounce
          });
        }, containerRef);
        return () => ctx.revert();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isGalleryOpen, selectedYear]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isGalleryOpen || selectedYear || lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isGalleryOpen, selectedYear, lightboxImg]);

  const closeGallery = () => {
    window.location.hash = "";
  };

  const handleImageClick = useCallback(
    (photo) => {
      setLightboxImg(photo);
      setIsLightboxLoaded(false);
    },
    [setLightboxImg, setIsLightboxLoaded],
  );

  const activeData = galleryData.find((d) => d.year === selectedYear);

  // Dynamically load photos
  useEffect(() => {
    if (activeData) {
      loadPhotos(activeData);
    }
  }, [activeData, loadPhotos]);

  // Slice for pagination
  const paginatedPhotos = displayPhotos.slice(0, visibleCount);

  if (!isGalleryOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-bg/95 backdrop-blur-xl overflow-y-auto flex flex-col justify-center animate-in fade-in duration-300">
      {/* Close button for cards modal */}
      {!selectedYear && (
        <button
          onClick={closeGallery}
          className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-accent transition-colors p-2 z-110"
        >
          <FiX className="text-4xl" />
        </button>
      )}

      {/* Cards View (Hidden if a year is selected) */}
      {!selectedYear && (
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 w-full py-20"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent mb-4">
              Moments
            </p>
            <h2 className="font-['Samarkan',serif] text-5xl md:text-7xl text-text leading-[0.95] tracking-[2px]">
              Gallery
            </h2>
            <div className="w-16 h-px bg-accent opacity-50 mx-auto mt-6" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {galleryData.map((data) => (
              <div
                key={data.year}
                onClick={() => setSelectedYear(data.year)}
                className="gallery-card opacity-0 translate-y-12 scale-90 group relative aspect-3/4 cursor-pointer rounded-sm overflow-hidden border border-white/10 hover:border-accent/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,169,78,0.15)] bg-surface"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={getImageUrl(data.coverImg, "w1000")}
                    alt={`Gallery ${data.year}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 text-center">
                  <h3 className="font-['Samarkan',serif] text-6xl text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 mb-2 transition-all duration-500 group-hover:from-accent group-hover:to-accent/60">
                    {data.year}
                  </h3>
                  <p className="font-['Space_Grotesk',sans-serif] text-sm tracking-[4px] uppercase text-text-dim group-hover:text-white transition-colors duration-300">
                    {data.title}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded View Modal */}
      {selectedYear && activeData && (
        <div className="absolute inset-0 z-120 bg-bg overflow-y-auto flex flex-col animate-in slide-in-from-bottom-8 duration-500">
          {/* Header Bar */}
          <div className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
            <button
              onClick={() => setSelectedYear(null)}
              className="flex items-center gap-3 text-text-dim hover:text-accent transition-colors font-['Space_Grotesk',sans-serif] text-sm tracking-[2px] uppercase group"
            >
              <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <h2 className="font-['Samarkan',serif] text-3xl text-accent tracking-[2px]">
              {activeData.year}
            </h2>
            <div className="w-[80px]" /> {/* Spacer for centering */}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-12 w-full grow flex flex-col gap-16">
            {/* Aftermovie Section */}
            <div className="w-full flex flex-col items-center gap-6">
              <h3 className="font-['Space_Grotesk',sans-serif] text-sm tracking-[5px] uppercase text-text-dim">
                Aftermovie
              </h3>
              <div className="w-full aspect-video rounded-sm overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative bg-surface/50 flex items-center justify-center">
                {activeData.videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={activeData.videoUrl}
                    title={`Jagriti ${activeData.year} Aftermovie`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
                    <p className="font-['Samarkan',serif] text-4xl md:text-5xl text-white/30 tracking-[2px]">
                      Coming Soon
                    </p>
                    <div className="w-16 h-px bg-accent/30" />
                    <p className="font-['Space_Grotesk',sans-serif] text-xs tracking-[3px] uppercase text-white/20">
                      Stay Tuned
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Photo Grid Section */}
            <div className="w-full flex flex-col items-center gap-8">
              {/* Custom Masonry Grid with smooth fade transition */}
              <div
                className={`w-full transition-opacity duration-500 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
              >
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 w-full items-start"
                  style={{ gridAutoRows: "10px" }}
                >
                  {paginatedPhotos.map((photo, index) => (
                    <GalleryImage
                      key={`${photo}-${index}`}
                      photo={photo}
                      alt={`Moment ${index + 1}`}
                      onClick={handleImageClick}
                    />
                  ))}
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-accent">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="font-['Space_Grotesk',sans-serif] tracking-[2px] uppercase text-sm">
                    Fetching Photos...
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && paginatedPhotos.length === 0 && (
                <div className="py-20 text-center text-text-dim font-['Space_Grotesk',sans-serif] tracking-[2px] uppercase">
                  No photos available in this category.
                </div>
              )}

              {/* Infinite Scroll Sentinel */}
              {!isLoading && visibleCount < displayPhotos.length && (
                <div
                  ref={observerTarget}
                  className="w-full py-10 flex items-center justify-center"
                >
                  <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-200 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2 z-50"
          >
            <FiX className="text-4xl" />
          </button>

          {/* Loading Spinner */}
          {!isLightboxLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Blurred Placeholder */}
          <img
            src={getImageUrl(lightboxImg, "w400")}
            alt=""
            referrerPolicy="no-referrer"
            className={`absolute max-w-full max-h-[90vh] object-contain select-none blur-xl scale-105 transition-opacity duration-500 ${
              isLightboxLoaded ? "opacity-0" : "opacity-50"
            }`}
          />

          <img
            src={getImageUrl(lightboxImg, "w2500")} // Use high-res for lightbox
            alt="Expanded moment"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLightboxLoaded(true)}
            className={`relative max-w-full max-h-[90vh] object-contain select-none animate-in zoom-in-95 duration-500 transition-opacity ${
              isLightboxLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default GallerySection;
