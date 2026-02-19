import Usuario from '../models/Usuario.js';

export const registrarUsuario = async (datos) => {
    // Ya no encriptamos, guardamos la contraseña tal cual llega
    return await Usuario.crear(datos);
};

export const autenticarUsuario = async (email, password) => {
    const usuario = await Usuario.getByEmail(email);
    if (!usuario) throw new Error("Email no encontrado");
    
    // Comparación de texto plano
    if (password !== usuario.contrasena) throw new Error("Contraseña incorrecta");
    
    return usuario;
};