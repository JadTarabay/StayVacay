import React from 'react';
import locationIcon from "../assets/propertyCard/location.png";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";
import './CSS/PropertyCard.css';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({
  _id,
  price,
  name,
  location,
  bedrooms,
  bathrooms,
  size,
  propertyImages
}) => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleClick = () => {
    navigate(`/property/${_id}`);
  };

  // Determine image URL
  let firstImage = propertyImages?.[0];

  if (firstImage) {
    // If it’s just a filename (no protocol), prepend API_BASE_URL
    if (!/^https?:\/\//i.test(firstImage)) {
      // Remove any leading "uploads/" if already present
      firstImage = firstImage.replace(/^uploads\//, '');
      firstImage = `${API_BASE_URL}/uploads/${encodeURIComponent(firstImage)}`;
    }
  } else {
    // fallback image
    firstImage = "https://via.placeholder.com/400x300?text=No+Image";
  }

  return (
    <div className='property-card' onClick={handleClick}>
      <div className="card-left">
        <div className="card-top">
          <h1>${price}</h1>
          <h1>{name}</h1>
          <div className="location">
            <img src={locationIcon} alt="location" />
            <p>{location}</p>
          </div>
        </div>

        <div className="specifications">
          <div className="specification">
            <IoBedOutline className='card-icon' />
            <p>{bedrooms}</p>
          </div>
          <div className="specification">
            <MdBathtub className='card-icon' />
            <p>{bathrooms}</p>
          </div>
          <div className="specification">
            <MdOutlineWidthWide className='card-icon' />
            <p>{size} sqft</p>
          </div>
        </div>

        <hr />

        <div className="card-bottom">
          <a
            href="https://wa.me/+971569192299"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            <button className='book-button'>Book</button>
          </a>
        </div>
      </div>

      <div className="card-right">
        <img src={firstImage} alt="Property" />
      </div>
    </div>
  );
};

export default PropertyCard;
