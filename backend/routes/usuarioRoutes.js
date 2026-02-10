import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/registro", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.get("/", usuarioController.listarUsuarios);

export default router;
