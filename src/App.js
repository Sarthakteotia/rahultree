import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Header from "./components/Header/Header";
import AssetAllocation from "./components/AssetAllocation/AssetAllocation";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import HomePage from "./components/HomePage/HomePage"; // Import HomePage component

const App = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount and when cookies change
  useEffect(() => {
    const checkAuth = () => {
      const token = cookies.get("authToken");
      console.log("Current token:", token);
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    // Initial check
    checkAuth();

    // Set up interval for continuous checking
    const interval = setInterval(checkAuth, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  console.log("Is Authenticated:", isAuthenticated);

  return (
    <div className="app">
      <Header />
      {isAuthenticated ? (
        <ComingSoon />
      ) : (
        <>
          <HomePage />
          <AssetAllocation />
        </>
      )}
    </div>
  );
};

export default App;
