import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));

    return (
        <div className="container mt-5">
            <div className="bg-dark text-white p-5 rounded-4 shadow">
                <h1 className="display-4 fw-bold">Bienvenido, {user?.nombre || 'Usuario'}</h1>
                <p className="lead">
                    Tu portal de cine favorito. Explora nuestra cartelera actualizada y gestiona tus series favoritas.
                </p>
                <hr className="my-4 border-primary" />
                <p>¿Qué quieres hacer hoy?</p>
                <div className="d-flex gap-3">
                    <button 
                        className="btn btn-primary btn-lg px-4" 
                        onClick={() => navigate('/cartelera')}
                    >
                        Ver Cartelera
                    </button>
                    <button 
                        className="btn btn-outline-light btn-lg px-4"
                        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                    >
                        Soporte Técnico
                    </button>
                </div>
            </div>

            <div className="row mt-5 text-center">
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5 fw-bold">Estrenos</h3>
                        <p className="text-muted">Las últimas películas recién llegadas de Hollywood.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 border-start border-end">
                        <h3 className="h5 fw-bold">Series</h3>
                        <p className="text-muted">Temporadas completas para tus maratones de fin de semana.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3">
                        <h3 className="h5 fw-bold">Comunidad</h3>
                        <p className="text-muted">Lee y comparte comentarios con otros cinéfilos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Home };