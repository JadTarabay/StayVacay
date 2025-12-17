import React, { useEffect, useState } from 'react';
import './CSS/Property.css';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaLocationDot } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";

const Property = () => {
  const [property, setProperty] = useState(null);
  const [showFullView, setShowFullView] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties/public/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id, API_BASE_URL]);

  // ✅ MUST be inside component
  const handleImageClick = (img) => {
    setCurrentImage(img);
    setShowFullView(true);
  };

  if (!property) return <p>Loading...</p>;

  const images = property.images || [];

  const firstImage = images[0];
  const nextFour = images.slice(1, 5);
  const remainingImages = images.slice(5);
  const remainingCount = remainingImages.length;
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="Property-container">
      <Navbar />

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image" onClick={() => handleImageClick(firstImage)}>
          <img src={firstImage} alt="Main" />
        </div>

        <div className="sub-images">
          {nextFour.map((img, idx) => (
            <div
              key={idx}
              className="sub-image"
              onClick={() => handleImageClick(img)}
            >
              <img src={img} alt="" />

              {idx === 3 && remainingCount > 0 && (
                <div
                  className="overlay"
                  onClick={() => handleImageClick(remainingImages[0])}
                >
                  +{remainingCount} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-bottom">
        <div className="p-left">
          <div className="pd-top">
            <h2>{property.name}</h2>
            <p>Price: {formatPrice(property.price)}</p>
          </div>

          <div className="pd-bottom">
            <div className="pd-bottom-left">
              <div className="pd-detail">
                <FaLocationDot className='pd-icon' />
                <p>{property.location}</p>
              </div>

              <div className="pd-detail">
                <IoBedOutline className='pd-icon' />
                <p>Bedrooms: {property.bedrooms}</p>
              </div>

              <div className="pd-detail">
                <MdBathtub className='pd-icon' />
                <p>Bathrooms: {property.bathrooms}</p>
              </div>

              <div className="pd-detail">
                <MdOutlineWidthWide className='pd-icon' />
                <p>Size: {property.size} sqm</p>
              </div>
              <div className="d-book-button">
                <a
                  href="https://wa.me/+971569192299"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Book Now</button>
                </a>
              </div>
            </div>
            
             <div className={`d-right ${expanded ? 'expanded' : 'collapsed'}`}>
  
              <button
                className="toggle-description"
                onClick={() => setExpanded(!expanded)}
                aria-label="Toggle description"
              >
               {expanded ? 'View Less ▲' : ' View More ▼'} 
              </button>

              <h3>Description</h3>
              <p>{property.description?.shortDescription}</p>

              <div className="info-section">
                <h4>Amenities</h4>
                <ul className="bubble-list">
                  {property.description?.amenities?.map((item, i) => (
                    <li key={i} className="bubble-item">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h4>Nearby Places</h4>
                <ul className="bubble-list">
                  {property.description?.nearbyPlaces?.map((item, i) => (
                    <li key={i} className="bubble-item">{item}</li>
                  ))}
                </ul>
              </div>


              <div className="info-section">
                <h4>Other Things to Note</h4>
                <ul>
                  {property.description?.notes?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

             
            </div>


          </div>
        </div>

       

      </div>

      <Footer />

      {/* Full View Modal */}
      {showFullView && (
        <div className="full-view" onClick={() => setShowFullView(false)}>
          <div
            className="carousel-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="carousel-prev"
              onClick={() => {
                const currentIndex = images.indexOf(currentImage);
                const prevIndex =
                  (currentIndex - 1 + images.length) % images.length;
                setCurrentImage(images[prevIndex]);
              }}
            >
              &#10094;
            </button>

            <img
              src={currentImage}
              alt="Full view"
              className="carousel-main-image"
            />

            <button
              className="carousel-next"
              onClick={() => {
                const currentIndex = images.indexOf(currentImage);
                const nextIndex =
                  (currentIndex + 1) % images.length;
                setCurrentImage(images[nextIndex]);
              }}
            >
              &#10095;
            </button>

            <div className="carousel-thumbnails">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className={img === currentImage ? "active-thumb" : ""}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
