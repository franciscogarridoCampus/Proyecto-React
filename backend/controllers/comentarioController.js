import * as comentarioService from '../services/comentarioService.js';

// ✅ Añadimos esta función que faltaba
export const getComentarios = async (req, res) => {
    try {
        const { idPelicula } = req.params;
        const data = await comentarioService.obtenerComentarios(idPelicula);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crearComentario = async (req, res) => {
    try {
        const { pelicula_id, usuario_id, texto } = req.body;
        
        // Mapeamos los nombres del front a los de la DB
        const datosParaDB = {
            id_pelicula: pelicula_id,
            id_usuario: usuario_id,
            contenido: texto
        };

        await comentarioService.guardarComentario(datosParaDB);
        res.status(201).json({ mensaje: "Comentario añadido" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};