import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation
import { loginPost } from '../services/usuarioService';
import FormLogin from '../componentes/FormLogin/FormLogin';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    
    const location = useLocation();
    // Obtenemos el mensaje de éxito si existe en el estado de la navegación
    const mensajeExito = location.state?.mensajeExito;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const data = await loginPost(email, pass);
            if (data) {
                localStorage.setItem('usuarioLogueado', JSON.stringify(data));
                window.location.href = "/"; 
            }
        } catch (err) {
            setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
        }
    };

    return (
        <FormLogin 
            setEmail={setEmail} 
            setPass={setPass} 
            handleSubmit={handleSubmit} 
            error={error} 
            mensajeExito={mensajeExito} // Pasamos el nuevo parámetro
        />
    );
}

export { Login };