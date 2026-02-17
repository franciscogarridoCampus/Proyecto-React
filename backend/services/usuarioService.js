import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (datos) => {
    const salt = await bcrypt.genSalt(10);
    datos.contrasena = await bcrypt.hash(datos.contrasena, salt);
    return await Usuario.crear(datos);
};

export const autenticarUsuario = async (email, password) => {
    const usuario = await Usuario.getByEmail(email);
    if (!usuario) throw new Error("Email no encontrado");
    const coinciden = await bcrypt.compare(password, usuario.contrasena);
    if (!coinciden) throw new Error("Contraseña incorrecta");
    return usuario;
};