import Pelicula from '../models/Pelicula.js';

export const listarPeliculas = async () => await Pelicula.getAll();
export const detallePelicula = async (id) => await Pelicula.getById(id);