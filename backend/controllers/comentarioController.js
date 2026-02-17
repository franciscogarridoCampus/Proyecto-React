import * as comentarioService from '../services/comentarioService.js';

export const getComentarios = async (req, res) => {
    try {
        const data = await comentarioService.obtenerComentarios(req.params.idTitulo);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};