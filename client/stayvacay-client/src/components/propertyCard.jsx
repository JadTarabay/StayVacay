import React from 'react';
import locationIcon from "../assets/propertyCard/location.png";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";
import './CSS/PropertyCard.css';

const PropertyCard = ({
  price,
  name,
  location,
  bedrooms,
  bathrooms,
  size,
  ownerName,
  ownerPicture,
  propertyImages
}) => {
  return (
    
      <div className='property-card'>
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
            <div className="specification"><IoBedOutline className='card-icon' /><p>{bedrooms}</p></div>
            <div className="specification"><MdBathtub className='card-icon' /><p>{bathrooms}</p></div>
            <div className="specification"><MdOutlineWidthWide className='card-icon' /><p>{size} m²</p></div>
          </div>
          <hr />
          <div className="card-bottom">
            <div className="owner">
              <img src={ownerPicture} alt="owner" />
              <h1>{ownerName}</h1>
            </div>
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
          <img src={propertyImages[0]} alt="Property" />
        </div>
      </div>
  );
};

export default PropertyCard;
