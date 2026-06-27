import React, { useState, useEffect, useCallback, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Layout from "../components/Layout/Layout";
import styles from "./_index.module.scss";
import seafoodImg from "../assets/imgs/seafood.jpg";
import shoreTemple from "../assets/imgs/shore-temple.jpeg";

import * as Lucide from "lucide-react";
const {
  MapPin,
  Sun,
  Bed,
  Wifi,
  Handshake,
  Users,
  Snowflake,
  Droplet,
  SquareParking,
  BrushCleaning,
  Building2,
  Home,
  Plane,
  Key,
  Star,
  Compass,
} = Lucide;

// Carousel images from the property gallery
const CAROUSEL_IMAGES = [
   22, 19, 25, 30, 35, 40, 45, 50, 55,
].map((num) => ({
  id: num,
  src: `/assets/imgs/gallery/websiteImagesAussie/house-${num}.jpg.webp`,
  alt: `The Aussie House Mahabalipuram — Property view ${num}`,
}));

export const meta: MetaFunction = () => {
  return [
    { title: "The Aussie House Mahabalipuram | Premium Beachside Homestay" },
    {
      name: "description",
      content:
        "Experience premium Australian-themed beach homestay in Mahabalipuram. Cozy rooms, sea-view terrace, high-speed WiFi, and warm hospitality just 800m from the beach.",
    },
    {
      name: "keywords",
      content:
        "Australian themed resort in Mahabalipuram, beach resort in Mahabalipuram, luxury stay near beach, affordable luxury resort, family-friendly resort, staycation in Mahabalipuram, beach view resort",
    },
  ];
};

export default function Index() {
  // ── Carousel state ──
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const totalSlides = CAROUSEL_IMAGES.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch / swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
      touchStartX.current = null;
    },
    [nextSlide, prevSlide],
  );

  return (
    <Layout>
      {/* 1. HERO SECTION WITH SEAMLESS BRANDING */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span>🇦🇺 Warm Australian Coastal Living</span>
            <h1>The Aussie House Mahabalipuram</h1>

            <div className="hero-cta-buttons">
              <a href="#booking-section" className="btn btn-primary">
                Book Your Beach Stay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US / RESORT HIGHLIGHTS */}
      <section className="section-padding" id="about-highlight">
        <div className="container">
          <div className={styles.highlightsHeader}>
            <h2 className="center">Why Choose The Aussie House</h2>
            <p>
              Experience the perfect balance of accessibility, tranquil beach
              living, and authentic Indian ocean charm tailored for
              international and domestic travelers.
            </p>
          </div>

          <div className="grid-3">
            {/* Highlight 1: Location */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <MapPin size={28} />
              </div>
              <h3>Beachside Location</h3>
              <p>
                Just 800 meters from Mahabalipuram Beach with quick access to
                pristine shores and stunning coastal breezes.
              </p>
            </div>

            {/* Highlight 2: Terrace */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <Sun size={28} />
              </div>
              <h3>Beach-View Terrace</h3>
              <p>
                Spacious open-air terrace perfect for glorious sunrise views and
                peaceful evening sea breeze relaxation.
              </p>
            </div>

            {/* Highlight 3: Rooms */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <Bed size={28} />
              </div>
              <h3>Luxury Rooms</h3>
              <p>
                Thoughtfully styled Australian-themed interiors featuring cozy
                bedding, modern accents, and premium decor.
              </p>
            </div>

            {/* Highlight 4: WiFi */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <Wifi size={28} />
              </div>
              <h3>High-Speed WiFi</h3>
              <p>
                Complimentary, high-speed fiber internet throughout the property
                ideal for leisure, streaming, or remote work.
              </p>
            </div>

            {/* Highlight 5: Hospitality */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <Handshake size={28} />
              </div>
              <h3>Premium Hospitality</h3>
              <p>
                Hosted by seasoned specialists with 25+ years of personal guest
                service expertise ensuring complete comfort.
              </p>
            </div>

            {/* Highlight 6: Audience */}
            <div className={`${styles.highlightCard} hover-lift`}>
              <div className={styles.highlightIcon}>
                <Users size={28} />
              </div>
              <h3>Perfect For All</h3>
              <p>
                An ideal coastal destination for couples, families, digital
                nomads, solo wanderers, and heritage seekers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOMMODATION DETAIL BLOCK */}
      <section className={`section-padding ${styles.accomSection}`}>
        <div className="container">
          <div className="grid-2">
            <div
              className={`${styles.accomImageWrapper} ${styles.surfingRibbon}`}
            >
              <img
                src="/assets/imgs/gallery/websiteImagesAussie/house-19.jpg.webp"
                alt="Luxury Rooms at The Aussie House Resort Mahabalipuram"
              />
            </div>
            <div className={styles.accomContent}>
              <span>✨ Refined Comfort & Value</span>
              <h2>Luxury & Affordable Accommodations</h2>
              <p>
                Whether you're seeking a romantic weekend getaway, a family
                vacation, or a peaceful solo retreat, our property offers the
                ultimate sanctuary. Our unique Australian-style interiors and
                relaxed coastal living atmosphere make every stay comfortable,
                memorable, and affordable.
              </p>
              <p>
                If you are searching for an affordable stay in Mahabalipuram or
                a peaceful beach homestay in Mahabalipuram, The Aussie House
                delivers the exact balance of premium comfort, prime location,
                and hospitality that feels like home.
              </p>
              <ul className={styles.featuresList}>
                <li>Aussie Coastal Vibe</li>
                <li>Pristine Interiors</li>
                <li>Cozy Beach House Decor</li>
                <li>Soundproof Rooms</li>
              </ul>
              <a href="#booking-section" className="btn btn-primary">
                View Availability
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESORT AMENITIES SECTION */}
      <section className={`section-padding ${styles.amenitiesSection}`}>
        <div className="container">
          <div className={styles.highlightsHeader}>
            <h2 className="center">Resort Amenities</h2>
            <p>
              Everything you need for a comfortable beachside holiday,
              workation, or family gathering.
            </p>
          </div>

          <div className="grid-4">
            <div className={`${styles.amenityCard} hover-lift`}>
              <div className={styles.amenityIcon}>
                <Snowflake size={32} />
              </div>
              <h4>Air Conditioning</h4>
              <p>
                Fully air-conditioned luxury rooms to stay cool after a hot day
                on the beach.
              </p>
            </div>

            <div className={`${styles.amenityCard} hover-lift`}>
              <div className={styles.amenityIcon}>
                <Droplet size={32} />
              </div>
              <h4>Hot Water</h4>
              <p>
                Modern private bathrooms with round-the-clock hot water access.
              </p>
            </div>

            <div className={`${styles.amenityCard} hover-lift`}>
              <div className={styles.amenityIcon}>
                <SquareParking size={32} />
              </div>
              <h4>Free SquareParking</h4>
              <p>
                Secure, complimentary on-site SquareParking for all our staying
                guests.
              </p>
            </div>

            <div className={`${styles.amenityCard} hover-lift`}>
              <div className={styles.amenityIcon}>
                <BrushCleaning size={32} />
              </div>
              <h4>Housekeeping</h4>
              <p>
                Daily cleaning and room service maintaining the highest hygienic
                standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OTA BOOKING INTEGRATIONS SECTION */}
      <section
        className={`section-padding ${styles.bookingSection}`}
        id="booking-section"
      >
        <div className="container">
          <div className={styles.highlightsHeader}>
            <h2 className="center">Book Your Coastal Getaway</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              We partner with the world's leading booking platforms to make your
              reservation secure, simple, and transparent. Click below to book
              directly on your platform of choice:
            </p>
          </div>

          <div className={styles.bookingGrid}>
            {/* Booking.com */}
            <div className={styles.otaCard + " " + styles.bookingDotCom}>
              <div className={styles.otaLogoIcon}>
                <Building2 size={32} />
              </div>
              <h3>Booking.com</h3>
              <p>
                Highly rated beachside homestay. Guaranteed best rates and
                instant confirmation.
              </p>
              <a
                href="https://www.booking.com/hotel/in/the-aussie-house.lv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                Book on Booking
              </a>
            </div>

            {/* Airbnb */}
            <div className={styles.otaCard + " " + styles.airbnb}>
              <div className={styles.otaLogoIcon}>
                <Home size={32} />
              </div>
              <h3>Airbnb</h3>
              <p>
                Superb host experience. Book cozy Australian-themed private
                rooms with home-like comfort.
              </p>
              <a
                href="https://www.airbnb.co.in/rooms/1692147470795717207?guests=1&adults=1&s=67&unique_share_id=0f2b296d-8149-4d21-8e7e-586ad63203cf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                Book on Airbnb
              </a>
            </div>

            {/* Goibibo */}
            <div className={styles.otaCard + " " + styles.goibibo}>
              <div className={styles.otaLogoIcon}>
                <Plane size={32} />
              </div>
              <h3>Goibibo</h3>
              <p>
                Great deals, local wallets, and trusted Indian hotel reviews.
                Plan your family trip easily.
              </p>
              <a
                href="https://www.goibibo.com/hotels/hotel-details/?checkin=20260529&checkout=20260530&roomString=1-2-0&searchText=The%20Aussie%20House&locusId=CTXMB&locusType=city&cityCode=CTXMB&cc=IN&_uCurrency=INR&vcid=3838050502826668196&giHotelId=202605182044522572&mmtId=202605182044522572&sType=city#amenities"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                Book on Goibibo
              </a>
            </div>

            {/* FVR Rentals */}
            <div className={styles.otaCard + " " + styles.fvrRentals}>
              <div className={styles.otaLogoIcon}>
                <Key size={32} />
              </div>
              <h3>FVR Rentals</h3>
              <p>
                Premium rental management integration. Ideal for extended stays
                and remote work packages.
              </p>
              <a
                href="https://www.fvrentals.com/property/the-aussie-house/BC-16431438"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                Book on FVR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER PROFILE & PERSONAL HOSPITALITY */}
      <section className={`section-padding ${styles.founderSection}`}>
        <div className="container">
          <div className={styles.founderCard}>
            <div className={styles.founderImageContainer}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                alt="Robinson - Founder of The Aussie House Resort Mahabalipuram"
              />
            </div>
            <div className={styles.founderInfo}>
              <span className={styles.founderBadge}>
                <Star size={14} /> PERSONALIZED GUEST SERVICE
              </span>
              <h3>Meet Your Host, Robinson</h3>
              <div className={styles.founderTitle}>
                Founder & Hospitality Professional (25+ Years of Service)
              </div>
              <p>
                We represent a unique fusion of Australian hospitality warmth
                and coastal Indian charm. Inspired by the relaxed lifestyle of
                Australia's beachside culture, we've created a sanctuary where
                comfort meets elegance. I personally supervise every aspect of
                your stay to ensure a home-like environment where you feel
                entirely safe and pampered.
              </p>
              <p>
                My deep knowledge of Mahabalipuram's UNESCO sites, local seafood
                dining, surfing hubs, and hidden beaches guarantees you get an
                authentic local experience, not just a hotel stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEARBY ATTRACTIONS (SEO STRATEGY) */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.highlightsHeader}>
            <h2 className="center">Explore Mahabalipuram</h2>
            <p>
              Mahabalipuram is one of Tamil Nadu's most cherished coastal
              heritage hubs. Staying with us grants you immediate access to
              famous sights and adventure spots:
            </p>
          </div>

          <div className="grid-3">
            {/* Attraction 1: Shore Temple */}
            <div className={styles.attractionCard}>
              <img
                src={shoreTemple}
                alt="UNESCO Shore Temple near Aussie House Mahabalipuram"
              />
              <div className={styles.attractionOverlay}>
                <h4>UNESCO Shore Temple</h4>
                <p>
                  Stunning 8th-century stone temple standing tall on the
                  coastline. Perfect for morning cultural walks.
                </p>
              </div>
            </div>

            {/* Attraction 2: Surfing Spot */}
            <div className={styles.attractionCard}>
              <img
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80"
                alt="Surfing points near Aussie House homestay"
              />
              <div className={styles.attractionOverlay}>
                <h4>Surfing & Coastal Café Hubs</h4>
                <p>
                  Famous surfing breaks suitable for beginners and
                  professionals, surrounded by vibrant beachfront cafes.
                </p>
              </div>
            </div>

            {/* Attraction 3: Seafood */}
            <div className={styles.attractionCard}>
              <img
                src={seafoodImg}
                alt="Beachfront seafood restaurants in Mahabalipuram"
              />
              <div className={styles.attractionOverlay}>
                <h4>Local Seafood Delicacies</h4>
                <p>
                  Taste fresh, locally caught catch prepared with authentic
                  coastal Indian recipes and spices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PHOTO GALLERY CAROUSEL */}
      <section className={`section-padding ${styles.carouselSection}`}>
        <div className="container">
          <div className={styles.highlightsHeader}>
            <h2 className="center">Our Resort Gallery</h2>
            <p>
              A visual journey through the cozy, high-quality spaces waiting for
              you.
            </p>
          </div>

          {/* Carousel */}
          <div
            className={styles.carouselWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev / Next buttons */}
            <button
              className={`${styles.carouselBtn} ${styles.carouselPrev}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={`${styles.carouselBtn} ${styles.carouselNext}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              ›
            </button>

            {/* Slide track */}
            <div className={styles.carouselTrack}>
              {CAROUSEL_IMAGES.map((img, idx) => (
                <div
                  key={img.id}
                  className={`${styles.carouselSlide} ${
                    idx === currentSlide ? styles.slideActive : ""
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={idx < 3 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Counter badge */}
            <div className={styles.carouselCounter}>
              {currentSlide + 1} / {totalSlides}
            </div>
          </div>

          {/* Dot indicators */}
          <div className={styles.carouselDots}>
            {CAROUSEL_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                className={`${styles.dot} ${
                  idx === currentSlide ? styles.dotActive : ""
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Gallery CTA */}
          <div className={styles.galleryCta}>
            <Link to="/gallery" className="btn btn-primary">
              <Compass size={18} />
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LOCATION MAP BLOCK */}
      <section className={`section-padding ${styles.mapSection}`}>
        <div className="container">
          <div className={styles.mapCard}>
            <div className="grid-2" style={{ gap: 0 }}>
              <div className={styles.mapContent}>
                <span>
                  <MapPin size={16} /> Perfect Location
                </span>
                <h2>Find Us in Mahabalipuram</h2>
                <p>
                  <strong>The Aussie House Mahabalipuram</strong>
                  <br />
                  No 1, Mayana Salai,
                  <br />
                  Mahabalipuram, Tamil Nadu - 603104
                </p>
                <p>
                  Our resort sits perfectly nestled in a tranquil beachside
                  neighborhood, allowing you to sleep peacefully while keeping
                  you just 800m away from the sandy shores and within minutes of
                  all major UNESCO monuments and surfing points.
                </p>
                <a
                  href="https://maps.google.com/?q=The+Aussie+House+Mahabalipuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Get Directions
                </a>
              </div>
              <div
                style={{
                  height: "100%",
                  minHeight: "350px",
                  background: "#e5e3df",
                }}
              >
                <iframe
                  title="The Aussie House Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.790938634898!2d80.1656731!3d12.6225434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53e6b72a6b2c45%3A0xe54e3d32ef364d99!2sMayana%20Salai%2C%20Mahabalipuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className={styles.mapEmbedContainer}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
