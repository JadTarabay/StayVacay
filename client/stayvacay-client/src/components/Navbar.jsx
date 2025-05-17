import React from "react";
import {  HashLink} from 'react-router-hash-link';
import { FaWhatsapp } from "react-icons/fa";
import Logo from '../assets/logo.png';
import './CSS/Navbar.css';
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (hash) => location.hash === hash;

  return (
    <nav className="Navbar">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="StayVacay" className="logo-img" />
      </div>

      {/* Links */}
      <div className="links">
        <ul className="nav-links">
          <li>
            <HashLink smooth to="/#hero" className={`nav-link ${isActive("#hero") ? "active" : ""}`}>
              Home
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#stays" className={`nav-link ${isActive("#stays") ? "active" : ""}`}>
              Stays
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#services" className={`nav-link ${isActive("#services") ? "active" : ""}`}>
              Services
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#about" className={`nav-link ${isActive("#about") ? "active" : ""}`}>
              About
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#review" className={`nav-link ${isActive("#review") ? "active" : ""}`}>
              Review
            </HashLink>
          </li>
        </ul>
      </div>

      {/* Contact Button */}
      <div className="contact">
        <a
        href="https://wa.me/+971569192299"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
      >
        Contact Us <FaWhatsapp className="contact-icon" />
      </a>
      </div>
    </nav>
  );
};

export default Navbar;
