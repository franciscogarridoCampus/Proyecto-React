import React from 'react';
import './EliminarPeli.css';

const EliminarPeli = ({ mostrar, nombrePeli, alConfirmar, alCancelar }) => {
    if (!mostrar) return null;

    return (
        <div className="eliminar-peli-overlay animate__animated animate__fadeIn">
            <div className="eliminar-peli-card bg-dark text-white border border-secondary shadow-lg">
                <div className="p-4 text-center">
                    <div className="eliminar-peli-icon mb-3">
                        <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                    </div>
                    <h3 className="fw-bold mb-3">¿Eliminar Película?</h3>
                    <p className="text-secondary">
                        Estás a punto de borrar <span className="text-white fw-bold">"{nombrePeli}"</span>. 
                        Esta acción no se puede deshacer.
                    </p>
                    <div className="d-flex gap-3 justify-content-center mt-4">
                        <button className="btn btn-outline-light px-4 rounded-pill fw-bold" onClick={alCancelar}>
                            CANCELAR
                        </button>
                        <button className="btn btn-danger px-4 rounded-pill fw-bold shadow-sm" onClick={alConfirmar}>
                            ELIMINAR AHORA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliminarPeli;