import { useState, useEffect, useCallback, useMemo } from "react";
import type { MetaFunction } from "@remix-run/node";
import Layout from "../components/Layout/Layout";
import styles from "./gallery.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Gallery | The Aussie House Mahabalipuram" },
    {
      name: "description",
      content:
        "Browse the complete photo gallery of The Aussie House Mahabalipuram. " +
        "Premium Australian-themed beach homestay interiors, rooms, terrace views, and coastal scenery.",
    },
    {
      name: "keywords",
      content:
        "Aussie House gallery, Mahabalipuram resort photos, beach homestay rooms, " +
        "luxury villa gallery, beach view terrace, coastal stay images",
    },
  ];
};

const TOTAL_IMAGES = 57;
const ABOVE_FOLD_COUNT = 8; // First two rows

// Responsive modal source URL mapping structure
interface ResponsiveModalSrc {
  mobile: string;
  tablet: string;
  desktop: string;
}

const GALLERY_IMAGES = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const num = i + 1;
  return {
    id: num,
    // Responsive grid WebP thumbnails
    thumbMobile: `/assets/imgs/gallery/optimized/thumbs/mobile/house-${num}.jpg.webp`,
    thumbTablet: `/assets/imgs/gallery/optimized/thumbs/tablet/house-${num}.jpg.webp`,
    thumbDesktop: `/assets/imgs/gallery/optimized/thumbs/desktop/house-${num}.jpg.webp`,

    // Responsive full size modal WebP images
    modalMobile: `/assets/imgs/gallery/optimized/modal/mobile/house-${num}.jpg.webp`,
    modalTablet: `/assets/imgs/gallery/optimized/modal/tablet/house-${num}.jpg.webp`,
    modalDesktop: `/assets/imgs/gallery/optimized/modal/desktop/house-${num}.jpg.webp`,

    alt: `The Aussie House Mahabalipuram — Property view ${num}`,
  };
});

