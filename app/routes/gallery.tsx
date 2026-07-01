import { useState, useCallback, useMemo, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import Layout from "../components/Layout/Layout";
import styles from "./gallery.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Gallery | The Aussie House Mahabalipuram" },
    {
      name: "description",
      content:
        "Browse the complete photo gallery of The Aussie House Mahabalipuram.",
    },
  ];
};

const TOTAL_IMAGES = 57;

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => ({
    id: i + 1,
    src: `/assets/imgs/gallery/originalImage/house-${i + 1}.webp`,
    alt: `The Aussie House Property View ${i + 1}`,
  }),
);

export default function Gallery() {
  const [zoomedSrc, setZoomedSrc] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const openModal = useCallback((src: string) => {
    setZoomedSrc(src);
  }, []);

  const closeModal = useCallback(() => {
    setZoomedSrc(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!zoomedSrc) return;

    const idx = GALLERY_IMAGES.findIndex((img) => img.src === zoomedSrc);

    const next = GALLERY_IMAGES[(idx + 1) % GALLERY_IMAGES.length];

    setZoomedSrc(next.src);
  }, [zoomedSrc]);

  const prevImage = useCallback(() => {
    if (!zoomedSrc) return;

    const idx = GALLERY_IMAGES.findIndex((img) => img.src === zoomedSrc);

    const prev =
      GALLERY_IMAGES[(idx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length];

    setZoomedSrc(prev.src);
  }, [zoomedSrc]);

  const currentCount = useMemo(() => {
    if (!zoomedSrc) return "";

    const idx = GALLERY_IMAGES.findIndex((img) => img.src === zoomedSrc);

    return `${idx + 1} / ${GALLERY_IMAGES.length}`;
  }, [zoomedSrc]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedSrc(null);
        setVideoModalOpen(false);
      }

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [nextImage, prevImage]);

  return (
    <Layout>
      {/* HERO */}

      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/imgs/gallery/originalImage/house-1.webp"
        >
          <source
            src="/assets/videos/originalVideos/gallery-heroTeaser.mp4"
            type="video/mp4"
          />
        </video>

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Our Gallery</h1>

          <p>Explore The Aussie House</p>

          <button
            className={styles.watchBtn}
            onClick={() => setVideoModalOpen(true)}
          >
            ▶ Watch Experience
          </button>
        </div>
      </section>

      {/* GRID */}

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.id}
              className={styles.card}
              onClick={() => openModal(img.src)}
            >
              <div className={styles.aspectBox}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={img.id <= 8 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={img.id <= 8 ? "high" : "auto"}
                  width={600}
                  height={600}
                  className={styles.image}
                />
              </div>

              <div className={styles.hoverOverlay}>View</div>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE MODAL */}

      {zoomedSrc && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.counter}>{currentCount}</div>

          <button className={styles.close} onClick={closeModal}>
            ✕
          </button>

          <button
            className={styles.prev}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <div
            className={styles.modalFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomedSrc}
              className={styles.modalImage}
              alt="Gallery Image"
              loading="eager"
              decoding="async"
            />
          </div>

          <button
            className={styles.next}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* VIDEO MODAL */}

      {videoModalOpen && (
        <div
          className={styles.videoModal}
          onClick={() => setVideoModalOpen(false)}
        >
          <button
            className={styles.close}
            onClick={() => setVideoModalOpen(false)}
          >
            ✕ Close
          </button>

          <div
            className={styles.videoFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <video controls autoPlay preload="auto" className={styles.video}>
              <source
                src="/assets/videos/originalVideos/gallery-hero.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}
    </Layout>
  );
}
