import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PropertyCard from './PropertyCard';
import './CSS/ViewProperties.css';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties')
      .then(res => setProperties(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <h2>All Properties</h2>
      <div className="view-properties">
        {properties.length === 0 ? <p>No properties found.</p> : (
          properties.map(prop => (
            <PropertyCard key={prop._id} 
              price={prop.price}
              name={prop.name}
              location={prop.location}
              bedrooms={prop.bedrooms}
              bathrooms={prop.bathrooms}
              size={prop.size}
              propertyImages={prop.images}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewProperties;
