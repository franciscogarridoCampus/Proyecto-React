import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Usuario } from "./Usuario.js";
import { Pelicula } from "./Pelicula.js";

export const Comentario = sequelize.define("Comentario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contenido: { type: DataTypes.TEXT, allowNull: false },
  valoracion: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { timestamps: true });

// Relaciones
Comentario.belongsTo(Usuario, { foreignKey: "usuarioId" });
Comentario.belongsTo(Pelicula, { foreignKey: "peliculaId" });
Usuario.hasMany(Comentario, { foreignKey: "usuarioId" });
Pelicula.hasMany(Comentario, { foreignKey: "peliculaId" });
