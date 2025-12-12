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
  images
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${_id}`);
  };

  // AED price formatter
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(value);

  return (
    <div className='property-card' onClick={handleClick}>
      <div className="card-left">
        <div className="card-top">
           <h1>{name}</h1>
          <h2>{formatPrice(price)}</h2>
         
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
        {images && images.length > 0 && (
          <img src={images[0]} alt="Property" />
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
