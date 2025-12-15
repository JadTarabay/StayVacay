import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Legal.css";
import LanguageSwitch from "../components/LanguageSwitch";


const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Privacy Policy</h1>
        <LanguageSwitch />
        <p className="legal-updated">Last updated: December 2025</p>

        <div className="legal-actions">
          <a className="legal-btn" href="/legal/privacy-policy.en.pdf" download>
            Download PDF (EN)
          </a>
          <Link className="legal-btn outline" to="/ar/privacy-policy">
            العربية
          </Link>
        </div>
      </div>

      <div className="legal-card">
        <p>
          StayVacay (“we”, “our”, or “us”) respects your privacy and is committed to protecting
          your personal data in accordance with the United Arab Emirates Federal Decree-Law
          No. 45 of 2021 on the Protection of Personal Data (PDPL).
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Property inquiry and booking details</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <p>We do not knowingly collect data from individuals under the age of 18.</p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Respond to inquiries and booking requests</li>
          <li>Communicate with you via email or WhatsApp</li>
          <li>Improve our website and services</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell your personal data.</p>
        <p>Your information may be shared only with:</p>
        <ul>
          <li>Property owners or managers (for booking purposes)</li>
          <li>Service providers (hosting, analytics, communication tools)</li>
          <li>Legal authorities when required by UAE law</li>
        </ul>

        <h2>4. Data Storage & Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect your data against
          unauthorized access, loss, or misuse. Data is retained only as long as necessary for its
          intended purpose or as required by law.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use cookies to improve website performance, understand user behavior, and enhance
          user experience. You may control or disable cookies through your browser settings.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          Under UAE data protection laws, you may request access, correction, deletion of your data,
          or withdraw consent where applicable.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>

        <h2>8. Contact Us</h2>
        <p>
          For questions or requests related to privacy, contact:
          {" "}
          <a href="mailto:contact@stayvacay.ae">contact@stayvacay.ae</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
