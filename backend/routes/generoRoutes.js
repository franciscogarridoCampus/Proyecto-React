import express from 'express';
import * as generoController from '../controllers/generoController.js';

const router = express.Router();

// GET http://localhost:3000/api/generos
router.get('/', generoController.getGeneros);

// POST http://localhost:3000/api/generos (Solo para el Admin)
router.post('/', generoController.postGenero);

export default router;