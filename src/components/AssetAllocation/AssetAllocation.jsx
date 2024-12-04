import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import './AssetAllocation.css';

const AssetAllocation = () => {
  const cookies = new Cookies();
  
  const [segments] = useState([
    { id: 1, title: 'Name of Segment 1' },
    { id: 2, title: 'Name of Segment 2' },
    { id: 3, title: 'Name of Segment 3' },
    { id: 4, title: 'Name of Segment 4' },
    { id: 5, title: 'Name of Segment 5' },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [selectedSegment, setSelectedSegment] = useState('');

  const handleNextClick = () => {
    setShowAlert(true);
  };

  const handleOkClick = () => {
    setShowAlert(false);
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

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
        // Save token in cookie with explicit options
        cookies.set('authToken', data.token, {
          path: '/',
          maxAge: 21600, // 6 hours in seconds
          secure: false, // Set to false for local development
          sameSite: 'lax',
        });
        
        // Debug logs
        console.log('Token saved:', data.token);
        console.log('Cookie after save:', cookies.get('authToken'));
        
        // Force reload after setting cookie
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
    <div className="asset-allocation">
      <div className="header-section">
        <h2>Asset Allocation</h2>
        <div className="page-indicator">
          <span>1/7</span>
        </div>
      </div>

      <div className="allocation-container">
        <div className="level-indicator">Level 1</div>
        
        <div className="instruction">
          <p>Please indicate the primary operating segments within your company which you currently track</p>
        </div>

        <div className="segments-container">
          {segments.map((segment) => (
            <div key={segment.id} className="segment-input">
              <input 
                type="text" 
                placeholder={segment.title}
                className="segment-field"
              />
              <button className="edit-btn">✎</button>
            </div>
          ))}
        </div>

        <div className="bottom-row">
          <div className="segment-input">
            <select 
              className="segment-field dropdown" 
              value={selectedSegment} 
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="" disabled>Enter segment title</option>
            </select>
            <span className="dropdown-arrow">▼</span>
          </div>
          <button className="add-segment-btn">Add New Segment</button>
        </div>
      </div>

      <div className="navigation">
        <button className="next-btn" onClick={handleNextClick}>
          Next <span className="arrow">→</span>
        </button>
      </div>

      {showAlert && (
        <div className="popup-overlay">
          <div className="alert-popup">
            <div className="alert-icon">⚠️</div>
            <p>Please log in first to continue.</p>
            <button className="ok-btn" onClick={handleOkClick}>Ok</button>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="popup-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={handleLoginClose}>×</button>
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
      )}
    </div>
  );
};

export default AssetAllocation;