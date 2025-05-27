import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === 'images') {
          for (const file of data.images) {
            formData.append('images', file);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      await api.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Property added!');
      reset();
    } catch (err) {
      toast.error('Failed to add property');
    }
  };

  return (
    <div className="page-container">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Property Name" required />
        <input {...register('location')} placeholder="Property Location" required />
        <input type="number" {...register('price')} placeholder="Price" required />
        <input type="number" {...register('bedrooms')} placeholder="Number of Beds" required />
        <input type="number" {...register('bathrooms')} placeholder="Number of Baths" required />
        <input type="number" {...register('size')} placeholder="Dimensions (m²)" required />
        <input type="file" {...register('images')} multiple accept="image/*" required />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
