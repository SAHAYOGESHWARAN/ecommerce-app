import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import ProductUpload from './components/Product/ProductUpload';
import Navbar from './components/Navbar'; // Importing Navbar

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Adding the Navbar */}
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
