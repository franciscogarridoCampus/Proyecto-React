import React from 'react';
import { Link } from 'react-router-dom';
import './FormLogin.css'; 

const FormLogin = ({ setEmail, setPass, handleSubmit, error, mensajeExito }) => {
    return (
        <div className="login-wrapper">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card login-card bg-dark text-white border-secondary shadow-lg animate__animated animate__fadeIn">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <i className="bi bi-person-circle display-3 text-info"></i>
                            <h3 className="fw-bold mt-2 text-info">Acceso Usuarios</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* MENSAJE VERDE DE ÉXITO */}
                            {mensajeExito && !error && (
                                <div className="alert alert-success py-2 small text-center border-0 mb-4 animate__animated animate__backInDown" 
                                     style={{ backgroundColor: 'rgba(25, 135, 84, 0.2)', color: '#75b798' }}>
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    {mensajeExito}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger py-2 small animate__animated animate__shakeX text-center border-0 mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="mb-4">
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

                            <button type="submit" className="btn btn-info w-100 fw-bold py-2 mt-2 shadow-sm text-dark">
                                ENTRAR
                            </button>
                        </form>

                        <div className="text-center mt-4 pt-3 border-top border-secondary">
                            <p className="small mb-0 text-secondary">
                                ¿No tienes cuenta? 
                                <Link to="/registro" className="text-info ms-2 text-decoration-none fw-bold">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;