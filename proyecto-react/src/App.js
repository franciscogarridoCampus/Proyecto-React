import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';
import { Home } from './pages/Home';
import { Axio } from './componentes/Axio/Axio';

function Contenedor(props) {
  return (
    <div style={{ border: '2px solid #000', padding: '10px', margin: '20px 0' }}>
      <h3>Contenedor</h3>
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />

      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
      </main>

      <Contenedor>
        <p>Contenido de prueba dentro del contenedor.</p>
        <button>Click aquí</button>
        <p>Más texto de ejemplo.</p>
      </Contenedor>

      <Footer />

      <Axio />
    </Router>
  );
}

export { App, Contenedor };
