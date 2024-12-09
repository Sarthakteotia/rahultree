import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import './AssetAllocation.css';
import LoginPopup from '../auth/LoginPopup/LoginPopup';


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

  const [selectedSegment, setSelectedSegment] = useState('');

  const handleNextClick = () => {
    setShowAlert(true);
  };

  const handleOkClick = () => {
    setShowAlert(false);
    setShowLogin(true);
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

      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default AssetAllocation;