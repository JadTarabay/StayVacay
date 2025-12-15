import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Legal.css";
import LanguageSwitch from "../components/LanguageSwitch";

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Terms & Conditions</h1>
        <LanguageSwitch />
        <p className="legal-updated">Last updated: January 2025</p>

        <div className="legal-actions">
          <a className="legal-btn" href="/legal/terms-and-conditions.en.pdf" download>
            Download PDF (EN)
          </a>
          <Link className="legal-btn outline" to="/ar/terms-and-conditions">
            العربية
          </Link>
        </div>
      </div>

      <div className="legal-card">
        <p>
          By accessing or using StayVacay, you agree to be bound by these Terms & Conditions. If you
          do not agree, please do not use our services.
        </p>

        <h2>1. Platform Role</h2>
        <p>
          StayVacay is an online platform that facilitates property listings and booking inquiries.
          We do not own or operate listed properties unless explicitly stated.
        </p>

        <h2>2. User Responsibilities</h2>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Use the platform for lawful purposes only</li>
          <li>Not misuse, copy, or exploit website content</li>
        </ul>

        <h2>3. Bookings & Payments</h2>
        <ul>
          <li>All inquiries are subject to availability and confirmation</li>
          <li>Displayed pricing may change without notice</li>
          <li>Payment/cancellation/refund terms may be set by the property owner/manager</li>
        </ul>

        <h2>4. Liability Disclaimer</h2>
        <p>
          StayVacay is not responsible for property conditions, third-party service quality, or disputes
          between users and property owners/managers. Use of the platform is at your own risk.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All website content (logos, text, images, design) is the property of StayVacay and may not be
          used without written permission.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may suspend or terminate access at our discretion if these terms are violated.
        </p>

        <h2>7. Governing Law & Jurisdiction</h2>
        <p>
          These terms are governed by the laws of the United Arab Emirates. Disputes are subject to the
          exclusive jurisdiction of the courts of Dubai, UAE.
        </p>

        <h2>8. Contact</h2>
        <p>
          For questions regarding these Terms, contact:
          {" "}
          <a href="mailto:contact@stayvacay.ae">contact@stayvacay.ae</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
