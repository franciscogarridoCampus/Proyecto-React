import db from '../config/db.js';

const Genero = {
    // Para que el Admin vea todos los géneros disponibles
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM generos ORDER BY nombre ASC');
        return rows;
    },
    // Por si quieres que el Admin pueda añadir géneros nuevos
    crear: async (nombre) => {
        const [res] = await db.query('INSERT INTO generos (nombre) VALUES (?)', [nombre]);
        return res.insertId;
    }
};

export default Genero;