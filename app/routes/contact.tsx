import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import Layout from "../components/Layout/Layout";
import styles from "./contact.module.scss";
import * as Lucide from "lucide-react";
const { Phone, User, MapPin } = Lucide;

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | The Aussie House Mahabalipuram" },
    { name: "description", content: "Planning your coastal escape? Contact The Aussie House Mahabalipuram. Direct booking phone numbers, resort address (No 1, Mayana Salai), host details, and interactive inquiry form." },
  ];
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.message) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      {/* HERO BANNER */}
      <section className={styles.contactHero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>Planning your coastal escape? We'd love to help you book your perfect stay.</p>
        </div>
      </section>

      {/* CONTACT MAIN SECTION */}
      <section className={`section-padding ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* COLUMN 1: FORM CARD */}
            <div className={styles.formCard}>
              <h2>Send Us a Message</h2>
              <p>Have questions about rooms, customized travel guidance, or long-term remote stays? Drop us a line below:</p>
              
              {isSubmitted && (
                <div className={styles.successMessage}>
                  ✨ Thank you! Your message was sent successfully. We will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Room Inquiry"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details of your trip here, checkin dates, number of guests..."
                  ></textarea>
                </div>

                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* COLUMN 2: DIRECT PHONE & DETAIL CARDS */}
            <div className={styles.infoColumn}>
              
              {/* Direct Booking Card */}
              <div className={styles.infoCard}>
                <h3><Phone size={18} /> Book Your Stay Today</h3>
                <p>
                  Experience a peaceful coastal stay with comfortable rooms, friendly hospitality, and easy access 
                  to Mahabalipuram beach and tourist attractions. Call our direct helpline to check real-time availability:
                </p>
                <div className={styles.phoneList}>
                  <div className={styles.phoneItem}>
                    <Phone size={18} /> <a href="tel:+919042444567">+91 90424 44567</a>
                  </div>
                  <div className={styles.phoneItem}>
                    <Phone size={18} /> <a href="tel:+919884556777">+91 98845 56777</a>
                  </div>
                </div>
              </div>

              {/* Host/Founder Card */}
              <div className={`${styles.infoCard} ${styles.hostCard}`}>
                <h3><User size={18} /> Superb Local Host</h3>
                <p>
                  <strong>Robinson</strong><br />
                  Our properties are supervised directly by Robinson, bringing <strong>25+ Years of hospitality expertise</strong> to your stay. 
                  Reach out for tailored packages, customized local heritage sightseeing, or surfing coaching referrals.
                </p>
              </div>

              {/* Address Card */}
              <div className={styles.infoCard}>
                <h3><MapPin size={18} /> Resort Location</h3>
                <p>
                  <strong>The Aussie House Mahabalipuram</strong><br />
                  No 1, Mayana Salai,<br />
                  Mahabalipuram, Tamil Nadu - 603104
                </p>
                <p style={{ marginTop: "1rem", fontSize: "0.88rem", opacity: 0.9 }}>
                  Located just <strong>800 meters from Mahabalipuram Beach</strong>, we are positioned in a quiet neighborhood 
                  providing peaceful sleep while being minutes away from beachfront surfing hubs and Shore Temple monuments.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MAP DETAIL SECTION */}
      <section className={styles.contactMap}>
        <iframe 
          title="The Aussie House Location Map detail"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.790938634898!2d80.1656731!3d12.6225434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53e6b72a6b2c45%3A0xe54e3d32ef364d99!2sMayana%20Salai%2C%20Mahabalipuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </Layout>
  );
}
