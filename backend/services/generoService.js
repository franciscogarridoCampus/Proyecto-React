import Genero from '../models/Genero.js';

export const listarGeneros = async () => {
    return await Genero.getAll();
};

export const añadirGenero = async (nombre) => {
    if (!nombre) throw new Error("El nombre del género es obligatorio");
    return await Genero.crear(nombre);
};