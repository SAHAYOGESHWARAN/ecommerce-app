import React, { useState } from 'react';
import axios from 'axios';
import './ProductUpload.css'; // Import CSS file for styling

const ProductUpload = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!name || !price || !description || !category || !imageUrl) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/products', {
        name,
        price,
        description,
        category,
        imageUrl,
      });
      alert('Product uploaded successfully!');
      // Clear form fields after successful upload
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImageUrl('');
    } catch (error) {
      setError('Error uploading product. Please try again.');
      console.error('Error uploading product:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-upload-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit} className="product-upload-form">
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ProductUpload;
