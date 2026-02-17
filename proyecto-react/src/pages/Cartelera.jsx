import React, { useEffect, useState } from 'react';
import { obtenerPeliculas } from '../services/peliculaService';

function Cartelera() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await obtenerPeliculas();
                setPeliculas(data);
            } catch (error) {
                console.error("Error cargando cartelera", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, []);

    if (cargando) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Conectando con el servidor...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 border-bottom pb-2">Nuestra Cartelera</h2>
            <div className="row">
                {peliculas.length > 0 ? (
                    peliculas.map((p) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={p.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img 
                                    src={p.url_poster || 'https://via.placeholder.com/300x450?text=Sin+Poster'} 
                                    className="card-img-top" 
                                    alt={p.titulo}
                                    style={{ height: '350px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className={`badge ${p.tipo === 'película' ? 'bg-primary' : 'bg-success'}`}>
                                            {p.tipo.toUpperCase()}
                                        </span>
                                    </div>
                                    <h6 className="card-title fw-bold text-dark">{p.titulo}</h6>
                                    <p className="card-text text-muted small" style={{ minHeight: '40px' }}>
                                        {p.descripcion ? p.descripcion.substring(0, 80) + '...' : 'Sin descripción.'}
                                    </p>
                                </div>
                                <div className="card-footer bg-white border-top-0 pb-3">
                                    <button className="btn btn-outline-primary btn-sm w-100 fw-bold">
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="alert alert-warning">No hay películas registradas en la base de datos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export { Cartelera };