import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const RemoveProperty = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    api.get('/properties')
      .then(res => setProperties(res.data))
      .catch(console.error);
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
    } catch {
      toast.error('Failed to delete property');
    }
  };

  return (
    <div className="page-container">
      <h2>Remove Properties</h2>
      {properties.length === 0 ? <p>No properties found.</p> : (
        <ul>
          {properties.map(prop => (
            <li key={prop._id}>
              {prop.name} - {prop.location} 
              <button onClick={() => handleDelete(prop._id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemoveProperty;
