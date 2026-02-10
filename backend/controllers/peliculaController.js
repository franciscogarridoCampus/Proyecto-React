import * as peliculaService from "../services/peliculaService.js";

export const crear = async (req, res) => {
  try {
    const peli = await peliculaService.crearPelicula(req.body);
    res.status(201).json(peli);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listar = async (req, res) => {
  const peliculas = await peliculaService.obtenerPeliculas();
  res.json(peliculas);
};

export const detalle = async (req, res) => {
  const peli = await peliculaService.obtenerPeliculaPorId(req.params.id);
  if (!peli) return res.status(404).json({ msg: "No encontrada" });
  res.json(peli);
};

export const actualizar = async (req, res) => {
  await peliculaService.actualizarPelicula(req.params.id, req.body);
  res.json({ msg: "Actualizada correctamente" });
};

export const eliminar = async (req, res) => {
  await peliculaService.eliminarPelicula(req.params.id);
  res.json({ msg: "Eliminada correctamente" });
};
