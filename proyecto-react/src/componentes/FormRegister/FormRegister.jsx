import React from 'react';
import { Link } from 'react-router-dom';
// Reutilizamos los estilos del login para mantener la estética
import '../FormLogin/FormLogin.css'; 

const FormRegister = ({ setNombre, setEmail, setPass, handleSubmit, error, cargando }) => {
    return (
        <div className="login-wrapper">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card login-card bg-dark text-white border-secondary shadow-lg animate__animated animate__fadeIn">
                    <div className="card-body p-5" style={{ width: '450px' }}>
                        <div className="text-center mb-4">
                            <i className="bi bi-person-plus-fill display-3 text-info"></i>
                            <h3 className="fw-bold mt-2 text-info">Crear Cuenta</h3>
                            <p className="text-secondary small">Únete para comentar tus películas favoritas</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-danger py-2 small text-center border-0 mb-4">
                                    {error}
                                </div>
                            )}

                            {/* Campo Nombre de Usuario */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-info ms-1">Nombre de Usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-secondary border-0 text-white">
                                        <i className="bi bi-person-badge"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="Tu apodo"
                                        onChange={e => setNombre(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Campo Email */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-info ms-1">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-secondary border-0 text-white">
                                        <i className="bi bi-envelope-at"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="ejemplo@cine.com"
                                        onChange={e => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Campo Contraseña */}
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-info ms-1">Contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-secondary border-0 text-white">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="********"
                                        onChange={e => setPass(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-info w-100 fw-bold py-2 shadow-sm text-dark"
                                disabled={cargando}
                            >
                                {cargando ? 'REGISTRANDO...' : 'REGISTRARSE'}
                            </button>
                        </form>

                        <div className="text-center mt-4 pt-3 border-top border-secondary">
                            <p className="small mb-0 text-secondary">
                                ¿Ya eres miembro? 
                                <Link to="/login" className="text-info ms-2 text-decoration-none fw-bold">
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormRegister;