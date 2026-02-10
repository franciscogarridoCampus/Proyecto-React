import * as usuarioService from "../services/usuarioService.js";

export const registrar = async (req, res) => {
  try {
    const user = await usuarioService.crearUsuario(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
  const user = await usuarioService.validarLogin(correo, password);
  if (!user) return res.status(401).json({ msg: "Credenciales inválidas" });
  res.json(user);
};

export const listarUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.json(users);
};
