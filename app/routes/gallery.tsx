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

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

/*
  Removed images:
  1,2,3,4,5,7,11,12,13,14,15,16,36,40,42,46
*/

const AVAILABLE_IMAGES = [
  8, 6, 9, 10, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 37, 38, 39, 41, 43, 44, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57,
];

const GALLERY_IMAGES: GalleryImage[] = AVAILABLE_IMAGES.map((imageNo) => ({
  id: imageNo,
  src: `/assets/imgs/gallery/originalImage/house-${imageNo}.webp`,
  alt: `The Aussie House Property View ${imageNo}`,
}));

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
      <section
        className={styles.hero}
        style={{
          backgroundImage:
            "url('/assets/imgs/gallery/originalImage/heroCoverImg.png')",
        }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.badge}>🇦🇺 Explore The Property</span>

          {/* <h1>Our Gallery</h1> */}

          <p>
            Discover every space, every view, and every detail before your stay.
          </p>

          <button
            className={styles.watchBtn}
            onClick={() => setVideoModalOpen(true)}
          >
            <span className={styles.watchIcon}>
              <span className={styles.playTriangle}>▶</span>
            </span>

            <span className={styles.watchText}>Watch Experience</span>
          </button>
        </div>

        <div className={styles.heroWave}>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="waveBrandGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(224, 91, 38, 0)" />
                <stop offset="15%" stopColor="var(--color-clay)" />
                <stop offset="50%" stopColor="rgba(255, 210, 170, 0.95)" />
                <stop offset="85%" stopColor="var(--color-clay)" />
                <stop offset="100%" stopColor="rgba(224, 91, 38, 0)" />
              </linearGradient>
            </defs>
            <path
              fill="#f7f5f1"
              d="
        M0,55
        C180,100 340,20 540,55
        C760,95 980,120 1200,55
        C1320,20 1400,35 1440,40
        L1440,120
        L0,120
        Z
      "
            />
            <path
              d="M0,55 C180,100 340,20 540,55 C760,95 980,120 1200,55 C1320,20 1400,35 1440,40"
              fill="none"
              stroke="url(#waveBrandGradient)"
              strokeWidth="2"
              className={styles.waveStrokePath}
            />
          </svg>
        </div>
      </section>

      {/* GALLERY EXPERIENCE */}
      <section className={styles.videoSection}>
        <div className={styles.videoContent}>
          <h2 className={styles.videoHeading}>
            Visual <span>Heritage</span> Tour
          </h2>

          <p>
            Take a cinematic walkthrough of The Aussie House Mahabalipuram and
            experience our premium beachside stay before exploring the complete
            gallery below.
          </p>

          <div className={styles.videoWrapper}>
            <video
              className={styles.galleryVideo}
              controls
              playsInline
              preload="metadata"
              poster="/assets/imgs/gallery/originalImage/videoCoverImg.png"
            >
              <source
                src="/assets/videos/originalVideos/gallery-hero.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className={styles.gridSection}>
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
        <div
          className={styles.modal}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.counterBadge}>{currentCount}</div>

          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <span className={styles.closeIcon}>✕</span>
            <span>Close</span>
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
              key={zoomedSrc}
              src={zoomedSrc}
              alt="Gallery Image"
              className={styles.modalImage}
              loading="eager"
              decoding="async"
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

      {/* VIDEO MODAL */}
      {videoModalOpen && (
        <div
          className={styles.modal}
          onClick={() => setVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeBtn}
            onClick={() => setVideoModalOpen(false)}
            aria-label="Close video"
          >
            <span className={styles.closeIcon}>✕</span>
            <span>Close</span>
          </button>

          <div
            className={styles.videoModalFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              preload="auto"
              className={styles.videoPlayer}
            >
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
