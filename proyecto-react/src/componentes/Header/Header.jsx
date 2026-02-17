import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogueado');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/">🎬 CINE-APP</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        {user && (
                            <>
                                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/cartelera">Cartelera</NavLink></li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <span className="text-light me-3 small">Hola, {user.nombre}</span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Salir</button>
                            </>
                        ) : (
                            <NavLink className="btn btn-primary btn-sm" to="/login">Entrar</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
export { Header };