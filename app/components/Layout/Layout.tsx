import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Track scrolling to apply stickiness with glassmorphic styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className={styles.layoutWrapper}>
      {/* HEADER SECTION (STICKY + GLASSMORPHISM) */}
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} glass-panel`}>
        <div className="container">
          <div className={styles.navContainer}>
            {/* BRAND LOGO */}
            <Link to="/" className={styles.logo}>
              <svg viewBox="0 0 240 50" className={styles.logoSvg}>
                {/* Boomerang Stylized Icon */}
                <path 
                  d="M15 10 C 25 22, 28 35, 12 42 C 32 38, 38 25, 25 5 Z" 
                  fill="var(--color-clay)" 
                />
                {/* Wave Surf Motif */}
                <path 
                  d="M5 38 Q 12 30, 20 38 T 35 38" 
                  fill="none" 
                  stroke="var(--color-sand)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                {/* Sun Circle */}
                <circle cx="32" cy="15" r="5" fill="var(--color-gold)" />
                {/* Text Logo */}
                <text 
                  x="50" 
                  y="28" 
                  fontFamily="var(--font-headings)" 
                  fontWeight="800" 
                  fontSize="21" 
                  fill="var(--color-teal)"
                >
                  THE AUSSIE HOUSE
                </text>
                <text 
                  x="50" 
                  y="42" 
                  fontFamily="var(--font-body)" 
                  fontWeight="600" 
                  fontSize="11" 
                  fill="var(--color-clay)" 
                  letterSpacing="3"
                >
                  MAHABALIPURAM
                </text>
              </svg>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className={styles.desktopNav}>
              <ul>
                <li>
                  <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={location.pathname === "/about" ? styles.active : ""}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={location.pathname === "/contact" ? styles.active : ""}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>

            {/* HEADER CTA BUTTON */}
            <div className={styles.headerCta}>
              <a href="#booking-section" className="btn btn-primary btn-sm">
                Book Stay
              </a>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.isOpen : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE PANEL */}
      <div className={`${styles.mobilePanel} ${isMobileMenuOpen ? styles.show : ""}`}>
        <nav className={styles.mobileNav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className={styles.mobilePanelCta}>
              <a href="#booking-section" className="btn btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* MAIN VIEW CONTENT */}
      <main className={styles.mainContent}>
        {children}
      </main>

      {/* FOOTER SECTION */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* COL 1: Resort Story */}
            <div className={styles.footerCol}>
              <div className={styles.footerLogo}>
                <svg viewBox="0 0 240 50" className={styles.logoSvg}>
                  <path d="M15 10 C 25 22, 28 35, 12 42 C 32 38, 38 25, 25 5 Z" fill="var(--color-clay)" />
                  <path d="M5 38 Q 12 30, 20 38 T 35 38" fill="none" stroke="var(--color-sand)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="32" cy="15" r="5" fill="var(--color-gold)" />
                  <text x="50" y="28" fontFamily="var(--font-headings)" fontWeight="800" fontSize="21" fill="var(--color-light)">THE AUSSIE HOUSE</text>
                  <text x="50" y="42" fontFamily="var(--font-body)" fontWeight="600" fontSize="11" fill="var(--color-sand)" letterSpacing="3">MAHABALIPURAM</text>
                </svg>
              </div>
              <p className={styles.footerDesc}>
                Experience a refined Australian-themed luxury beachside homestay in Mahabalipuram. 
                Enjoy pristine beach views, warm service, and local heritage sights in comfort.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  📸
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  🌐
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  🐦
                </a>
              </div>
            </div>

            {/* COL 2: Quick Links */}
            <div className={styles.footerCol}>
              <h3>Quick Links</h3>
              <ul className={styles.footerLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#booking-section">Book Room</a></li>
              </ul>
            </div>

            {/* COL 3: Address & Phone */}
            <div className={styles.footerCol}>
              <h3>Contact Details</h3>
              <p className={styles.footerContactInfo}>
                📍 <strong>Address:</strong><br />
                No 1, Mayana Salai,<br />
                Mahabalipuram, Tamil Nadu - 603104
              </p>
              <p className={styles.footerContactInfo}>
                📞 <strong>Direct Bookings:</strong><br />
                <a href="tel:+919042444567">+91 90424 44567</a><br />
                <a href="tel:+919884556777">+91 98845 56777</a>
              </p>
            </div>

            {/* COL 4: OTA Integrations */}
            <div className={styles.footerCol}>
              <h3>OTA Bookings</h3>
              <div className={styles.otaBadgeGrid}>
                <a 
                  href="https://www.booking.com/hotel/in/the-aussie-house.lv.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}>🏨</span>
                  Booking.com
                </a>
                <a 
                  href="https://www.airbnb.co.in/rooms/1692147470795717207" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}>🏡</span>
                  Airbnb
                </a>
                <a 
                  href="https://www.goibibo.com/hotels/hotel-details/?checkin=20260529&checkout=20260530&roomString=1-2-0&searchText=The%20Aussie%20House&locusId=CTXMB&locusType=city&cityCode=CTXMB&cc=IN&_uCurrency=INR&vcid=3838050502826668196&giHotelId=202605182044522572&mmtId=202605182044522572&sType=city#amenities" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}>✈️</span>
                  Goibibo
                </a>
                <a 
                  href="https://www.fvrentals.com/property/the-aussie-house/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}>🔑</span>
                  FVR Rentals
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} The Aussie House. All Rights Reserved. Designed with Coastal Luxury.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY FLOATING CTA BAR */}
      <div className={`${styles.mobileStickyCta} glass-panel`}>
        <div className={styles.stickyCtaContainer}>
          <div className={styles.stickyCtaText}>
            <span>Luxury Aussie Beach Stay</span>
            <strong>From ₹2,499 / Night</strong>
          </div>
          <a href="#booking-section" className="btn btn-primary btn-sm">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
