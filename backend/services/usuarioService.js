import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return Usuario.create({ ...data, password: hashed });
};

export const obtenerUsuarios = () => Usuario.findAll();

export const obtenerUsuarioPorId = (id) => Usuario.findByPk(id);

export const actualizarUsuario = (id, data) => Usuario.update(data, { where: { id } });

export const eliminarUsuario = (id) => Usuario.destroy({ where: { id } });

export const validarLogin = async (correo, password) => {
  const user = await Usuario.findOne({ where: { correo } });
  if (!user) return null;
  const valido = await bcrypt.compare(password, user.password);
  return valido ? user : null;
};
