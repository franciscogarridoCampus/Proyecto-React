import express from "express";
import * as comentarioController from "../controllers/comentarioController.js";

const router = express.Router();

router.post("/", comentarioController.crear);
router.get("/pelicula/:peliculaId", comentarioController.listarPorPelicula);
router.delete("/:id", comentarioController.eliminar);

export default router;
