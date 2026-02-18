import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa Bootstrap primero
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importa los iconos de Bootstrap después del CSS de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App /> 
);