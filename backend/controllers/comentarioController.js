import * as comentarioService from "../services/comentarioService.js";

export const crear = async (req, res) => {
  try {
    const comentario = await comentarioService.crearComentario(req.body);
    res.status(201).json(comentario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listarPorPelicula = async (req, res) => {
  const comentarios = await comentarioService.obtenerComentariosPorPelicula(req.params.peliculaId);
  res.json(comentarios);
};

export const eliminar = async (req, res) => {
  await comentarioService.eliminarComentario(req.params.id);
  res.json({ msg: "Comentario eliminado" });
};
