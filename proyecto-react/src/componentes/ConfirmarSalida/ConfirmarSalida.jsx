import React from 'react';
import './ConfirmarSalida.css';

const ConfirmarSalida = ({ mostrar, alGuardar, alSalirSinGuardar, alCancelar }) => {
    if (!mostrar) return null;

    return (
        <div className="salida-overlay animate__animated animate__fadeIn">
            <div className="salida-card bg-dark text-white border border-secondary shadow-lg">
                <div className="p-4 text-center">
                    <div className="salida-icon mb-3">
                        <i className="bi bi-exclamation-circle-fill text-warning"></i>
                    </div>
                    <h3 className="fw-bold mb-3">Cambios sin guardar</h3>
                    <p className="text-secondary">
                        Has realizado cambios locales que no están en la base de datos. 
                        ¿Qué deseas hacer antes de salir?
                    </p>
                    
                    <div className="d-grid gap-2 mt-4">
                        {/* BOTÓN 1: Guarda todo en MySQL y te lleva a la cartelera */}
                        <button 
                            className="btn btn-warning fw-bold rounded-pill py-2 shadow-sm" 
                            onClick={alGuardar}
                        >
                            <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                            GUARDAR Y VOLVER
                        </button>

                        {/* BOTÓN 2: Borra los cambios de la memoria y sale */}
                        <button 
                            className="btn btn-outline-danger fw-bold rounded-pill py-2" 
                            onClick={alSalirSinGuardar}
                        >
                            <i className="bi bi-trash3 me-2"></i>
                            SALIR SIN GUARDAR
                        </button>

                        {/* BOTÓN 3: Cierra la ventanita y te deja donde estabas */}
                        <button 
                            className="btn btn-link text-white-50 fw-bold text-decoration-none mt-2" 
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