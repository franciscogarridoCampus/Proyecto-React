import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPeliculas } from '../services/peliculaService';

function Home() {
    const navigate = useNavigate();
    const [destacados, setDestacados] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargando, setCargando] = useState(true);
    
    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const nombreUsuario = user?.nombre_usuario || user?.nombre || 'Usuario';

    useEffect(() => {
        const cargarDatosYOrdenar = async () => {
            try {
                const data = await obtenerPeliculas();
                
                // LÓGICA DE ORDENACIÓN:
                // Ordenamos por ID de mayor a menor (las más nuevas primero)
                // y nos quedamos con las primeras 3.
                const ordenadas = data
                    .sort((a, b) => b.id - a.id) 
                    .slice(0, 3); 

                setDestacados(ordenadas);
            } catch (error) {
                console.error("Error cargando destacados", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatosYOrdenar();
    }, []);

    // Navegación del Slider
    const siguientePeli = () => {
        setIndiceActual((prev) => (prev === destacados.length - 1 ? 0 : prev + 1));
    };

    const anteriorPeli = () => {
        setIndiceActual((prev) => (prev === 0 ? destacados.length - 1 : prev - 1));
    };

    if (cargando) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="spinner-border text-info" role="status"></div>
        </div>
    );

    return (
        <div className="container mt-4 animate__animated animate__fadeIn">
            {/* Banner de Bienvenida */}
            <div className="bg-dark text-white p-5 rounded-4 shadow-lg mb-5 border border-secondary border-opacity-25">
                <h1 className="display-4 fw-bold mb-3">
                    Bienvenido, <span className="text-info">{nombreUsuario}</span>
                </h1>
                <p className="lead text-secondary">
                    Descubre las últimas historias añadidas a nuestra colección.
                </p>
            </div>

            <h3 className="text-white mb-4 fw-bold">
                <i className="bi bi-clock-history text-info me-2"></i> Recién Añadidas
            </h3>

            {/* Slider Dinámico */}
            <div className="position-relative mb-5 bg-dark rounded-4 shadow-2xl overflow-hidden border border-secondary border-opacity-50">
                {destacados.length > 0 ? (
                    <>
                        {/* Controles laterales (Flechas) */}
                        <button 
                            className="btn position-absolute start-0 top-50 translate-middle-y z-3 text-white fs-1 px-4 h-100"
                            onClick={anteriorPeli}
                            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9), transparent)', border: 'none' }}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>

                        <div className="row g-0 align-items-center animate__animated animate__fadeIn" key={destacados[indiceActual].id}>
                            <div className="col-md-7">
                                <img 
                                    src={destacados[indiceActual].url_poster} 
                                    alt={destacados[indiceActual].titulo}
                                    className="img-fluid w-100"
                                    style={{ height: '500px', objectFit: 'cover', maskImage: 'linear-gradient(to right, black 80%, transparent)' }}
                                />
                            </div>
                            <div className="col-md-5 p-5 text-white">
                                <span className="badge bg-info mb-3 px-3 py-2">NUEVA EN CARTELERA</span>
                                <h2 className="display-5 fw-bold mb-3">{destacados[indiceActual].titulo}</h2>
                                <p className="text-secondary fs-5 mb-4" style={{ display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {destacados[indiceActual].sinopsis || "Sin descripción disponible."}
                                </p>
                                <button 
                                    className="btn btn-info btn-lg px-5 fw-bold rounded-pill text-dark"
                                    onClick={() => navigate(`/pelicula/${destacados[indiceActual].id}`)}
                                >
                                    SABER MÁS
                                </button>
                            </div>
                        </div>

                        <button 
                            className="btn position-absolute end-0 top-50 translate-middle-y z-3 text-white fs-1 px-4 h-100"
                            onClick={siguientePeli}
                            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.9), transparent)', border: 'none' }}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>

                        {/* Indicador de posición (Puntitos) */}
                        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                            {destacados.map((_, i) => (
                                <div 
                                    key={i}
                                    className={`rounded-circle ${i === indiceActual ? 'bg-info' : 'bg-secondary'}`}
                                    style={{ width: '10px', height: '10px', transition: '0.3s' }}
                                ></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="p-5 text-center text-muted">Aún no hay películas en la cartelera.</div>
                )}
            </div>

            {/* Sección de Próximamente (Vacía) */}
            <div className="text-center py-5 border-top border-secondary border-opacity-25">
                <h4 className="text-uppercase tracking-widest text-secondary fw-light">Próximamente</h4>
                <div className="mt-3 opacity-25">
                    <i className="bi bi-three-dots fs-1 text-white"></i>
                </div>
            </div>
        </div>
    );
}

export { Home };