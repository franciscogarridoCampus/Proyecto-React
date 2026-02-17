import clienteAxios from '../api/axios.js';

export const obtenerPeliculas = async () => {
    const res = await clienteAxios.get('/peliculas');
    return res.data;
};