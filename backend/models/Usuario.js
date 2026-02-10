import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.STRING, allowNull: false, defaultValue: "usuario" },
}, { timestamps: true });
