import React from "react";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Logo from '../assets/logo.png';
import './CSS/Navbar.css';

const Navbar = () => {
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
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/stays" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Stays
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/review" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Review
            </NavLink>
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
