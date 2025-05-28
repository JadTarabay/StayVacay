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
  const { register, handleSubmit, reset } = useForm();

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties');
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

    ['name', 'location', 'price', 'bedrooms', 'bathrooms', 'size'].forEach(key =>
      formData.append(key, data[key])
    );

    // Add new images from Dropzone
    if (files.length > 0) {
      files.forEach(file => formData.append('images', file));
    }

    await api.put(`/properties/${selected._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    toast.success('Property updated!');
    setSelected(null);
    setFiles([]); // Clear dropzone files
    fetchProperties();
  } catch (err) {
    toast.error('Failed to update property');
    console.error(err);
  }
};


  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
  accept: {
    'image/*': []
  },
  onDrop: acceptedFiles => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }
});

  return (
    <div className="page-container">
      <h2>Update Properties</h2>

      {!selected ? (
        <div className="property-list">
          {properties.map(prop => (
            <div className="property-wrapper" key={prop._id}>
              <PropertyCardFull
                price={prop.price}
                name={prop.name}
                location={prop.location}
                bedrooms={prop.bedrooms}
                bathrooms={prop.bathrooms}
                size={prop.size}
                propertyImages={prop.images}
              />
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="edit-form"
        >
          <div className='edit-form-row'><label>Name</label><input {...register('name')} required /></div>
          <div className='edit-form-row'><label>Location</label><input {...register('location')} required /></div>
          <div className='edit-form-row'><label>Price</label><input type="number" {...register('price')} required /></div>
          <div className='edit-form-row'><label>Bedrooms</label><input type="number" {...register('bedrooms')} required /></div>
          <div className='edit-form-row'><label>Bathrooms</label><input type="number" {...register('bathrooms')} required /></div>
          <div className='edit-form-row'><label>Size (m²)</label><input type="number" {...register('size')} required /></div>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop images here, or click to select files</p>
          </div>
          <div className="preview-list">
            {files.map((file, idx) => (
              <div key={idx} className="preview-item">{file.name}</div>
            ))}
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setSelected(null)} className="cancel-button">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProperty;
