import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuarioRoutes from './routes/usuarioRoutes.js';
import peliculaRoutes from './routes/peliculaRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';
import generoRoutes from './routes/generoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/generos', generoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor Cine-App corriendo en: http://localhost:${PORT}`);
});