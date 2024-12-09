import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import logo from '../../assets/logo.jpeg';
import LoginPopup from '../auth/LoginPopup/LoginPopup';

const Header = () => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = cookies.get('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    cookies.remove('authToken', { path: '/' });
    setIsLoggedIn(false);
  };

  return (
    <header className="px-10 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="SentioCap" className="h-8" />
          <span className="text-xl font-semibold text-gray-700">SentioCap</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-12 mx-12">
          <a 
            href="/" 
            className="text-gray-700 text-[15px] py-2 font-medium relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-green-500"
          >
            Home
          </a>
          <a 
            href="/about" 
            className="text-gray-700 text-[15px] py-2 font-medium hover:text-green-500 transition-colors"
          >
            About Us
          </a>
          <a 
            href="/faq" 
            className="text-gray-700 text-[15px] py-2 font-medium hover:text-green-500 transition-colors"
          >
            FAQ
          </a>
          <a 
            href="/contact" 
            className="text-gray-700 text-[15px] py-2 font-medium hover:text-green-500 transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* User Profile / Login Button */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3 p-2 rounded bg-gray-50">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-600">
              AS
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-gray-800">
                Adam Smith
              </span>
              <span className="text-xs text-gray-500">
                adamsmith@domain.com
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 px-2 text-xs transition-colors"
            >
              ▼
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-green-500 text-white px-6 py-2.5 rounded text-[15px] hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        )}
        
        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      </div>
    </header>
  );
};

export default Header;