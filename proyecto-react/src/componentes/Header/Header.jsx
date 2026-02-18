import './Header.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtenemos el usuario del localStorage
    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
    
    const [hayCambios, setHayCambios] = useState(false);
    const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
    const [rutaDestino, setRutaDestino] = useState('');

    useEffect(() => {
        const interceptarSeñal = (e) => setHayCambios(e.detail.tieneCambios);
        window.addEventListener('cambiosAdmin', interceptarSeñal);
        return () => window.removeEventListener('cambiosAdmin', interceptarSeñal);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogueado');
        navigate('/login');
    };

    const manejarNavegacionSegura = (e, destino) => {
        if (location.pathname === '/admin-cartelera' && hayCambios) {
            e.preventDefault();
            setRutaDestino(destino);
            setMostrarModalAviso(true);
        }
    };

    const confirmarYGuardar = () => {
        setMostrarModalAviso(false);
        window.dispatchEvent(new CustomEvent('ordenGuardarDesdeHeader'));
    };

    const salirSinGuardar = () => {
        setHayCambios(false);
        setMostrarModalAviso(false);
        navigate(rutaDestino);
    };

    return (
        /* bg-black para que sea oscuro total y combine con el resto */
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow sticky-top border-bottom border-secondary border-opacity-25">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/" onClick={(e) => manejarNavegacionSegura(e, '/')}>
                    <i className="bi bi-clapperboard-fill text-info me-2"></i>
                    CINE-APP
                </NavLink>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" onClick={(e) => manejarNavegacionSegura(e, '/')}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cartelera" onClick={(e) => manejarNavegacionSegura(e, '/cartelera')}>Cartelera</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <span className="text-light me-3 small">
                                    Hola, <span className="text-info fw-bold">
                                        {/* 👈 AQUÍ LA CORRECCIÓN: Buscamos ambos campos por seguridad */}
                                        {user.nombre_usuario || user.nombre || "Usuario"}
                                    </span>
                                </span>
                                <button className="btn btn-outline-danger btn-sm fw-bold" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-1"></i> Salir
                                </button>
                            </>
                        ) : (
                            <NavLink className="btn btn-primary btn-sm px-3 fw-bold" to="/login">Entrar</NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL DE AVISO */}
            {mostrarModalAviso && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.9)', zIndex: 3000 }}>
                    <div className="modal-dialog modal-dialog-centered text-dark">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-warning py-2">
                                <h6 className="modal-title fw-bold text-dark">⚠️ CAMBIOS SIN GUARDAR</h6>
                            </div>
                            <div className="modal-body py-4 text-center">
                                <p className="mb-0 fw-semibold">Tienes películas en borrador o cambios sin publicar.</p>
                                <small className="text-muted">¿Qué deseas hacer antes de salir?</small>
                            </div>
                            <div className="modal-footer d-flex flex-column gap-2 p-3">
                                <button className="btn btn-success w-100 fw-bold shadow-sm" onClick={confirmarYGuardar}>
                                    GUARDAR Y CONTINUAR
                                </button>
                                <button className="btn btn-outline-danger w-100 fw-bold" onClick={salirSinGuardar}>
                                    DESCARTAR Y SALIR
                                </button>
                                <button className="btn btn-light w-100 border" onClick={() => setMostrarModalAviso(false)}>
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export { Header };