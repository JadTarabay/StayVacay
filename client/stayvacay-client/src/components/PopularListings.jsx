import React, { useEffect, useState } from 'react';
import PropertyCard from './propertyCard';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import './CSS/PopularListings.css';

import G1 from '../assets/images/g1.png';
import G2 from '../assets/images/g2.png';
import G3 from '../assets/images/g3.png';
import G4 from '../assets/images/g4.png';

const PopularListings = () => {
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount());
  const [currentIndex, setCurrentIndex] = useState(0);

  function getInitialVisibleCount() {
    return window.innerWidth < 768 ? 1 : 2;
  }

  /* =========================
     Fetch featured properties
  ========================= */
  useEffect(() => {
  const fetchFeatured = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/properties/public/featured`
      );
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error('Failed to load featured properties', err);
    }
  };

  fetchFeatured();
}, [API_BASE_URL]);


  /* =========================
     Responsive logic
  ========================= */
  useEffect(() => {
    const handleResize = () => {
      const newCount = window.innerWidth < 768 ? 1 : 2;
      setVisibleCount(newCount);
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const visibleProperties = properties.slice(
    currentIndex * visibleCount,
    (currentIndex + 1) * visibleCount
  );

  const navigate = useNavigate();
  const goToProperties = () => navigate('/properties');

  return (
    <div className="popular">
      <div className="Popular-listings">
        <div className="listing-top">
          <h2>Our Property</h2>
          <h1><span>For</span> You</h1>
          <p>
            Tailored stays that feel like home. Whether you're seeking a sleek penthouse <br />
            or a charming townhouse rich in character, we've got your next getaway covered.
          </p>
        </div>

        <div className="listing-bottom">
          <div className="nav-buttons">
            <button
              className="button-left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <CiCircleChevLeft className="nav-card-icon" />
            </button>

            <button
              className="button-right"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <CiCircleChevRight className="nav-card-icon" />
            </button>
          </div>

          <div className="properties-wrapper">
            <div className="properties">
              {visibleProperties.map(property => (
                <div
                  className="property-card-wrapper"
                  key={property._id}
                >
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>

            <div className="view-properties-button">
              <button onClick={goToProperties}>
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Gallery stays unchanged ===== */}
      <div className="popular-gallery">
        <div className="pg-top">
          <h2>Property</h2>
          <h1>
            Discover Your
            <span> Perfect <br /> Property</span> Match
          </h1>
        </div>

        <div className="pg-down">
          <div
            className="pg-left"
            style={{ backgroundImage: `url(${G1})` }}
          >
            <img src={G1} alt="G1" />
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
