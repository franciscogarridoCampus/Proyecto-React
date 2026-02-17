import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPost } from '../services/usuarioService';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // Nuevo estado para el mensaje de error
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiamos el error al intentar de nuevo

        try {
            // Enviamos email y contrasena (asegúrate que coincida con tu backend)
            const data = await loginPost(email, pass);
            
            if (data) {
                localStorage.setItem('usuarioLogueado', JSON.stringify(data));
                window.location.href = "/"; 
            }
        } catch (err) {
            // En lugar de alert, guardamos el mensaje en el estado
            setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} className="col-md-4 card p-4 shadow border-primary">
                    <h3 className="text-center mb-4 text-primary fw-bold">Acceso Usuarios</h3>
                    
                    {/* Mensaje de error condicional */}
                    {error && (
                        <div className="alert alert-danger py-2 text-center" role="alert" style={{ fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Email</label>
                        <input 
                            type="email" 
                            className={`form-control ${error ? 'is-invalid' : ''}`} 
                            placeholder="ejemplo@cine.com" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold">Contraseña</label>
                        <input 
                            type="password" 
                            className={`form-control ${error ? 'is-invalid' : ''}`} 
                            placeholder="********" 
                            onChange={e => setPass(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className="btn btn-primary w-100 fw-bold mt-2">ENTRAR</button>
                </form>
            </div>
        </div>
    );
}

export { Login };