import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa Bootstrap primero para que tus estilos (index.css) puedan sobrescribirlo si quieres
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import { App } from './App'; // Si App.js usa export { App }, esto es correcto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App /> 
);