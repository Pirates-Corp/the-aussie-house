import React from "react";
import type { MetaFunction } from "@remix-run/node";
import Layout from "../components/Layout/Layout";
import styles from "./about.module.scss";
import * as Lucide from "lucide-react";
const { Heart, Users, Compass } = Lucide;

export const meta: MetaFunction = () => {
  return [
    { title: "About Us | The Aussie House Mahabalipuram" },
    { name: "description", content: "Discover the story of The Aussie House Mahabalipuram. Learn about Robinson's 25+ years of hospitality expertise and our unique fusion of Australian beach lifestyle & local Indian heritage." },
  ];
};

export default function About() {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className={styles.aboutHero}>
        <div className="container">
          <h1>About The Aussie House</h1>
          <p>Where relaxed Australian beach lifestyle meets authentic coastal Indian hospitality.</p>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className={`section-padding ${styles.storySection}`}>
        <div className="container">
          <div className="grid-2">
            <div className={styles.storyContent}>
              <span>🇦🇺 Fusion Hospitality</span>
              <h2>Our Story</h2>
              <p className={styles.leadParagraph}>
                The Aussie House Mahabalipuram represents a unique fusion of Australian hospitality warmth and coastal Indian charm.
              </p>
              <p>
                Inspired by the relaxed lifestyle of Australia's iconic beachside culture, we've created a sanctuary where comfort 
                meets elegance. Nestled in the heart of Mahabalipuram, a world-famous UNESCO heritage destination known for its 
                rock-cut temples and golden beaches, our property serves as the perfect base for your coastal holiday.
              </p>
              <p>
                We provide a peaceful stay away from crowded hotel environments, giving travelers an authentic, personalized 
                experience. From heritage sightseeing tours to active beachside relaxation and surfing, we welcome you to unwinding 
                in premium yet affordable style.
              </p>
            </div>
            <div className={styles.storyImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80" 
                alt="Cozy Beach House Exterior Aussie House" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER FEATURE */}
      <section className={`section-padding ${styles.founderDetailSection}`}>
        <div className="container">
          <div className={styles.founderDetailCard}>
            <div className={styles.founderGrid}>
              <div className={styles.founderImageCol}>
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=550&q=80" 
                  alt="Robinson Host of Aussie House" 
                  className={styles.founderDetailImg}
                />
                <h3 className={styles.founderName}>Robinson</h3>
                <span className={styles.founderRole}>Founder & Senior Host</span>
              </div>
              
              <div className={styles.founderBio}>
                <span>👨‍💼 25+ Years of Dedicated Service</span>
                <h3>Behind the Hospitality</h3>
                <p>
                  Hosted by Robinson, a dedicated hospitality professional with more than 25 years of guest service experience, 
                  The Aussie House is globally known for personalized care, friendly local guidance, and a home-like environment 
                  where guests feel completely safe and comfortable.
                </p>
                <p>
                  Robinson personally oversees every single aspect of your stay. From checking the hygiene of your bedding to 
                  guiding you through the town's historical monuments, Robinson's passion is to create memorable experiences and 
                  lasting connections with every guest who walks through our doors.
                </p>
                <p>
                  "For me, hospitality is not a business; it's about sharing the beautiful tranquility of our coastline, sharing stories, 
                  and ensuring that every traveler experiences Mahabalipuram as a beloved guest, rather than just a tourist."
                </p>
                <div className={styles.signature}>
                  Robinson
                  <span>Founder, The Aussie House Resort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERFECT FOR EVERY OCCASION (6 CARD GRID) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="container">
          <div className={styles.occasionsHeader}>
            <h2 className="center">Perfect For Every Occasion</h2>
            <p>
              Whether you are here to explore ancient monuments, catch ocean waves, or work in peace, 
              we tailor our homestay experience to your custom lifestyle needs.
            </p>
          </div>

          <div className={styles.occasionsGrid}>
            {/* 1. Romantic Getaway */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" alt="Romantic Getaway Aussie House" />
                <div className={styles.occasionIconBg}><Heart size={24} /></div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Romantic Getaways</h3>
                <p>Celebrate your love with private beach moments, sunset views from our terrace, and intimate dining experiences near scenic coastlines.</p>
              </div>
            </div>

            {/* 2. Family Vacation */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80" alt="Family Vacation Aussie House" />
                <div className={styles.occasionIconBg}><Users size={24} /></div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Family Vacations</h3>
                <p>Create lasting memories with spacious accommodations, safe family-friendly beaches, and easy access to local historical monuments.</p>
              </div>
            </div>

            {/* 3. Solo Traveler */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=80" alt="Solo Traveler Aussie House" />
                <div className={styles.occasionIconBg}><Compass size={24} /></div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Solo Travelers</h3>
                <p>Enjoy peaceful solitude with safe, welcoming rooms, personalized host tips, and a warm community perfect for relaxation.</p>
              </div>
            </div>

            {/* 4. Digital Nomad */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80" alt="Digital Nomad Aussie House" />
                <div className={styles.occasionIconBg}>💻</div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Digital Nomads</h3>
                <p>Work-friendly rooms equipped with high-speed fiber WiFi, comfortable desk spaces, and inspiring beach settings for remote work.</p>
              </div>
            </div>

            {/* 5. Heritage Seeker */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" alt="Heritage Seeker Aussie House" />
                <div className={styles.occasionIconBg}>🏛️</div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Heritage Seekers</h3>
                <p>Explore UNESCO temples, rock architecture, and local cultural landmarks with expert guidance and tips from our founder.</p>
              </div>
            </div>

            {/* 6. Beach Holiday */}
            <div className={styles.occasionCard}>
              <div className={styles.occasionImage}>
                <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=500&q=80" alt="Beach Holiday Aussie House" />
                <div className={styles.occasionIconBg}>🏄‍♂️</div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Beach Holidays</h3>
                <p>Immerse yourself in coastal bliss with quick proximity to surfing cafes, active water sports, seaside strolls, and sunsets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK STAY CTA SECTION */}
      <section className={`section-padding ${styles.aboutCta}`}>
        <div className="container">
          <h2>Reserve Your Room Today</h2>
          <p>
            Experience a peaceful beach stay with comfortable rooms, friendly Aussie-themed hospitality, 
            and easy access to the Mahabalipuram shores.
          </p>
          <a href="/#booking-section" className="btn btn-outline-white">
            View Booking Channels
          </a>
        </div>
      </section>
    </Layout>
  );
}