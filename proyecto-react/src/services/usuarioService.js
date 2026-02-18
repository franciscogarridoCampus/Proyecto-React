import clienteAxios from '../api/axios.js';

export const loginPost = async (email, contrasena) => {
    try {
        const res = await clienteAxios.post('/usuarios/login', { email, contrasena });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const registroPost = async (nombre_usuario, email, contrasena) => {
    try {
        // Coincide con router.post('/registro', register) de tu usaurioRoute.js
        const res = await clienteAxios.post('/usuarios/registro', { 
            nombre_usuario, 
            email, 
            contrasena 
        });
        return res.data;
    } catch (error) {
        console.error("Error en registro:", error.response?.data || error.message);
        throw error;
    }
};