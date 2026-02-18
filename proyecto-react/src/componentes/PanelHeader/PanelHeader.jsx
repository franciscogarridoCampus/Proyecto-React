import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelHeader.css';

const PanelHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="panel-header-container alert shadow-lg d-flex justify-content-between align-items-center p-4 mb-5 animate__animated animate__fadeInDown">
            <div className="d-flex align-items-center gap-3">
                <div className="icon-badge">
                    <i className="bi bi-person-badge-fill text-dark fs-3"></i>
                </div>
                <div>
                    <h2 className="m-0 text-warning fw-extrabold tracking-tight">PANEL DE CONTROL</h2>
                    <p className="m-0 small text-light opacity-50 text-uppercase letter-spacing-1">
                        Gestión de base de datos y cartelera activa
                    </p>
                </div>
            </div>

            <div className="d-flex gap-2">
                <button 
                    className="btn btn-panel-secondary" 
                    onClick={() => navigate('/cartelera')}
                >
                    <i className="bi bi-arrow-left-short fs-5"></i> 
                    <span>Volver</span>
                </button>
                
                <button 
                    className="btn btn-panel-primary" 
                    onClick={() => navigate('/admin-cartelera/nueva')}
                >
                    <i className="bi bi-plus-lg"></i>
                    <span>Nueva Película</span>
                </button>
            </div>
        </div>
    );
};

export default PanelHeader;