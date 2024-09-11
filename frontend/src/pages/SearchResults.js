import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchResults.css'; // Import CSS file for styling

const SearchResults = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products?search=${searchTerm}&page=${currentPage}`);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  return (
    <div className="search-results-container">
      <h1>Search Results for "{searchTerm}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {products.length === 0 && !loading && <p>No products found.</p>}
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={currentPage === page + 1 ? 'active' : ''}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
