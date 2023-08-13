// Protect Route, when not login. you can't go to tickets page

import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Component, isAuthenticated }) => {


  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;
