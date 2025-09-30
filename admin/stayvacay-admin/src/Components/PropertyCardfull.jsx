import React from 'react';
import locationIcon from "../assets/location.png";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";
import './CSS/PropertyCardfull.css';

const PropertyCardfull = ({
  price,
  name,
  location,
  bedrooms,
  bathrooms,
  size,
  propertyImages
}) => {
  return (
    <div className="property-card-full">
      <div className="left-info">
        <h3 className="property-name">{name}</h3>
        <div className="location-row">
          <img src={locationIcon} alt="location" className="location-icon" />
          <span>{location}</span>
        </div>
        <div className="details-row">
          <span className="detail">${price}</span>
          <span className="detail"><IoBedOutline /> {bedrooms}</span>
          <span className="detail"><MdBathtub /> {bathrooms}</span>
          <span className="detail"><MdOutlineWidthWide /> {size} m²</span>
        </div>
      </div>
      <div className="right-image">
        <img
          src={`http://localhost:5000/${propertyImages?.[0]}`}
          alt="Property"
          className="property-thumb"
        />
      </div>
    </div>
  );
};

export default PropertyCardfull;
