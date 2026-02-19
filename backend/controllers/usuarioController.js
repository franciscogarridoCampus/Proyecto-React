import * as usuarioService from '../services/usuarioService.js';
import Usuario from '../models/Usuario.js'; 

export const login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await Usuario.getByEmail(email);
        
        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        // COMPARACIÓN SIMPLE DE TEXTO (Sin Bcrypt)
        if (contrasena === usuario.contrasena) {
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
        
        const existe = await Usuario.getByEmail(email);
        if (existe) {
            return res.status(400).json({ mensaje: "El email ya está registrado" });
        }

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
            // Validación de texto simple
            const valido = (contrasena === usuario.contrasena);
            res.json({ valido });
        } else {
            res.json({ valido: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};