import * as comentarioService from '../services/comentarioService.js';

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
        // Ajustamos para que coincida con el objeto que manda el Front
        const { id_pelicula, id_usuario, contenido } = req.body;
        
        // Validación básica de seguridad
        if (!id_pelicula || !id_usuario || !contenido) {
            return res.status(400).json({ error: "Faltan campos obligatorios (id_pelicula, id_usuario o contenido)" });
        }

        const datosParaDB = {
            id_pelicula,
            id_usuario,
            contenido
        };

        await comentarioService.guardarComentario(datosParaDB);
        res.status(201).json({ mensaje: "Comentario añadido correctamente" });
    } catch (err) {
        console.error("Error en crearComentario:", err);
        res.status(500).json({ error: err.message });
    }
};