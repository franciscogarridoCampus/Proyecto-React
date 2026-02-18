import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pelicula.css';

const Pelicula = ({ pelicula, esAdmin, alEditar, alEliminar }) => {
    const navigate = useNavigate();

    const irAlDetalle = () => {
        navigate(`/pelicula/${pelicula.id}`);
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div 
                className="card h-100 shadow pelicula-card bg-dark text-white border-0 clickable-card"
                onClick={irAlDetalle}
            >
                <div className="contenedor-poster overflow-hidden position-relative">
                    {pelicula.esBorrador && (
                        <span className="badge bg-danger position-absolute top-0 start-0 m-3 shadow" style={{ zIndex: 10 }}>
                            BORRADOR
                        </span>
                    )}
                    
                    <img 
                        src={pelicula.url_poster} 
                        className="card-img-top img-fluid efecto-zoom" 
                        alt={pelicula.titulo} 
                    />

                    {esAdmin && (
                        <div className="admin-overlay" onClick={(e) => e.stopPropagation()}>
                            <button 
                                onClick={() => alEditar(pelicula)} 
                                className="btn btn-warning btn-admin me-2 shadow"
                                title="Editar"
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button 
                                onClick={() => alEliminar(pelicula.id)} 
                                className="btn btn-danger btn-admin shadow"
                                title="Eliminar"
                            >
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                    )}
                    
                    <div className="poster-gradient"></div>
                </div>

                <div className="card-body d-flex flex-column p-4">
                    <h4 className="card-title text-truncate mb-2 text-warning">{pelicula.titulo}</h4>
                    <p className="card-text text-white-50 small mb-4 descripcion-corta">
                        {pelicula.descripcion}
                    </p>

                    {/* Botón Saber Más Mejorado */}
                    <button 
                        className="btn btn-info mt-auto w-100 fw-bold boton-saber-mas d-flex align-items-center justify-content-center"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            irAlDetalle();
                        }}
                    >
                        <span>Saber más</span>
                        <i className="bi bi-plus-lg ms-2"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Pelicula };