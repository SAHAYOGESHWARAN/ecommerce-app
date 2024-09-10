import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products?search=${searchTerm}`);
      setProducts(data);
    };
    fetchProducts();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
