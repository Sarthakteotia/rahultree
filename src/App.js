import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import AssetAllocation from './components/AssetAllocation/AssetAllocation';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <HomePage />
      <AssetAllocation />
    </div>
  );
};

export default App;