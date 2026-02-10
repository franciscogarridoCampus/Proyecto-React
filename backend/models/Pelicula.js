import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Genero } from "./Genero.js";

export const Pelicula = sequelize.define("Pelicula", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  tipo: { type: DataTypes.ENUM("pelicula","serie"), allowNull: false },
  anio: { type: DataTypes.INTEGER },
}, { timestamps: true });

// Relación Pelicula <-> Genero (muchos a muchos)
Pelicula.belongsToMany(Genero, { through: "PeliculaGenero" });
Genero.belongsToMany(Pelicula, { through: "PeliculaGenero" });
