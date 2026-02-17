import * as generoService from '../services/generoService.js';

export const getGeneros = async (req, res) => {
    try {
        const data = await generoService.listarGeneros();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postGenero = async (req, res) => {
    try {
        const { nombre } = req.body;
        const id = await generoService.añadirGenero(nombre);
        res.status(201).json({ mensaje: "Género creado", id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};