import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PropertyCard from './PropertyCard';
import './CSS/ViewProperties.css';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties/public')
      .then(res => setProperties(res.data))
      .catch(console.error);
  }, []);
  const updateFeaturedState = (updatedProperty) => {
    setProperties(prev =>
      prev.map(p => p._id === updatedProperty._id ? updatedProperty : p)
    );
  };
  return (
    <div className="page-container">
      <h2>All Properties</h2>

      <div className="view-properties">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          properties.map(prop => (
            <PropertyCard
             key={prop._id}
            {...prop}
            onFeaturedChange={updateFeaturedState}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewProperties;
