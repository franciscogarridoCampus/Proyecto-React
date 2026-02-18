import db from '../config/db.js';

export const login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = rows[0];

        // Comparación (Usando texto plano según tu código actual)
        if (contrasena === usuario.contrasena) {
            return res.json({
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario, // Nombre correcto para el frontend
                email: usuario.email,
                rol: usuario.rol
            });
        } else {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Nueva función para validar la contraseña al pulsar Gestionar
export const validarPass = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?', 
            [email, contrasena]
        );
        
        if (rows.length > 0) {
            res.json({ valido: true });
        } else {
            res.json({ valido: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    res.status(200).json({ mensaje: "Función de registro lista" });
};