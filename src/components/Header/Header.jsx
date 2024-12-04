import React from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg'; // Add your logo image

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="SentioCap" />
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;