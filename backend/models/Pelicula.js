import db from '../config/db.js';

const Pelicula = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM titulos');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM titulos WHERE id = ?', [id]);
        return rows[0];
    }
};
export default Pelicula;