import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPeliculas } from '../services/peliculaService';
import { Pelicula } from '../componentes/Peliculas/Pelicula';
import { useAuth } from '../hooks/useAuth';
import ModalAdmin from '../componentes/ModalAdmin/ModalAdmin';

function Cartelera() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);
    const { user, verificarPassword } = useAuth();
    const navigate = useNavigate();

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

    const procesarAccesoAdmin = async (passwordRecibida) => {
        try {
            const esValido = await verificarPassword(passwordRecibida);
            if (esValido) {
                setModalAbierto(false);
                navigate("/admin-cartelera");
            } else {
                alert("❌ Contraseña incorrecta. Acceso denegado.");
            }
        } catch (error) {
            alert("Hubo un error al verificar la identidad.");
        }
    };

    if (cargando) return (
        <div className="text-center mt-5 text-white">
            <div className="spinner-border text-info" role="status"></div>
            <p className="mt-2 fw-light">Sincronizando cartelera...</p>
        </div>
    );

    return (
        <div className="container mt-2 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary border-opacity-50 pb-3">
                <h2 className="m-0 text-white fw-bold">
                    Nuestra Cartelera
                </h2>
                
                {user?.rol === 'admin' && (
                    <button 
                        onClick={() => setModalAbierto(true)} 
                        className="btn btn-danger shadow-sm fw-bold border-2 border-white d-flex align-items-center"
                    >
                        Gestionar Cartelera
                    </button>
                )}
            </div>

            <div className="row g-4">
                {peliculas.length > 0 ? (
                    peliculas.map((p) => (
                        <Pelicula key={p.id} pelicula={p} esAdmin={false} />
                    ))
                ) : (
                    <div className="col-12 text-center text-white mt-5">
                        <div className="p-5 border border-dashed border-secondary rounded-4">
                            <p className="lead">No hay películas disponibles en este momento.</p>
                        </div>
                    </div>
                )}
            </div>

            <ModalAdmin 
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onConfirm={procesarAccesoAdmin}
                nombreUsuario={user?.nombre_usuario || "Admin"}
            />
        </div>
    );
}

export { Cartelera };