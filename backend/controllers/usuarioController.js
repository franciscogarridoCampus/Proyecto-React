import * as usuarioService from '../services/usuarioService.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await Usuario.getByEmail(email);
        
        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparación segura con Bcrypt
        const coinciden = await bcrypt.compare(contrasena, usuario.contrasena);

        if (coinciden) {
            return res.json({
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario,
                email: usuario.email,
                rol: usuario.rol
            });
        } else {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const register = async (req, res) => {
    try {
        const { nombre_usuario, email, contrasena } = req.body;
        
        // Verificamos si ya existe el email
        const existe = await Usuario.getByEmail(email);
        if (existe) {
            return res.status(400).json({ mensaje: "El email ya está registrado" });
        }

        // Usamos el service que ya encripta la contraseña
        const nuevoId = await usuarioService.registrarUsuario({ 
            nombre_usuario, 
            email, 
            contrasena 
        });

        res.status(201).json({ 
            mensaje: "Usuario creado con éxito", 
            id: nuevoId 
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al registrar: " + err.message });
    }
};

export const validarPass = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await Usuario.getByEmail(email);
        if (usuario) {
            const valido = await bcrypt.compare(contrasena, usuario.contrasena);
            res.json({ valido });
        } else {
            res.json({ valido: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};