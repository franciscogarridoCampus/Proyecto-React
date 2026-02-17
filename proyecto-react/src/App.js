import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Estilos
import './App.css';

// Componentes Reutilizables
import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';
import { PrivateRoute } from './componentes/PrivateRoute/PrivateRoute';

// Páginas (JSX)
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cartelera } from './pages/Cartelera';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Header />
        
        {/* El contenedor principal crece para empujar al footer abajo */}
        <main className="flex-grow-1 py-4">
          <Routes>
            {/* RUTA PÚBLICA */}
            <Route path="/login" element={<Login />} />

            {/* RUTA PRINCIPAL (HOME): Ahora "/" carga Home directamente */}
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />

            {/* OTRAS RUTAS PROTEGIDAS */}
            <Route path="/cartelera" element={
              <PrivateRoute>
                <Cartelera />
              </PrivateRoute>
            } />

            {/* COMODÍN: Si el usuario escribe cualquier cosa mal, lo manda a la Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export { App };