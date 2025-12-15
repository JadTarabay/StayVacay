import React from 'react';
import Facebook from '../assets/footer/Facebook.png';
import Instagram from '../assets/footer/Instagram.png';
import './CSS/Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <h1>Ready to get started?</h1>
        <button>Get started</button>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="fb-left">
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>

        <div className="fb-right">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Facebook} alt="Facebook" />
          </a>

          <a
            href="https://www.instagram.com/stayvacay.ae/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Instagram} alt="Instagram" />
          </a>
        </div>
      </div>

      <p>© 2025 StayVacay. All rights reserved.</p>
    </div>
  );
};

export default Footer;
