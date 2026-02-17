import db from '../config/db.js';

const Usuario = {
    crear: async (datos) => {
        const { nombre_usuario, email, contrasena } = datos;
        const [res] = await db.query(
            'INSERT INTO usuarios (nombre_usuario, email, contrasena) VALUES (?, ?, ?)',
            [nombre_usuario, email, contrasena]
        );
        return res.insertId;
    },
    getByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }
};
export default Usuario;