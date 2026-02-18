import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPeliculaPorId, guardarComentario } from '../services/peliculaService';

const DetallePelicula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pelicula, setPelicula] = useState(null);
    const [comentario, setComentario] = useState("");
    const [comentariosList, setComentariosList] = useState([]);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const data = await obtenerPeliculaPorId(id);
                if (data) {
                    setPelicula(data);
                    setComentariosList(data.comentarios || []);
                }
            } catch (err) {
                console.error("Error al cargar la película:", err);
                setError("No se pudo cargar la información de la película.");
            }
        };
        cargarDetalle();
    }, [id]);

    const enviarComentario = async (e) => {
        e.preventDefault();
        if (!user || !comentario.trim()) return;

        const datosParaDB = {
            id_pelicula: id,
            id_usuario: user.id,
            contenido: comentario
        };

        try {
            await guardarComentario(datosParaDB);
            
            const nuevoComentarioVista = {
                nombre_usuario: user.nombre_usuario || user.nombre,
                texto: comentario,
                fecha: new Date().toISOString()
            };

            setComentariosList([nuevoComentarioVista, ...comentariosList]);
            setComentario("");
        } catch (error) {
            alert("Hubo un problema al guardar tu comentario.");
        }
    };

    if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;
    if (!pelicula) return <div className="text-center mt-5 text-white"><h3>Cargando película...</h3></div>;

    return (
        <div className="container mt-4 mb-5 text-white">
            <button className="btn btn-outline-secondary mb-4 btn-sm" onClick={() => navigate('/cartelera')}>
                <i className="bi bi-arrow-left me-1"></i> Volver a Cartelera
            </button>

            <div className="row bg-dark p-4 rounded-4 shadow-lg border border-secondary">
                <div className="col-md-4 mb-4 mb-md-0 text-center">
                    <img 
                        src={pelicula.url_poster} 
                        className="img-fluid rounded-3 shadow" 
                        alt={pelicula.titulo} 
                        style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="col-md-8">
                    <h1 className="display-4 fw-bold text-warning">{pelicula.titulo}</h1>
                    
                    <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
                        {pelicula.generos && pelicula.generos.length > 0 ? (
                            pelicula.generos.map((g, index) => (
                                <span key={index} className="badge rounded-pill bg-primary px-3 py-2">
                                    <i className="bi bi-tag-fill me-1"></i>
                                    {typeof g === 'string' ? g : g.nombre}
                                </span>
                            ))
                        ) : (
                            <span className="badge rounded-pill bg-secondary px-3 py-2">Sin género</span>
                        )}
                        <span className="text-white-50 small ms-2">
                            <i className="bi bi-calendar3 me-1"></i>
                            Estreno: {new Date(pelicula.fecha_estreno).toLocaleDateString()}
                        </span>
                    </div>

                    <hr className="border-secondary" />
                    <h5 className="text-info">Sinopsis</h5>
                    <p className="lead fs-6 text-white" style={{ textAlign: 'justify' }}>{pelicula.descripcion}</p>
                    
                    <div className="mt-5 pt-4 border-top border-secondary">
                        <h4 className="text-warning mb-4">
                            <i className="bi bi-chat-left-text-fill me-2"></i> Opiniones de la comunidad
                        </h4>
                        
                        <div className="bg-black bg-opacity-25 p-3 rounded-3 mb-4 shadow-inner" style={{maxHeight: '350px', overflowY: 'auto'}}>
                            {comentariosList.length > 0 ? (
                                comentariosList.map((c, i) => (
                                    <div key={i} className="mb-3 p-2 border-bottom border-secondary text-start">
                                        <div className="d-flex justify-content-between">
                                            <strong className="text-warning">@{c.nombre_usuario}</strong>
                                            <small className="text-white-50">
                                                {c.fecha && !isNaN(Date.parse(c.fecha)) 
                                                    ? new Date(c.fecha).toLocaleDateString() 
                                                    : 'Reciente'}
                                            </small>
                                        </div>
                                        <p className="mb-0 mt-1 text-white">{c.texto}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white opacity-75 fst-italic text-center py-3">
                                    Nadie ha comentado todavía. ¡Sé el primero!
                                </p>
                            )}
                        </div>

                        {user ? (
                            <form onSubmit={enviarComentario} className="input-group shadow-sm">
                                <input 
                                    type="text" 
                                    className="form-control bg-dark text-white border-secondary" 
                                    placeholder="¿Qué te ha parecido?" 
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                <button className="btn btn-warning fw-bold px-4">Publicar</button>
                            </form>
                        ) : (
                            <div className="alert alert-info py-2 bg-info bg-opacity-10 border-info border-opacity-25 text-info text-center">
                                <small><i className="bi bi-info-circle me-1"></i> Inicia sesión para dejar tu comentario.</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { DetallePelicula };