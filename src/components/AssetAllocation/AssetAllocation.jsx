import React, { useState } from 'react';
import './AssetAllocation.css';

const AssetAllocation = () => {
  const [segments] = useState([
    { id: 1, title: 'Name of Segment 1' },
    { id: 2, title: 'Name of Segment 2' },
    { id: 3, title: 'Name of Segment 3' },
    { id: 4, title: 'Name of Segment 4' },
    { id: 5, title: 'Name of Segment 5' },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
              <button className="more-options-btn">⋮</button>
            </div>
          ))}
        </div>

        <div className="bottom-row">
          <div className="segment-input">
            <select className="segment-field">
              <option value="" disabled selected>Enter Segment Title</option>
            </select>
          </div>
          <button className="add-segment-btn">Add New Segment</button>
        </div>

        <div className="navigation">
          <button className="next-btn" onClick={handleNextClick}>
            Next <span className="arrow">→</span>
          </button>
        </div>
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
            <div className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input type="password" placeholder="********" />
                  <button className="toggle-password">👁️</button>
                </div>
              </div>
              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <button type="submit" className="login-btn">Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetAllocation;