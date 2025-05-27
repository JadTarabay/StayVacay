import React from 'react'
import './CSS/Services.css';
import S1 from '../assets/services/S1.png';
import S2 from '../assets/services/S2.png';
import S3 from '../assets/services/S3.png';
import S4 from '../assets/services/S4.png';
import DArrow from '../assets/services/d-arrow.png';
import Property2 from '../assets/images/property2.jpg';
import Property3 from '../assets/services/property3.jpg';

const Services = () => {
  return (
    <div className="services">
      <div className="services-top">
        <h2>Services</h2>
        <h1>Professional Vacation Rental <br/> Services</h1>
      </div>
      <div className="services-bottom">
        <div className="sb-top">
            <div className="service1">
                <img src={S1} alt="" />
                <h3>Interior Design</h3>
            </div>
             <div className="service">
                <img src={S2} alt="" />
                <h3>Property Management</h3>
            </div>
             <div className="service">
                <img src={S3} alt="" />
                <h3>Rental Assistance</h3>
            </div>
             <div className="service">
                <img src={S4} alt="" />
                <h3> 24 hr. Concierge</h3>
            </div>
        </div>
        <div className="sb-bottom">
            <div className="sbb-left">
                <div className="sbbl-top">
                    <h2>Expert Care for Every Stay in Dubai</h2>
                    <p>Whether you're listing your property or searching for the <br/> perfect getaway in Dubai, we offer expert support and <br/> premium service—start to finish.</p>
                </div>
                <div className="sbbl-middle">
                    <div className="sbbl-middle-detail">
                        <img src={DArrow} alt="" />
                        <h3>Targeted Property Marketing</h3>
                    </div>
                    <div className="sbbl-middle-detail">
                        <img src={DArrow} alt="" />
                        <h3>Guest Experience Management</h3>
                    </div>
                    <div className="sbbl-middle-detail">
                        <img src={DArrow} alt="" />
                        <h3>Market Insights for Better ROI</h3>
                    </div>
                </div>
                <div className="sbbl-bottom">
                    <button>Explore More</button>
                </div>
            </div>
            <div className="sbb-right">
                <img src={Property2} alt="" />
                <div className="sbb-right-img">
                    <img src={Property3} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Services
