import clienteAxios from '../api/axios.js';

export const obtenerPeliculas = async () => {
    const res = await clienteAxios.get('/peliculas');
    return res.data;
};

export const obtenerPeliculaPorId = async (id) => {
    const res = await clienteAxios.get(`/peliculas/${id}`);
    return res.data;
};

export const guardarPelicula = async (datosPelicula) => {
    const res = await clienteAxios.post('/peliculas', datosPelicula);
    return res.data;
};

export const obtenerGeneros = async () => {
    const res = await clienteAxios.get('/generos');
    return res.data;
};

export const guardarComentario = async (datosComentario) => {
    const res = await clienteAxios.post('/comentarios', datosComentario);
    return res.data;
};

// --- ACTUALIZADO PARA USAR CLIENTEAXIOS ---
export const eliminarPelicula = async (id) => {
    try {
        const res = await clienteAxios.delete(`/peliculas/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error en eliminarPelicula service:", error);
        throw error;
    }
};

export const actualizarPelicula = async (id, datosActualizados) => {
    try {
        const res = await clienteAxios.put(`/peliculas/${id}`, datosActualizados);
        return res.data;
    } catch (error) {
        console.error("Error en actualizarPelicula service:", error);
        throw error;
    }
};