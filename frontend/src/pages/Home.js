import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? product.category === categoryFilter : true)
  );

  return (
    <div className="home-container">
      <h1>Products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}
      <ul className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product._id} className="product-item">
              <Link to={`/products/${product._id}`}>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
