import express from 'express';
import * as peliculaController from '../controllers/peliculaController.js';

const router = express.Router();
router.get('/', peliculaController.getPeliculas);
router.get('/:id', peliculaController.getPeliculaPorId);

export default router;