import express from "express";
import * as peliculaController from "../controllers/peliculaController.js";

const router = express.Router();

router.post("/", peliculaController.crear);
router.get("/", peliculaController.listar);
router.get("/:id", peliculaController.detalle);
router.put("/:id", peliculaController.actualizar);
router.delete("/:id", peliculaController.eliminar);

export default router;
