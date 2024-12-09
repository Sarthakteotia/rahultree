import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  const cookies = new Cookies();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        cookies.set('authToken', data.token, {
          path: '/',
          maxAge: 21600,
          secure: false,
          sameSite: 'lax',
        });
        
        console.log('Token saved:', data.token);
        console.log('Cookie after save:', cookies.get('authToken'));
        
        window.location.reload();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="Enter email" 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input 
                type="password" 
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="********" 
              />
              <button type="button" className="toggle-password">👁️</button>
            </div>
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup; 