import db from '../config/db.js';

export const obtenerComentarios = async (idPelicula) => {
    const query = `
        SELECT 
            c.id, 
            c.id_pelicula, 
            c.id_usuario, 
            c.contenido AS texto,
            c.creado_en AS fecha,
            u.nombre_usuario 
        FROM comentarios c 
        JOIN usuarios u ON c.id_usuario = u.id 
        WHERE c.id_pelicula = ? 
        ORDER BY c.creado_en DESC`;
    const [rows] = await db.query(query, [idPelicula]);
    return rows;
};

export const guardarComentario = async (datos) => {
    const { id_pelicula, id_usuario, contenido } = datos;
    const query = `INSERT INTO comentarios (id_pelicula, id_usuario, contenido) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [id_pelicula, id_usuario, contenido]);
    return result;
};