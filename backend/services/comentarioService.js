import Comentario from '../models/Comentario.js';

export const obtenerComentarios = async (id) => await Comentario.getByPelicula(id);