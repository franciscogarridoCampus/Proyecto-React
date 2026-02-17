import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('usuarioLogueado');
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export { PrivateRoute }; // <--- SI ESTO NO ESTÁ ASÍ, APP EXPLOTA