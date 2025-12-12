import React from "react";
import "./CSS/PropertyCard.css";
import locationIcon from "../assets/location.png";
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub, MdOutlineWidthWide } from "react-icons/md";

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

  const firstImage = images?.[0]; // already public Supabase URL
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(value);


  return (
    <div className="property-card">
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
       
      </div>

      <div className="card-right">
        {firstImage ? (
          <img src={firstImage} alt="Property" />
        ) : (
          <p>No Image</p>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
