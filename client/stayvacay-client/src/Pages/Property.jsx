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

  const handleImageClick = (img) => {
    setCurrentImage(img);
    setShowFullView(true);
  };

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/400x300?text=No+Image";
    return img.startsWith('http') ? img : `${API_BASE_URL}/${img}`;
  };

  if (!property) return <p>Loading...</p>;

  const firstImage = property.images[0];
  const nextFour = property.images.slice(1, 5);
  const remainingImages = property.images.slice(5);
  const remainingCount = remainingImages.length;

  return (
    <div className="Property-container">
      <Navbar />

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image" onClick={() => handleImageClick(firstImage)}>
          <img src={getImageUrl(firstImage)} alt="Main" />
        </div>
        <div className="sub-images">
          {nextFour.map((img, idx) => (
            <div key={idx} className="sub-image" onClick={() => handleImageClick(img)}>
              <img src={getImageUrl(img)} alt={`Sub ${idx}`} />
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
            <p>Price: ${property.price}</p>
          </div>
          <div className="pd-bottom">
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
          </div>
        </div>

        <div className="d-right">
          <h3>Description</h3>
          <p>{property.description}</p>
          <a
            href="https://wa.me/+971569192299"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            <button>Book Now</button>
          </a>
        </div>
      </div>

      <Footer />

      {/* Full View Modal */}
      {showFullView && (
        <div className="full-view" onClick={() => setShowFullView(false)}>
          <div className="carousel-container" onClick={e => e.stopPropagation()}>
            <button
              className="carousel-prev"
              onClick={() => {
                const currentIndex = property.images.indexOf(currentImage);
                const prevIndex = (currentIndex - 1 + property.images.length) % property.images.length;
                setCurrentImage(property.images[prevIndex]);
              }}
            >
              &#10094;
            </button>

            <img
              src={getImageUrl(currentImage)}
              alt="Full view"
              className="carousel-main-image"
            />

            <button
              className="carousel-next"
              onClick={() => {
                const currentIndex = property.images.indexOf(currentImage);
                const nextIndex = (currentIndex + 1) % property.images.length;
                setCurrentImage(property.images[nextIndex]);
              }}
            >
              &#10095;
            </button>

            <div className="carousel-thumbnails">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`Thumb ${idx}`}
                  className={getImageUrl(img) === getImageUrl(currentImage) ? 'active-thumb' : ''}
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
