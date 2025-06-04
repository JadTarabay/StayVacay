import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import './CSS/AddProperties.css';

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (!['images'].includes(key)) {
          formData.append(key, data[key]);
        }
      }
      files.forEach(file => formData.append('images', file));

      await api.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Property added!');
      reset();
      setFiles([]);
    } catch (err) {
      toast.error('Failed to add property');
    }
  };

  return (
    <div className="page-container">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-property-form">  
        <div className="form-row">
          <input {...register('name')} placeholder="Property Name" required />
          <input {...register('location')} placeholder="Property Location" required />
          <input type="number" {...register('price')} placeholder="Price" required />
        </div>
        <div className="form-row">
          <input type="number" {...register('bedrooms')} placeholder="Number of Beds" required />
          <input type="number" {...register('bathrooms')} placeholder="Number of Baths" required />
          <input type="number" {...register('size')} placeholder="Dimensions (m²)" required />  
        </div>
        <div className="text-area">
          <textarea
            {...register('description')}
            placeholder="Write a short description about the property"
            rows={4}
            className="property-description"
          />
        </div>
        

        <div className="form-row-bottom">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop property images here, or click to select files</p>
            )}
            {files.length > 0 && (
              <div className="file-preview">
                {files.map((file, idx) => (
                  <span key={idx}>{file.name}</span>
                ))}
              </div>
            )}
          </div>
          <button type="submit">Add Property</button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
