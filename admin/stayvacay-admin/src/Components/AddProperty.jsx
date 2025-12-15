import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import './CSS/AddProperties.css';

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const [files, setFiles] = useState([]);

  const [amenities, setAmenities] = useState(['']);
  const [nearbyPlaces, setNearbyPlaces] = useState(['']);
  const [notes, setNotes] = useState(['']);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleDynamicChange = (setter, index, value) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addField = (setter) => setter((prev) => [...prev, '']);
  const removeField = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Basic fields
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Description object
      formData.append(
        'description',
        JSON.stringify({
          shortDescription: data.shortDescription,
          amenities: amenities.filter(Boolean),
          nearbyPlaces: nearbyPlaces.filter(Boolean),
          notes: notes.filter(Boolean),
        })
      );

      files.forEach((file) => {
        formData.append('images', file);
      });

      await api.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Property added successfully');
      reset();
      setFiles([]);
      setAmenities(['']);
      setNearbyPlaces(['']);
      setNotes(['']);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add property');
    }
  };

  const renderDynamicInputs = (label, values, setter) => (
    <div className="dynamic-section">
      <h4>{label}</h4>

      {values.map((value, idx) => (
        <div key={idx} className="dynamic-row-add">
          <input
            type="text"
            value={value}
            placeholder={`Add ${label.toLowerCase()}`}
            onChange={(e) =>
              handleDynamicChange(setter, idx, e.target.value)
            }
          />
          <button type="button" onClick={() => removeField(setter, idx)}>
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-btn-add"
        onClick={() => addField(setter)}
      >
        + Add
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <h2>Add Property</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="add-property-form">
        <div className="form-row">
          <input {...register('name')} placeholder="Property Name" required />
          <input {...register('location')} placeholder="Location" required />
          <input type="number" {...register('price')} placeholder="Price (AED)" required />
        </div>

        <div className="form-row">
          <input type="number" {...register('bedrooms')} placeholder="Bedrooms" required />
          <input type="number" {...register('bathrooms')} placeholder="Bathrooms" required />
          <input type="number" {...register('size')} placeholder="Size (sqft)" required />
        </div>
        <div className="description">
           <textarea
          {...register('shortDescription')}
          placeholder="Short description of the property"
          rows={4}
          className="text-area"
        />
        <div className="description-details">
          {renderDynamicInputs('Amenities', amenities, setAmenities)}
          {renderDynamicInputs('Nearby Places', nearbyPlaces, setNearbyPlaces)}
          {renderDynamicInputs('Other Things to Note', notes, setNotes)}
        </div>
        

        </div>
       
        <div className="form-row-bottom">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive
              ? <p>Drop images here…</p>
              : <p>Drag & drop images or click</p>}
          </div>

          <button type="submit">Add Property</button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
