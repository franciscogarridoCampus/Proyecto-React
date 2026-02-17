import express from 'express';
// Importamos las funciones específicas del controlador
import { login, register } from '../controllers/usuarioController.js';

const router = express.Router();

// Definimos las rutas y les asignamos su función correspondiente
router.post('/login', login);
router.post('/registro', register); // Ahora ya no dará error porque 'register' existe

export default router;