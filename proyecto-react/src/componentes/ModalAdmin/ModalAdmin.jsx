import React, { useState, useEffect } from 'react';
import './ModalAdmin.css';

function ModalAdmin({ isOpen, onClose, onConfirm, nombreUsuario }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // Limpiar el estado cuando el modal se cierra o abre
    useEffect(() => {
        if (!isOpen) {
            setPassword("");
            setError(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false); // Resetear error antes de intentar
        
        // Esperamos la respuesta de Cartelera.jsx
        const esExitoso = await onConfirm(password);
        
        if (!esExitoso) {
            setError(true);
            setPassword(""); // Limpiamos el input para que reintente
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate__animated animate__zoomIn">
                <div className="modal-header-admin">
                    <i className="bi bi-shield-lock-fill fs-2 text-danger"></i>
                    <h4 className="mt-2">Confirmar Identidad</h4>
                    <p className="text-white-50 small">Hola, <strong>{nombreUsuario}</strong></p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group mb-3">
                        <label className="form-label text-start d-block small">Contraseña de administrador:</label>
                        <input 
                            type="password" 
                            className={`form-control bg-dark text-white ${error ? 'border-danger animate__animated animate__shakeX' : 'border-secondary'}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError(false); // Quitar el rojo mientras escribe
                            }}
                            placeholder="••••••••"
                            autoFocus
                            required
                        />
                        
                        {/* Mensaje de error interno en lugar de alert */}
                        {error && (
                            <div className="text-danger small mt-2 d-flex align-items-center justify-content-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Contraseña incorrecta. Inténtalo de nuevo.
                            </div>
                        )}
                    </div>
                    
                    <div className="d-flex gap-2 mt-4">
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary w-100 fw-bold">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-danger w-100 fw-bold">
                            Acceder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAdmin;