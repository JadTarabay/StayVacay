import React, { useState } from 'react';
import PropertyCard from './propertyCard';
import properties from '../data/properties';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"; 
import './CSS/PopularListings.css';

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
        </div>
      </div>
    </div>
  );
};

export default PopularListings;
