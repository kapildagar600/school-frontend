
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const SchoolRegistrationForm = ({ onCancel }) => {
 const URL = 'https://school-backend-mu.vercel.app';
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email', data.email);
  
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
     
      const response = await axios.post(`${URL}/api/schools`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('School registered successfully:', response.data);
      alert('School registered successfully!');
      reset();
      setImagePreview(null);
      setSelectedImage(null);
      
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error registering school:', error);
      alert('Failed to register school. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative flex flex-col justify-center items-center py-8 px-4">
  
      <div className="gradient-background">
        <div className="gradient-shape shape-1"></div>
        <div className="gradient-shape shape-2"></div>
      </div>

      <div className="content max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-purple-300 via-blue-300 to-yellow-200 bg-clip-text text-transparent">
          School Registration
        </h2>
        <p className="text-gray-300 text-center mb-6">Register your school with our platform</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* School Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">School Name *</label>
              <input
                {...register('name', { required: 'School name is required' })}
                className="form-input"
                placeholder="Enter school name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address *</label>
              <input
                {...register('address', { required: 'Address is required' })}
                className="form-input"
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                {...register('city', { required: 'City is required' })}
                className="form-input"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <input
                {...register('state', { required: 'State is required' })}
                className="form-input"
                placeholder="Enter state"
              />
              {errors.state && (
                <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number *</label>
              <input
                {...register('contact', { 
                  required: 'Contact number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid number'
                  }
                })}
                className="form-input"
                placeholder="Enter contact number"
              />
              {errors.contact && (
                <p className="text-red-400 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email'
                  }
                })}
                className="form-input"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">School Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="image-upload-label">
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                      <div className="image-change-overlay">
                        <span className="text-white text-sm">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="image-upload-placeholder">
                     <svg className="upload-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 极速 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                     </svg>
                      <p className="upload-text">Click to upload an image</p>
                    </div>
                  )}
                  <input 
                    {...register('image')}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Registering...
                </>
              ) : (
                <>
                  <i className="fas fa-school mr-2"></i> Register School
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setImagePreview(null);
                setSelectedImage(null);
                if (onCancel) onCancel();
              }}
              className="btn btn-secondary flex-1"
              disabled={isSubmitting}
            >
              <i className="fas fa-times mr-2"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolRegistrationForm;