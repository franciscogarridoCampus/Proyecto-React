import React from 'react';
import './ConfirmarSalida.css';

const ConfirmarSalida = ({ mostrar, alGuardar, alSalirSinGuardar, alCancelar }) => {
    if (!mostrar) return null;

    return (
        <div className="salida-overlay animate__animated animate__fadeIn">
            <div className="salida-card bg-dark text-white border border-secondary shadow-lg">
                <div className="p-4 text-center">
                    <div className="salida-icon mb-3">
                        <i className="bi bi-floppy-fill text-warning"></i>
                    </div>
                    <h3 className="fw-bold mb-3">Cambios sin guardar</h3>
                    <p className="text-secondary">
                        Has realizado cambios en la cartelera. ¿Qué deseas hacer antes de salir?
                    </p>
                    
                    <div className="d-grid gap-2 mt-4">
                        <button 
                            className="btn btn-warning fw-bold rounded-pill py-2" 
                            onClick={alGuardar}
                        >
                            GUARDAR Y VOLVER
                        </button>
                        <button 
                            className="btn btn-outline-danger fw-bold rounded-pill py-2" 
                            onClick={alSalirSinGuardar}
                        >
                            SALIR SIN GUARDAR
                        </button>
                        <button 
                            className="btn btn-outline-light fw-bold rounded-pill py-2" 
                            onClick={alCancelar}
                        >
                            CANCELAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmarSalida;