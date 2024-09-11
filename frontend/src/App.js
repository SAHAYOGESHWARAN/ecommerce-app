import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Example footer component
import LoadingSpinner from './components/LoadingSpinner'; // Example loading spinner component

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const ProductList = lazy(() => import('./components/Product/ProductList'));
const ProductDetails = lazy(() => import('./components/Product/ProductDetails'));
const ProductUpload = lazy(() => import('./components/Product/ProductUpload'));
const NotFound = lazy(() => import('./components/NotFound')); // 404 page component

const App = () => {
  // Example of a simple authentication check
  const isAuthenticated = true; // Replace with real authentication logic

  // Example of Private Route component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/upload" element={<PrivateRoute element={<ProductUpload />} />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Suspense>
      <Footer /> {/* Adding Footer */}
    </Router>
  );
};

export default App;
