import * as peliculaService from '../services/peliculaService.js';

export const getPeliculas = async (req, res) => {
    try {
        const data = await peliculaService.listarPeliculas();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPeliculaPorId = async (req, res) => {
    try {
        const data = await peliculaService.detallePelicula(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: "No encontrado" });
    }
};