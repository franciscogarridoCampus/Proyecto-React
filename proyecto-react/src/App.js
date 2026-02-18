import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';
import { PrivateRoute } from './componentes/PrivateRoute/PrivateRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cartelera } from './pages/Cartelera';
import { AdminCartelera } from './pages/AdminCartelera';
import { DetallePelicula } from './pages/DetallePelicula';
import PeliculaForm from './componentes/FormPelicula/PeliculaForm';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#121212', color: 'white' }}>
        <Header />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* RUTAS PROTEGIDAS USUARIO */}
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />

            <Route path="/cartelera" element={
              <PrivateRoute>
                <Cartelera />
              </PrivateRoute>
            } />

            <Route path="/pelicula/:id" element={
              <PrivateRoute>
                <DetallePelicula />
              </PrivateRoute>
            } />

            {/* RUTAS PROTEGIDAS ADMIN */}
            <Route path="/admin-cartelera" element={
              <PrivateRoute adminOnly={true}>
                <AdminCartelera />
              </PrivateRoute>
            } />

            {/* Ruta para Crear */}
            <Route path="/admin-cartelera/nueva" element={
              <PrivateRoute adminOnly={true}>
                <PeliculaForm />
              </PrivateRoute>
            } />

            {/* Ruta para Editar */}
            <Route path="/admin-cartelera/editar/:id" element={
              <PrivateRoute adminOnly={true}>
                <PeliculaForm />
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export { App };