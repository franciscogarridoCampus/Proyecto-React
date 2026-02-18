import express from 'express';
import * as comentarioController from '../controllers/comentarioController.js';

const router = express.Router();

router.get('/:idPelicula', comentarioController.getComentarios);
router.post('/', comentarioController.crearComentario);

export default router;