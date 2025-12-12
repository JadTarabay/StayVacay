import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import PropertyCardFull from './PropertyCardfull';
import './CSS/RemoveProperty.css';

const RemoveProperty = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties/public');
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await api.delete(`/properties/${id}`);
      toast.success('Property deleted');
      fetchProperties();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete property');
    }
  };

  return (
    <div className="page-container">
      <h2>Remove Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="property-list">
          {properties.map(prop => (
            <div className="property-wrapper" key={prop._id}>
              <PropertyCardFull
                _id={prop._id}
                price={prop.price}
                name={prop.name}
                location={prop.location}
                bedrooms={prop.bedrooms}
                bathrooms={prop.bathrooms}
                size={prop.size}
                images={prop.images}
              />

              <button
                className="delete-button"
                onClick={() => handleDelete(prop._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RemoveProperty;
