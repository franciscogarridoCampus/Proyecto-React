import express from 'express'; // <--- Aquí estaba el error
import * as comentarioController from '../controllers/comentarioController.js';

const router = express.Router();

router.get('/:idTitulo', comentarioController.getComentarios);

export default router;