export default function Gallery() {
  // zoomedSrc holds the URL mapping object for active theater view modal
  const [zoomedSrc, setZoomedSrc] = useState<ResponsiveModalSrc | null>(null);

  // Video cinema modal state — loads original HD video
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const openModal = useCallback((src: ResponsiveModalSrc) => {
    setZoomedSrc(src);
  }, []);

  const closeModal = useCallback(() => {
    setZoomedSrc(null);
  }, []);

  // Modal navigation controls using relative fullSrc indexing
  const nextImage = useCallback(() => {
    if (!zoomedSrc) return;
    const idx = GALLERY_IMAGES.findIndex(
      (img) => img.modalDesktop === zoomedSrc.desktop,
    );
    const nextIdx = (idx + 1) % GALLERY_IMAGES.length;
    const nextImg = GALLERY_IMAGES[nextIdx];
    setZoomedSrc({
      mobile: nextImg.modalMobile,
      tablet: nextImg.modalTablet,
      desktop: nextImg.modalDesktop,
    });
  }, [zoomedSrc]);

  const prevImage = useCallback(() => {
    if (!zoomedSrc) return;
    const idx = GALLERY_IMAGES.findIndex(
      (img) => img.modalDesktop === zoomedSrc.desktop,
    );
    const prevIdx = (idx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    const prevImg = GALLERY_IMAGES[prevIdx];
    setZoomedSrc({
      mobile: prevImg.modalMobile,
      tablet: prevImg.modalTablet,
      desktop: prevImg.modalDesktop,
    });
  }, [zoomedSrc]);

  const currentCountText = useMemo(() => {
    if (!zoomedSrc) return "";
    const idx = GALLERY_IMAGES.findIndex(
      (img) => img.modalDesktop === zoomedSrc.desktop,
    );
    return `${idx + 1} / ${GALLERY_IMAGES.length}`;
  }, [zoomedSrc]);

  // Image modal keyboard listeners + scroll lock
  useEffect(() => {
    if (!zoomedSrc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedSrc, closeModal, nextImage, prevImage]);

  // Video cinema modal: ESC key + scroll lock
  useEffect(() => {
    if (!videoModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoModalOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoModalOpen]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.endsWith(".jpg.webp")) {
      img.src = img.src.replace(".jpg.webp", ".jpg");
    } else {
      img.src =
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf" +
        "?auto=format&fit=crop&w=600&q=60";
      img.alt = "Image temporarily unavailable";
    }
  };

  return (
    <Layout>
      {/* SECTION 1: HERO CONTAINER */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        >
          <source
            src="/assets/videos/gallery-hero-desktop.mp4"
            type="video/mp4"
            media="(min-width: 993px)"
          />
          <source
            src="/assets/videos/gallery-hero-tablet.mp4"
            type="video/mp4"
            media="(min-width: 577px) and (max-width: 992px)"
          />
          <source
            src="/assets/videos/gallery-hero-mobile.mp4"
            type="video/mp4"
            media="(max-width: 576px)"
          />
        </video>

        <div className={styles.heroOverlay} />

        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.badge}>🇦🇺 Visual Heritage Tour</span>
            <h1>Our Gallery</h1>
            <p>
              Explore the beautifully designed spaces, luxury beachside rooms,
              and warm coastal interiors of The Aussie House Mahabalipuram.
            </p>

            {/* Premium Watch CTA */}
            <button
              className={styles.watchCta}
              onClick={() => setVideoModalOpen(true)}
              aria-label="Watch the full Aussie House experience video"
            >
              <span className={styles.watchCtaIcon}>▶</span>
              <span className={styles.watchCtaText}>Watch Experience</span>
            </button>
          </div>
        </div>

        <div className={styles.waveContainer}>
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={styles.svgWave}
          >
            <path
              d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
              fill="#e05b26"
            />
            <path
              d="M0,45L120,41.7C240,38,480,31,720,35C960,39,1200,53,1320,60.3L1440,68L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
              fill="var(--color-sand-light)"
            />
          </svg>
        </div>
      </section>

      {/* CINEMATIC VIDEO PLAYER MODAL — loads original */}
      {videoModalOpen && (
        <div
          className={styles.videoModal}
          onClick={() => setVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full cinematic video experience"
        >
          <button
            className={styles.videoModalClose}
            onClick={() => setVideoModalOpen(false)}
            aria-label="Close video player"
          >
            ✕ Close
          </button>

          <div
            className={styles.videoModalFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className={styles.videoPlayer}
              src="/assets/videos/gallery-hero-original.mp4"
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      )}

      {/* SECTION 2: CURATED GALLERY GRID (1:1 aspect-ratio, lazy loading WebP) */}
      <section className={`section-padding ${styles.gridSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="center">The Aussie House Collection</h2>
            <p>
              A curated showcase of our premium beachside property. Click any
              image to view in immersive theater mode.
            </p>
          </div>

          <div className={styles.grid}>
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={img.id}
                className={styles.card}
                onClick={() =>
                  openModal({
                    mobile: img.modalMobile,
                    tablet: img.modalTablet,
                    desktop: img.modalDesktop,
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal({
                      mobile: img.modalMobile,
                      tablet: img.modalTablet,
                      desktop: img.modalDesktop,
                    });
                  }
                }}
                aria-label={`View image ${img.id} in full screen`}
              >
                <div className={styles.aspectBox}>
                  <img
                    src={img.thumbDesktop}
                    srcSet={`${img.thumbMobile} 360w, ${img.thumbTablet} 480w, ${img.thumbDesktop} 640w`}
                    sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
                    alt={img.alt}
                    loading={index < ABOVE_FOLD_COUNT ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < ABOVE_FOLD_COUNT ? "high" : "low"}
                    width={600}
                    height={600}
                    className={styles.image}
                    onError={handleImageError}
                  />

                  <div className={styles.hoverOverlay}>
                    <span>View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ZOOM LIGHTBOX */}
      {zoomedSrc && (
        <div
          className={styles.modal}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen image viewer"
        >
          <div className={styles.counterBadge}>{currentCountText}</div>

          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close image viewer"
          >
            ✕ Close
          </button>

          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className={styles.modalFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomedSrc.desktop}
              srcSet={`${zoomedSrc.mobile} 900w, ${zoomedSrc.tablet} 1200w, ${zoomedSrc.desktop} 1600w`}
              sizes="90vw"
              alt="The Aussie House — full view"
              className={styles.modalImage}
              decoding="async"
              onError={handleImageError}
            />
          </div>

          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </Layout>
  );
}
