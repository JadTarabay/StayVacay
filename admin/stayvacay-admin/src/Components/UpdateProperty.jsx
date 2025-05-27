import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateProperty = () => {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get('/properties')
      .then(res => setProperties(res.data))
      .catch(console.error);
  }, []);

  const openEditForm = (property) => {
    setSelected(property);
    // Pre-fill the form fields with selected property data
    reset({
      name: property.name,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      size: property.size,
    });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Append text fields
      for (const key of ['name', 'location', 'price', 'bedrooms', 'bathrooms', 'size']) {
        formData.append(key, data[key]);
      }
      // Append new images if any
      if (data.images && data.images.length > 0) {
        for (const file of data.images) {
          formData.append('images', file);
        }
      }

      await api.put(`/properties/${selected._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Property updated!');
      setSelected(null);
      // Refresh properties list
      const refreshed = await api.get('/properties');
      setProperties(refreshed.data);
    } catch (err) {
      toast.error('Failed to update property');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2>Update Properties</h2>

      {!selected && (
        <ul>
          {properties.map(prop => (
            <li key={prop._id} style={{ marginBottom: '10px' }}>
              <strong>{prop.name}</strong> - {prop.location} &nbsp;
              <button onClick={() => openEditForm(prop)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{ marginTop: '20px' }}>
          <div>
            <label>Property Name</label>
            <input {...register('name')} required />
          </div>
          <div>
            <label>Location</label>
            <input {...register('location')} required />
          </div>
          <div>
            <label>Price</label>
            <input type="number" {...register('price')} required />
          </div>
          <div>
            <label>Bedrooms</label>
            <input type="number" {...register('bedrooms')} required />
          </div>
          <div>
            <label>Bathrooms</label>
            <input type="number" {...register('bathrooms')} required />
          </div>
          <div>
            <label>Size (m²)</label>
            <input type="number" {...register('size')} required />
          </div>
          <div>
            <label>Upload New Images (optional)</label>
            <input type="file" {...register('images')} multiple accept="image/*" />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setSelected(null)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProperty;
