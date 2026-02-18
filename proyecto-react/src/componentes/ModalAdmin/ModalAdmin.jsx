import React, { useState } from 'react';
import './ModalAdmin.css';

function ModalAdmin({ isOpen, onClose, onConfirm, nombreUsuario }) {
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(password);
        setPassword(""); // Limpiar al enviar
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
                    <div className="form-group mb-4">
                        <label className="form-label text-start d-block small">Contraseña de administrador:</label>
                        <input 
                            type="password" 
                            className="form-control bg-dark text-white border-secondary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoFocus
                            required
                        />
                    </div>
                    
                    <div className="d-flex gap-2">
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