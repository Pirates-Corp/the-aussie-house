import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import styles from "./Layout.module.scss";
import logoImg from "../../assets/imgs/Logo.png";
import * as Lucide from "lucide-react";
const { MapPin, Phone, Building2, Home, Plane, Key, Globe, Camera, Share2 } = Lucide;

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
              <img src={logoImg} alt="The Aussie House logo" className={styles.logoImg} /> The Aussie House
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
                <li>
                  <Link to="/gallery" className={location.pathname === "/gallery" ? styles.active : ""}>
                    Gallery
                  </Link>
                </li>
              </ul>
            </nav>

            {/* HEADER CTA BUTTON */}
            <div className={styles.headerCta}>
              <a
                href="https://www.makemytrip.com/hotels/hotel-details/?hotelId=202605182044522572&checkin=date_1&checkout=date_2&country=IN&city=CTXMB&roomStayQualifier=2e0e&openDetail=true&currency=ENG&region=IN&checkAvailability=true&locusId=CTXMB&locusType=city&homestay=true&zcp=33d9c7d80da8"
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noreferrer"
              >
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
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className={styles.mobilePanelCta}>
              <a
                href="https://www.makemytrip.com/hotels/hotel-details/?hotelId=202605182044522572&checkin=date_1&checkout=date_2&country=IN&city=CTXMB&roomStayQualifier=2e0e&openDetail=true&currency=ENG&region=IN&checkAvailability=true&locusId=CTXMB&locusType=city&homestay=true&zcp=33d9c7d80da8"
                className="btn btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
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
                <img src={logoImg} alt="The Aussie House logo" className={styles.FTlogoImg} />
              </div>
              <p className={styles.footerDesc}>
                Experience a refined Australian-themed luxury beachside homestay in Mahabalipuram. 
                Enjoy pristine beach views, warm service, and local heritage sights in comfort.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Camera size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Globe size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <Share2 size={20} />
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
                <li><Link to="/gallery">Gallery</Link></li>
                <li><a href="#booking-section">Book Room</a></li>
              </ul>
            </div>

            {/* COL 3: Address & Phone */}
            <div className={styles.footerCol}>
              <h3>Contact Details</h3>
              <p className={styles.footerContactInfo}>
                <MapPin size={16} /> <strong>Address:</strong><br />
                No 1, Mayana Salai,<br />
                Mahabalipuram, Tamil Nadu - 603104
              </p>
              <p className={styles.footerContactInfo}>
                <Phone size={16} /> <strong>Direct Bookings:</strong><br />
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
                  <span className={styles.otaIcon}><Building2 size={20} /></span>
                  Booking.com
                </a>
                <a 
                  href="https://www.airbnb.co.in/rooms/1692147470795717207" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}><Home size={20} /></span>
                  Airbnb
                </a>
                <a 
                  href="https://www.goibibo.com/hotels/hotel-details/?checkin=20260529&checkout=20260530&roomString=1-2-0&searchText=The%20Aussie%20House&locusId=CTXMB&locusType=city&cityCode=CTXMB&cc=IN&_uCurrency=INR&vcid=3838050502826668196&giHotelId=202605182044522572&mmtId=202605182044522572&sType=city#amenities" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}><Plane size={20} /></span>
                  Goibibo
                </a>
                <a 
                  href="https://www.fvrentals.com/property/the-aussie-house/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.otaBadge}
                >
                  <span className={styles.otaIcon}><Key size={20} /></span>
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
            <strong>
              <a href="tel:+919042444567" className={styles.ctaPhone}>
                Contact +91 90424 44567
              </a>
            </strong>
          </div>
          <a
            href="tel:+919042444567"
            className="btn btn-primary btn-sm"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
