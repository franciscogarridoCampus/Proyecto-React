import db from '../config/db.js';

export const listarPeliculas = async () => {
    const [rows] = await db.query('SELECT * FROM peliculas ORDER BY creado_en DESC');
    return rows;
};

export const detallePelicula = async (id) => {
    const [rows] = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
    return rows[0];
};

// Nueva función para traer los nombres de los géneros de una peli
export const obtenerGenerosDePelicula = async (id_pelicula) => {
    const query = `
        SELECT g.nombre 
        FROM generos g
        JOIN peliculas_generos pg ON g.id = pg.id_genero
        WHERE pg.id_pelicula = ?`;
    const [rows] = await db.query(query, [id_pelicula]);
    return rows.map(r => r.nombre);
};