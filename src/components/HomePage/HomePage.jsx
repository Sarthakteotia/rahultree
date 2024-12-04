import React from 'react';
import './HomePage.css';
import image from '../../assets/homeimage.jpeg';

const HomePage = () => {
  // Using UI Faces for placeholder avatars
  const avatars = [
    { id: 1, img: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Customer 1' },
    { id: 2, img: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Customer 2' },
    { id: 3, img: 'https://randomuser.me/api/portraits/men/45.jpg', alt: 'Customer 3' },
    { id: 4, img: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Customer 4' },
  ];

  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="left-section">
          <div className="tag">ABOUT SENTIOCAP</div>
          <h1>A Revolutionary and Reliable Solution for Global Finance</h1>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
          
          <div className="cta-buttons">
            <button className="primary-button">Find Out More</button>
            <button className="secondary-button">View Live Demo</button>
          </div>

          <div className="trust-section">
            <div className="customer-avatars">
              {avatars.map((avatar, index) => (
                <div 
                  key={avatar.id} 
                  className="avatar-wrapper"
                  style={{ zIndex: avatars.length - index }}
                >
                  <img 
                    src={avatar.img} 
                    alt={avatar.alt} 
                    className="avatar"
                  />
                </div>
              ))}
            </div>
            <div className="rating">
              <span className="stars">★ ★ ★ ★ ★</span>
              <p>Trusted by 2K+ Customers</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <img src={image} alt="SentioCap" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;