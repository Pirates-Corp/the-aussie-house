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

// IMAGE DATA CONFIGURATION
const TOTAL_IMAGES = 57;

const GALLERY_IMAGES = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const num = i + 1;
  return {
    id: num,
    src: `/assets/imgs/gallery/websiteImagesAussie/house-${num}.jpg.webp`,
    alt: `The Aussie House Mahabalipuram — Property view ${num}`,
  };
});

export default function Gallery() {
  const [zoomedSrc, setZoomedSrc] = useState<string | null>(null);

  const openModal = useCallback((src: string) => {
    setZoomedSrc(src);
  }, []);

  const closeModal = useCallback(() => {
    setZoomedSrc(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!zoomedSrc) return;
    const currentIndex = GALLERY_IMAGES.findIndex(
      (img) => img.src === zoomedSrc,
    );
    const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    setZoomedSrc(GALLERY_IMAGES[nextIndex].src);
  }, [zoomedSrc]);

  const prevImage = useCallback(() => {
    if (!zoomedSrc) return;
    const currentIndex = GALLERY_IMAGES.findIndex(
      (img) => img.src === zoomedSrc,
    );
    const prevIndex =
      (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setZoomedSrc(GALLERY_IMAGES[prevIndex].src);
  }, [zoomedSrc]);

  // DYNAMIC COUNTER LOGIC
  const currentCountText = useMemo(() => {
    if (!zoomedSrc) return "";
    const currentIndex = GALLERY_IMAGES.findIndex(
      (img) => img.src === zoomedSrc,
    );
    return `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
  }, [zoomedSrc]);

  //  KEYBOARD NAVIGATION EFFECT
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const currentSrc = img.src;

    if (currentSrc.endsWith(".jpg.webp")) {
      img.src = currentSrc.replace(".jpg.webp", ".jpg");
    } else {
      img.src =
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf" +
        "?auto=format&fit=crop&w=600&q=60";
      img.alt = "Image temporarily unavailable";
    }
  };

  return (
    <Layout>
      {/* HERO  */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="/assets/videos/gallery-hero.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroOverlay} />

        <div className="container">
          <div className={styles.heroContent}>
            <span>🇦🇺 Visual Heritage Tour</span>
            <h1>Our Gallery</h1>
            <p>
              Explore the beautifully designed spaces, luxury beachside rooms,
              and warm coastal interiors of The Aussie House Mahabalipuram.
            </p>
          </div>
        </div>
      </section>

      {/* SQUARE GRID */}
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
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                className={styles.card}
                onClick={() => openModal(img.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(img.src);
                  }
                }}
                aria-label={`View image ${img.id} in full screen`}
              >
                <div className={styles.aspectBox}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
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

      {/* SINGLE IMAGE ZOOM MODAL WITH  NAVIGATION & COUNTER */}
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
              src={zoomedSrc}
              alt="The Aussie House — full view"
              className={styles.modalImage}
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
