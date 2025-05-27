import React from 'react'
import Facebook from '../assets/footer/Facebook.png'
import Instagram from '../assets/footer/Instagram.png'
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
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        </div>
        <div className="fb-right">
            <img src={Facebook} alt="facebook" />
            <img src={Instagram} alt="instagram" />
        </div>
      </div>
      <p>© 2025 StayVacay. All rights reserved.</p>
    </div>
  )
}

export default Footer
