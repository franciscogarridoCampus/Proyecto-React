import express from 'express';
import * as peliculaController from '../controllers/peliculaController.js';

const router = express.Router();

// Obtener todas y una específica
router.get('/', peliculaController.getPeliculas);
router.get('/:id', peliculaController.getPeliculaPorId);

// Gestión de Admin
router.post('/', peliculaController.crearPelicula);        // Crear
router.put('/:id', peliculaController.actualizarPelicula);  // Editar
router.delete('/:id', peliculaController.eliminarPelicula); // Eliminar

export default router;