import React, { useState } from 'react';
import PropertyCard from './propertyCard';
import properties from '../data/properties';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"; 
import './CSS/PopularListings.css';
import G1 from '../assets/images/g1.png';
import G2 from '../assets/images/g2.png';
import G3 from '../assets/images/g3.png';
import G4 from '../assets/images/g4.png';
import OArrow from '../assets/oArrow.png';

const PopularListings = () => {
  const visibleCount = 2;
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.ceil(properties.length / visibleCount) - 1;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="popular">
      <div className="Popular-listings">
        <div className="listing-top">
          <h2>Our Property</h2>
          <h1><span>For</span> You</h1>
          <p>Tailored stays that feel like home. Whether you're seeking a sleek penthouse <br />
            or a charming townhouse rich in character, we've got your next getaway covered.
          </p>
        </div>

        <div className="listing-bottom">
          <div className="nav-buttons">
            <button className='button-left' onClick={handlePrev}><CiCircleChevLeft className='nav-card-icon' /></button>
            <button className='button-right' onClick={handleNext}><CiCircleChevRight className='nav-card-icon' /></button>
          </div>

          <div className="properties-wrapper">
            <div
              className="properties"
              style={{
                transform: `translateX(-${currentIndex * (220 / visibleCount)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {properties.map((property, index) => (
                <div className="property-card-wrapper" key={index}>
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
            <div className="view-properties-button">
              <button>View More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="popular-gallery">
        <div className="pg-top">
          <h2>Property</h2>
          <h1>Discover Your<span> Perfect <br/> Property</span> Match</h1>
        </div>
        <div className="pg-down">
          <div className="pg-left" style={{ backgroundImage:`url(${G1})`}}>
              <div className="left-details">
                <div className="ld-left">
                  <h1>$2,100,000</h1>
                  <h2>Dubai</h2>
                  <h2>5 Maple Lane, Dubai</h2>
                </div>
                <div className="ld-right">
                  <img src={OArrow} alt="OArrow" />
                  <div className="ld-details">
                    <div className="ld-detail">
                      <p>1,356</p>
                      <p>Sq, Ft.</p>
                    </div>
                    <vr/>
                    <div className="ld-detail">
                      <p>3</p>
                      <p>Beds</p>
                    </div>
                    <vr/>
                    <div className="ld-detail">
                      <p>2</p>
                      <p>Baths</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="pg-right">
            <div className="pg-right-top">
              <img src={G2} alt="G2" />
              <img src={G3} alt="G3" />
            </div>
            <div className="pg-right-down">
              <img src={G4} alt="G4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularListings;
