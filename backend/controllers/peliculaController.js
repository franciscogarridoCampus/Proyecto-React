import db from '../config/db.js';
import * as peliculaService from '../services/peliculaService.js';
import * as comentarioService from '../services/comentarioService.js';

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
        const { id } = req.params;
        const pelicula = await peliculaService.detallePelicula(id);
        if (!pelicula) return res.status(404).json({ mensaje: "Película no encontrada" });

        const generos = await peliculaService.obtenerGenerosDePelicula(id);
        const comentarios = await comentarioService.obtenerComentarios(id);

        res.json({ ...pelicula, generos, comentarios });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crearPelicula = async (req, res) => {
    const { titulo, descripcion, fecha_estreno, url_poster, creado_por, generos } = req.body;
    try {
        await db.query('START TRANSACTION');
        const queryPeli = `INSERT INTO peliculas (titulo, descripcion, fecha_estreno, url_poster, creado_por) VALUES (?, ?, ?, ?, ?)`;
        const [resultPeli] = await db.query(queryPeli, [titulo, descripcion, fecha_estreno, url_poster, creado_por]);
        const idPelicula = resultPeli.insertId;

        if (generos && generos.length > 0) {
            const valuesGeneros = generos.map(id_gen => [idPelicula, id_gen]);
            await db.query('INSERT INTO peliculas_generos (id_pelicula, id_genero) VALUES ?', [valuesGeneros]);
        }
        await db.query('COMMIT');
        res.status(201).json({ mensaje: "Película creada", id: idPelicula });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

// --- FUNCIÓN ACTUALIZAR ---
export const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_estreno, url_poster, generos } = req.body;
    try {
        await db.query('START TRANSACTION');
        // Actualizar datos básicos
        const sqlPeli = `UPDATE peliculas SET titulo=?, descripcion=?, fecha_estreno=?, url_poster=? WHERE id=?`;
        await db.query(sqlPeli, [titulo, descripcion, fecha_estreno, url_poster, id]);

        // Actualizar géneros: Borramos actuales e insertamos nuevos
        await db.query('DELETE FROM peliculas_generos WHERE id_pelicula = ?', [id]);
        if (generos && generos.length > 0) {
            const valuesGeneros = generos.map(id_gen => [id, id_gen]);
            await db.query('INSERT INTO peliculas_generos (id_pelicula, id_genero) VALUES ?', [valuesGeneros]);
        }

        await db.query('COMMIT');
        res.json({ mensaje: "Película actualizada correctamente" });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

// --- FUNCIÓN ELIMINAR ---
export const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        // Al borrar la peli, se borran sus géneros por el ON DELETE CASCADE del SQL
        const [result] = await db.query('DELETE FROM peliculas WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "No existe" });
        res.json({ mensaje: "Película eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};