import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pelicula } from '../componentes/Peliculas/Pelicula';
import { obtenerPeliculas, eliminarPelicula, guardarPelicula, actualizarPelicula } from '../services/peliculaService';
import PanelHeader from '../componentes/PanelHeader/PanelHeader';
import EliminarPeli from '../componentes/EliminarPeli/EliminarPeli';
import ConfirmarSalida from '../componentes/ConfirmarSalida/ConfirmarSalida';

const AdminCartelera = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [cambiosPendientes, setCambiosPendientes] = useState(false);
    
    // Listas para rastrear qué debemos hacer al final en el servidor
    const [pendientesGuardar, setPendientesGuardar] = useState([]); 
    const [pendientesBorrar, setPendientesBorrar] = useState([]);

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [mostrarModalSalida, setMostrarModalSalida] = useState(false);
    const [peliSeleccionada, setPeliSeleccionada] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const peliData = await obtenerPeliculas();
                setPeliculas(peliData);
            } catch (error) {
                console.error("Error al cargar películas:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, []);

    // CAPTURAR CAMBIOS QUE VIENEN DEL FORMULARIO
    useEffect(() => {
        if (location.state?.peliProcesada) {
            const peli = location.state.peliProcesada;
            
            setPeliculas(prev => {
                const existe = prev.find(p => p.id === peli.id);
                if (existe) {
                    return prev.map(p => p.id === peli.id ? peli : p);
                }
                return [peli, ...prev]; // Es nueva
            });

            // Agregamos a la cola de cambios para Axios
            setPendientesGuardar(prev => [...prev.filter(p => p.id !== peli.id), peli]);
            setCambiosPendientes(true);
        }
    }, [location.state]);

    const prepararEliminar = (id) => {
        const peli = peliculas.find(p => p.id === id);
        setPeliSeleccionada(peli);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminacionVisual = () => {
        // Guardamos el ID para borrarlo en la DB al final
        if (!peliSeleccionada.esNueva) {
            setPendientesBorrar(prev => [...prev, peliSeleccionada.id]);
        }
        // Quitamos de la vista
        setPeliculas(peliculas.filter(p => p.id !== peliSeleccionada.id));
        setCambiosPendientes(true);
        setMostrarModalEliminar(false);
    };

    // ACCIÓN DEFINITIVA CON AXIOS
    const aplicarCambiosEnServidor = async () => {
        try {
            // 1. Borrar lo marcado
            for (const id of pendientesBorrar) {
                await eliminarPelicula(id);
            }
            // 2. Guardar o Actualizar lo modificado
            for (const peli of pendientesGuardar) {
                if (peli.esNueva) {
                    delete peli.esNueva; // Limpiamos flag temporal
                    await guardarPelicula(peli);
                } else {
                    await actualizarPelicula(peli.id, peli);
                }
            }
            setCambiosPendientes(false);
            navigate('/'); // Ahora sí, volvemos a la cartelera pública
        } catch (error) {
            alert("Error al sincronizar con el servidor");
        }
    };

    const manejarVolverConAviso = () => {
        cambiosPendientes ? setMostrarModalSalida(true) : navigate('/');
    };

    if (cargando) return <div className="vh-100 bg-dark text-center pt-5 text-warning">Cargando Cartelera...</div>;

    return (
        <div className="container mt-4 mb-5 animate__animated animate__fadeIn">
            <PanelHeader alVolver={manejarVolverConAviso} />

            {cambiosPendientes && (
                <div className="alert alert-warning border-0 bg-warning text-dark fw-bold text-center rounded-pill mb-4 shadow">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    MODO EDICIÓN ACTIVO: Los cambios no son permanentes hasta que confirmes.
                </div>
            )}

            <div className="row g-4 mb-5">
                {peliculas.map(p => (
                    <Pelicula 
                        key={p.id} 
                        pelicula={p} 
                        esAdmin={true} 
                        alEditar={(peli) => navigate(`/admin-cartelera/editar/${peli.id}`, { state: { peliActual: peli } })} 
                        alEliminar={() => prepararEliminar(p.id)}
                    />
                ))}
            </div>

            <div className="fixed-bottom bg-dark border-top border-secondary p-3 d-flex justify-content-center shadow-lg">
                <button 
                    className={`btn ${cambiosPendientes ? 'btn-warning shadow' : 'btn-outline-secondary'} px-5 py-2 fw-bold rounded-pill`}
                    onClick={aplicarCambiosEnServidor}
                    disabled={!cambiosPendientes}
                >
                    {cambiosPendientes ? 'GUARDAR CAMBIOS EN BASE DE DATOS' : 'SIN CAMBIOS PENDIENTES'}
                </button>
            </div>

            <EliminarPeli 
                mostrar={mostrarModalEliminar}
                nombrePeli={peliSeleccionada?.titulo}
                alConfirmar={confirmarEliminacionVisual}
                alCancelar={() => setMostrarModalEliminar(false)}
            />

            <ConfirmarSalida 
                mostrar={mostrarModalSalida}
                alGuardar={aplicarCambiosEnServidor}
                alSalirSinGuardar={() => navigate('/')}
                alCancelar={() => setMostrarModalSalida(false)}
            />
        </div>
    );
};

export { AdminCartelera };