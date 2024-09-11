import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; // Import CSS file for styling

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!name || !price || !description || !category) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(price) || price <= 0) {
      setError('Price must be a positive number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Product created successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setError('Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
