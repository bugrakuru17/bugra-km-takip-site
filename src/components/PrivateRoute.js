import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();

  console.log('PrivateRoute - Loading:', loading);
  console.log('PrivateRoute - User:', user);
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated());
  console.log('PrivateRoute - isAdmin:', isAdmin());
  console.log('PrivateRoute - adminOnly:', adminOnly);

  if (loading) {
    return <div className="text-center mt-5">Yükleniyor...</div>;
  }

  if (!isAuthenticated()) {
    console.log('PrivateRoute - Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    console.log('PrivateRoute - Redirecting to dashboard (not admin)');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('PrivateRoute - Rendering element');
  return <Element />;
};

export default PrivateRoute;
