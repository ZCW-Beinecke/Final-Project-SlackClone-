import React, { useContext } from 'react'; // Import useContext if using Context API
import { UserContext } from './Components/UserContext.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary components
import Login from './Components/Login/login';
import AppRoutes from './Components/AppRoutes'; // Import component containing your regular app routes (Home, OtherPage, etc.)

const ConditionalApp = () => {
  const isLoggedIn = useContext(UserContext); // Use useContext if using Context API

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="*" element={isLoggedIn ? <AppRoutes /> : null}>
          {' '}
          {/* Render AppRoutes only if logged in */}
          {/* Other routes in AppRoutes component */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ConditionalApp;
