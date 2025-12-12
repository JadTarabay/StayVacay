import React from "react";
import "./CSS/PropertyCard.css";

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

  return (
    <div className="property-card">
      <div className="card-left">
        <h1>${price}</h1>
        <h1>{name}</h1>

        <p>{location}</p>

        <div className="specs">
          <p>{bedrooms} Beds</p>
          <p>{bathrooms} Baths</p>
          <p>{size} sqft</p>
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
