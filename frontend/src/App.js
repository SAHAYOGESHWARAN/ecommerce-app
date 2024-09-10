import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login'; // Ensure case sensitivity
import Register from './components/Auth/Register'; // Ensure case sensitivity
import ProductList from './components/Product/ProductList'; // Ensure case sensitivity
import ProductDetails from './components/Product/ProductDetails';
import ProductUpload from './components/Product/ProductUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
