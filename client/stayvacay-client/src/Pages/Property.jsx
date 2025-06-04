import React, { useEffect, useState } from 'react';
import './CSS/Property.css';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaLocationDot } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";
import Footer from '../components/Footer';

const Property = () => {
  const [property, setProperty] = useState(null);
  const [showFullView, setShowFullView] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/public/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  const handleImageClick = (img) => {
    setCurrentImage(img);
    setShowFullView(true);
  };

  if (!property) return <p>Loading...</p>;

  const firstImage = property.images[0];
  const nextFour = property.images.slice(1, 5);
  const remainingCount = property.images.length - 5;

  return (
    
    <div className="Property-container">
      <div className="propertyc-header"><Navbar /></div>
      <div className="image-gallery">
        <div className="main-image" onClick={() => handleImageClick(firstImage)}>
          <img src={`/${firstImage}`} alt="Main" />
        </div>
        <div className="sub-images">
          {nextFour.map((img, idx) => (
            <div key={idx} className="sub-image" onClick={() => handleImageClick(img)}>
              <img src={`/${img}`} alt={`Sub ${idx}`} />
              {idx === 3 && remainingCount > 0 && (
                <div className="overlay" onClick={() => handleImageClick(img)}>
                  +{remainingCount} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
          <div className="description-top">
            <h3>Description</h3>
          </div>
          <p>{property.description}</p>
          <div className="d-book-button">
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
      </div>
      <Footer />

      {showFullView && (
        <div className="full-view" onClick={() => setShowFullView(false)}>
          <img src={`/${currentImage}`} alt="Full view" />
        </div>
      )}
    </div>
  );
};

export default Property;
