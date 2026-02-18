import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, adminOnly = false }) {
  // Usamos tu clave correcta: 'usuarioLogueado'
  const userString = localStorage.getItem('usuarioLogueado');
  
  // 1. Si no hay nada en el storage, al login
  if (!userString) {
    return <Navigate to="/login" />;
  }

  // Convertimos el texto del storage en un objeto JS para leer el rol
  const user = JSON.parse(userString);

  // 2. Si la ruta pide ser Admin y el usuario no lo es, lo mandamos a la Home
  if (adminOnly && user.rol !== 'admin') {
    return <Navigate to="/" />;
  }

  // 3. Si está logueado (y es admin si se requería), adelante
  return children;
}

export { PrivateRoute };