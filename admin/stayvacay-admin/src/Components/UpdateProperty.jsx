import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PropertyCardFull from './PropertyCardfull';
import './CSS/UpdateProperty.css';
import { useDropzone } from 'react-dropzone';

const UpdateProperty = () => {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [files, setFiles] = useState([]);

  const [amenities, setAmenities] = useState(['']);
  const [nearbyPlaces, setNearbyPlaces] = useState(['']);
  const [notes, setNotes] = useState(['']);

  const { register, handleSubmit, reset } = useForm();

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

  const openEditForm = (property) => {
    setSelected(property);
    setFiles([]);

    setAmenities(property.description?.amenities || ['']);
    setNearbyPlaces(property.description?.nearbyPlaces || ['']);
    setNotes(property.description?.notes || ['']);

    reset({
      name: property.name,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      size: property.size,
      shortDescription: property.description?.shortDescription || '',
    });
  };

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

  const renderDynamicInputs = (label, values, setter) => (
    <div className="dynamic-section">
      <h4>{label}</h4>

      {values.map((value, idx) => (
        <div key={idx} className="dynamic-row">
          <input
            type="text"
            value={value}
            onChange={(e) =>
              handleDynamicChange(setter, idx, e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => removeField(setter, idx)}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-btn"
        onClick={() => addField(setter)}
      >
        + Add
      </button>
    </div>
  );

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Basic fields
      [
        'name',
        'location',
        'price',
        'bedrooms',
        'bathrooms',
        'size',
      ].forEach((key) => {
        formData.append(key, data[key]);
      });

      // Structured description
      formData.append(
        'description',
        JSON.stringify({
          shortDescription: data.shortDescription,
          amenities: amenities.filter(Boolean),
          nearbyPlaces: nearbyPlaces.filter(Boolean),
          notes: notes.filter(Boolean),
        })
      );

      // New images
      files.forEach((file) => {
        formData.append('images', file);
      });

      await api.put(`/properties/${selected._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Property updated successfully');
      setSelected(null);
      setFiles([]);
      fetchProperties();

    } catch (err) {
      console.error(err);
      toast.error('Failed to update property');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  return (
    <div className="page-container">
      <h2>Update Properties</h2>

      {!selected ? (
        <div className="property-list">
          {properties.map((prop) => (
            <div className="property-wrapper" key={prop._id}>
              <PropertyCardFull {...prop} />
              <button
                className="edit-button"
                onClick={() => openEditForm(prop)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <input {...register('name')} placeholder="Name" required />
          <input {...register('location')} placeholder="Location" required />
          <input type="number" {...register('price')} placeholder="Price" required />
          <input type="number" {...register('bedrooms')} placeholder="Bedrooms" required />
          <input type="number" {...register('bathrooms')} placeholder="Bathrooms" required />
          <input type="number" {...register('size')} placeholder="Size (sqm)" required />

          <textarea
            {...register('shortDescription')}
            placeholder="Short description"
            rows={4}
          />

          {renderDynamicInputs('Amenities', amenities, setAmenities)}
          {renderDynamicInputs('Nearby Places', nearbyPlaces, setNearbyPlaces)}
          {renderDynamicInputs('Other Things to Note', notes, setNotes)}

          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop new images (optional)</p>
          </div>

          <button type="submit">Save Changes</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setSelected(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProperty;
