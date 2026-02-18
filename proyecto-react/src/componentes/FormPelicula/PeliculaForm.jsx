import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { obtenerPeliculaPorId, obtenerGeneros } from '../../services/peliculaService';
import './PeliculaForm.css';

const PeliculaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const adminData = JSON.parse(localStorage.getItem('usuarioLogueado'));

    const [generosDB, setGenerosDB] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [form, setForm] = useState({
        titulo: '',
        descripcion: '',
        fecha_estreno: '',
        url_poster: '',
        generos: []
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const gData = await obtenerGeneros();
                setGenerosDB(gData);

                // Si estamos editando y tenemos la peli en el state de navegación, la usamos
                // Si no, la pedimos al servicio (esto solo ocurre si refrescan la página)
                if (id) {
                    const peli = location.state?.peliActual || await obtenerPeliculaPorId(id);
                    setForm({
                        titulo: peli.titulo,
                        descripcion: peli.descripcion,
                        fecha_estreno: peli.fecha_estreno ? peli.fecha_estreno.split('T')[0] : '',
                        url_poster: peli.url_poster,
                        generos: peli.generos_ids || [] 
                    });
                }
            } catch (error) {
                console.error("Error al cargar:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id, location.state]);

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const idGen = parseInt(value);
            setForm(prev => ({
                ...prev,
                generos: checked ? [...prev.generos, idGen] : prev.generos.filter(g => g !== idGen)
            }));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Creamos el objeto "borrador"
        const peliProcesada = {
            ...form,
            id: id ? parseInt(id) : Date.now(), // ID temporal para nuevas
            generos_ids: form.generos,
            creado_por: adminData.id,
            esNueva: !id // Marcamos si es nueva para que el Admin sepa qué hacer luego
        };

        // Regresamos al panel pasando la película en el state
        navigate('/admin-cartelera', { 
            state: { 
                peliProcesada,
                cambioRealizado: true 
            } 
        });
    };

    if (cargando) return <div className="vh-100 bg-dark text-center pt-5"><div className="spinner-border text-warning"></div></div>;

    return (
        <div className="pelicula-form-container container mt-5 mb-5 animate__animated animate__fadeIn">
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <div className="card shadow bg-dark text-white border-0">
                        <div className="card-header bg-gradient-primary-dark p-4 border-bottom border-secondary">
                            <h3 className="m-0 fw-bold">
                                <i className={`bi ${id ? 'bi-pencil-square' : 'bi-plus-circle-fill'} me-3`}></i>
                                {id ? 'Editar Película' : 'Nueva Película'}
                            </h3>
                        </div>
                        <div className="card-body p-lg-5">
                            <form onSubmit={handleSubmit} className="row g-4">
                                <div className="col-md-4 text-center">
                                    <div className="preview-box shadow rounded border border-secondary mb-3 overflow-hidden" style={{ minHeight: '300px' }}>
                                        {form.url_poster ? (
                                            <img src={form.url_poster} alt="Preview" className="img-fluid" />
                                        ) : (
                                            <div className="p-5 opacity-25"><i className="bi bi-camera-reels display-1"></i></div>
                                        )}
                                    </div>
                                    <input name="url_poster" value={form.url_poster} className="form-control bg-dark text-white border-secondary" placeholder="URL del póster" onChange={manejarCambio} required />
                                </div>

                                <div className="col-md-8">
                                    <div className="row g-3">
                                        <div className="col-md-8">
                                            <label className="small fw-bold opacity-75">TÍTULO</label>
                                            <input name="titulo" value={form.titulo} className="form-control bg-dark text-white border-secondary" onChange={manejarCambio} required />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="small fw-bold opacity-75">FECHA</label>
                                            <input type="date" name="fecha_estreno" value={form.fecha_estreno} className="form-control bg-dark text-white border-secondary" onChange={manejarCambio} required />
                                        </div>
                                        <div className="col-12">
                                            <label className="small fw-bold opacity-75">SINOPSIS</label>
                                            <textarea name="descripcion" value={form.descripcion} className="form-control bg-dark text-white border-secondary" rows="5" onChange={manejarCambio} required></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="small fw-bold text-warning">GÉNEROS</label>
                                            <div className="d-flex flex-wrap gap-2 pt-2">
                                                {generosDB.map(g => (
                                                    <div key={g.id}>
                                                        <input type="checkbox" className="btn-check" id={`gen-${g.id}`} value={g.id} checked={form.generos.includes(g.id)} onChange={manejarCambio} />
                                                        <label className="btn btn-outline-warning btn-sm rounded-pill px-3" htmlFor={`gen-${g.id}`}>{g.nombre}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 d-flex gap-3 justify-content-end">
                                        <button type="button" className="btn btn-link text-secondary text-decoration-none fw-bold" onClick={() => navigate('/admin-cartelera')}>CANCELAR</button>
                                        <button type="submit" className="btn btn-warning px-5 fw-bold rounded-pill shadow">ACEPTAR CAMBIOS</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeliculaForm;