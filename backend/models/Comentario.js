import db from '../config/db.js';

const Comentario = {
    getByPelicula: async (id_titulo) => {
        const [rows] = await db.query(
            'SELECT c.*, u.nombre_usuario FROM comentarios c JOIN usuarios u ON c.id_usuario = u.id WHERE id_titulo = ?', 
            [id_titulo]
        );
        return rows;
    }
};
export default Comentario;