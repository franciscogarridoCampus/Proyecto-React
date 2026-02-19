import { useState } from 'react';
import clienteAxios from '../api/axios';

export function useAuth() {
    const [user] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')));
    const isLogged = !!user;

    const verificarPassword = async (passwordInput) => {
        try {
            const res = await clienteAxios.post('/usuarios/validar-password', {
                email: user.email,
                contrasena: passwordInput
            });
            return res.data.valido;
        } catch (error) {
            console.error("Error validando password", error);
            return false;
        }
    };

    return { user, isLogged, verificarPassword };
}