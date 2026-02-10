import { Comentario } from "../models/Comentario.js";

export const crearComentario = (data) => Comentario.create(data);

export const obtenerComentariosPorPelicula = (peliculaId) => 
  Comentario.findAll({ where: { peliculaId } });

export const eliminarComentario = (id) => Comentario.destroy({ where: { id } });
