import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink exact to="/home" activeClassName="active" className="navbar-link">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/login" activeClassName="active" className="navbar-link">
            Login
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/register" activeClassName="active" className="navbar-link">
            Register
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/upload" activeClassName="active" className="navbar-link">
            Upload Product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
