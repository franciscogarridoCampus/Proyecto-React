import db from '../config/db.js'; // Asegúrate de que esta ruta a tu conexión sea correcta

// CONTROLADOR DE LOGIN
export const login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        // 1. Buscamos al usuario por email en la base de datos
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = rows[0];

        // 2. COMPARACIÓN DIRECTA (Texto plano para que coincida con admin123)
        if (contrasena === usuario.contrasena) {
            // ÉXITO: Enviamos los datos que React guardará en el localStorage
            return res.json({
                id: usuario.id,
                nombre: usuario.nombre_usuario,
                rol: usuario.rol
            });
        } else {
            // FALLO: La contraseña no coincide
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// CONTROLADOR DE REGISTRO (Añadido para evitar errores en las rutas)
export const register = async (req, res) => {
    try {
        res.status(200).json({ mensaje: "Función de registro lista para implementar" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar" });
    }
};