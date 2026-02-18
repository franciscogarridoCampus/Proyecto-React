import express from 'express';
import { login, register, validarPass } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', login);
router.post('/registro', register);
router.post('/validar-password', validarPass); // Nueva ruta

export default router;