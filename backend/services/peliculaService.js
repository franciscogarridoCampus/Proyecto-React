import { Pelicula, Genero } from "../models/Pelicula.js";

export const crearPelicula = (data) => Pelicula.create(data);

export const obtenerPeliculas = () => Pelicula.findAll({ include: Genero });

export const obtenerPeliculaPorId = (id) => Pelicula.findByPk(id, { include: Genero });

export const actualizarPelicula = (id, data) => Pelicula.update(data, { where: { id } });

export const eliminarPelicula = (id) => Pelicula.destroy({ where: { id } });
