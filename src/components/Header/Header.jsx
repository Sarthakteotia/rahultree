import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Header.css';
import logo from '../../assets/logo.jpeg';

// Custom hook to watch cookie changes
const useAuthToken = () => {
  const cookies = new Cookies();
  const [authToken, setAuthToken] = useState(cookies.get('authToken'));

  useEffect(() => {
    // Check for token every second
    const interval = setInterval(() => {
      const currentToken = cookies.get('authToken');
      if (currentToken !== authToken) {
        setAuthToken(currentToken);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [authToken]);

  return authToken;
};

const Header = () => {
  const cookies = new Cookies();
  const authToken = useAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('AS');
  const [userEmail, setUserEmail] = useState('adamsmith@domain.com');

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
      // You can decode JWT token here to get user info
      // const decodedToken = jwt_decode(authToken);
      // setUserEmail(decodedToken.email);
      // setUserInitials(getInitials(decodedToken.name));
    } else {
      setIsLoggedIn(false);
    }
  }, [authToken]); // Re-run when authToken changes

  const handleLogout = () => {
    cookies.remove('authToken', { path: '/' });
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="SentioCap" />
        </div>
        
        {isLoggedIn ? (
          <div className="user-profile">
            <div className="user-avatar">
              <span className="initials">{userInitials}</span>
            </div>
            <div className="user-info">
              <span className="user-name">Adam Smith</span>
              <span className="user-email">{userEmail}</span>
            </div>
            <button className="dropdown-button" onClick={handleLogout}>▼</button>
          </div>
        ) : (
          <button className="login-button">Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;