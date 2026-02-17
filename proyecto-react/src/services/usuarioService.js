// src/services/usuarioService.js
import clienteAxios from '../api/axios.js';

export const loginPost = async (email, contrasena) => {
    try {
        const res = await clienteAxios.post('/usuarios/login', { email, contrasena });
        return res.data;
    } catch (error) {
        // Esto te dirá en la consola de Chrome (F12) qué dice el servidor
        if (error.response) {
            console.error("Error del servidor:", error.response.data.mensaje);
        } else {
            console.error("Error de conexión: El servidor no responde");
        }
        throw error;
    }
};