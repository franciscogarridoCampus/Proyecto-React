import express from "express";
import { sequelize } from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import peliculaRoutes from "./routes/peliculaRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";

const app = express();
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/peliculas", peliculaRoutes);
app.use("/api/comentarios", comentarioRoutes);

// Sincronizar DB y levantar servidor
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(" Tablas sincronizadas correctamente");
    app.listen(3001, () => console.log(" Servidor corriendo en http://localhost:3001"));
  } catch (err) {
    console.error(" Error al sincronizar tablas:", err);
  }
})();
