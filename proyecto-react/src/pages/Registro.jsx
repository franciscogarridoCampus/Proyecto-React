import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registroPost } from '../services/usuarioService';
import FormRegister from '../componentes/FormRegister/FormRegister';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación manual adicional (aunque el 'required' del HTML ayuda)
        if (!nombre || !email || !pass) {
            setError('Por favor, rellena todos los campos.');
            return;
        }

        setError('');
        setCargando(true);

        try {
            await registroPost(nombre, email, pass);
            // Redirigimos al login enviando un mensaje de éxito en el estado
            navigate('/login', { state: { mensajeExito: "¡Cuenta creada perfectamente! Ya puedes iniciar sesión." } });
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al conectar con el servidor');
        } finally {
            setCargando(false);
        }
    };

    return (
        <FormRegister 
            setNombre={setNombre}
            setEmail={setEmail}
            setPass={setPass}
            handleSubmit={handleSubmit}
            error={error}
            cargando={cargando}
        />
    );
}

export { Registro };