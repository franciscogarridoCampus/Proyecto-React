import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pelicula } from '../componentes/Peliculas/Pelicula';
import { obtenerPeliculas, eliminarPelicula, guardarPelicula, actualizarPelicula } from '../services/peliculaService';
import { cambiosService } from '../services/cambiosService'; 
import PanelHeader from '../componentes/PanelHeader/PanelHeader';
import EliminarPeli from '../componentes/EliminarPeli/EliminarPeli';
import ConfirmarSalida from '../componentes/ConfirmarSalida/ConfirmarSalida';

const AdminCartelera = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [cambiosPendientes, setCambiosPendientes] = useState(false);

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [mostrarModalSalida, setMostrarModalSalida] = useState(false);
    const [peliSeleccionada, setPeliSeleccionada] = useState(null);

    // 1. CARGA INICIAL
    useEffect(() => {
        const inicializarDatos = async () => {
            try {
                if (cambiosService.getListaVisual().length === 0) {
                    const peliData = await obtenerPeliculas();
                    cambiosService.setDatosIniciales(peliData);
                }
                setPeliculas(cambiosService.getListaVisual());
                setCambiosPendientes(cambiosService.getColas().tieneCambios);
            } catch (error) {
                console.error("Error al inicializar:", error);
            } finally {
                setCargando(false);
            }
        };
        inicializarDatos();
    }, []);

    // 2. CAPTURAR RETORNO DEL FORMULARIO
    useEffect(() => {
        if (location.state?.peliProcesada) {
            cambiosService.registrarCambio(location.state.peliProcesada);
            setPeliculas([...cambiosService.getListaVisual()]);
            setCambiosPendientes(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // 3. GESTIÓN DE ELIMINACIÓN
    const prepararEliminar = (peli) => {
        setPeliSeleccionada(peli);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminacionVisual = () => {
        cambiosService.registrarEliminacion(peliSeleccionada);
        setPeliculas([...cambiosService.getListaVisual()]);
        setCambiosPendientes(cambiosService.getColas().tieneCambios);
        setMostrarModalEliminar(false);
    };

    // 4. PERSISTENCIA FINAL
    const aplicarCambiosEnServidor = async () => {
        const { guardar, borrar } = cambiosService.getColas();
        
        try {
            // A. Borrados
            for (const id of borrar) {
                await eliminarPelicula(id);
            }

            // B. Guardados/Ediciones
            for (const peli of guardar) {
                const { esNueva, esBorrador, generos, ...peliLimpia } = peli;
                if (peli.esNueva) {
                    const { id, ...peliParaInsertar } = peliLimpia;
                    await guardarPelicula(peliParaInsertar);
                } else {
                    await actualizarPelicula(peli.id, peliLimpia);
                }
            }

            // C. LIMPIEZA POST-GUARDADO
            cambiosService.confirmarSincronizacion();
            setPeliculas([...cambiosService.getListaVisual()]);
            setCambiosPendientes(false);
            setMostrarModalSalida(false); 
            
            // He quitado el alert("¡Base de datos sincronizada correctamente!");
            
            navigate('/'); 
        } catch (error) {
            console.error("Error en sincronización:", error);
            // He quitado el alert de error para evitar ventanas del navegador
        }
    };

    if (cargando) return (
        <div className="vh-100 bg-dark d-flex align-items-center justify-content-center text-white">
            <div className="spinner-border text-warning me-3"></div> Conectando con el servidor...
        </div>
    );

    return (
        <div className="container mt-4 mb-5 animate__animated animate__fadeIn">
            {/* Se mantiene la lógica para que el botón Volver active el modal si hay cambios */}
            <PanelHeader alVolver={() => (cambiosService.getColas().tieneCambios ? setMostrarModalSalida(true) : navigate('/'))} />

            {cambiosPendientes && (
                <div className="alert border-0 bg-info text-dark fw-bold text-center rounded-pill mb-4 shadow-sm animate__animated animate__pulse animate__infinite">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    MODO PREVIA: Tienes cambios locales pendientes de guardar.
                </div>
            )}

            <div className="row g-4 mb-5 pb-5">
                {peliculas.map(p => (
                    <Pelicula 
                        key={p.id} 
                        pelicula={p} 
                        esAdmin={true} 
                        alEditar={(peli) => navigate(`/admin-cartelera/editar/${peli.id}`, { state: { peliActual: peli } })} 
                        alEliminar={() => prepararEliminar(p)}
                    />
                ))}
            </div>

            {/* Botón Flotante Inferior */}
            <div className="fixed-bottom bg-dark border-top border-secondary p-3 d-flex justify-content-center shadow-lg" style={{zIndex: 1030}}>
                <button 
                    className={`btn ${cambiosPendientes ? 'btn-danger pulse-animation shadow' : 'btn-outline-secondary'} px-5 py-2 fw-bold rounded-pill`}
                    onClick={aplicarCambiosEnServidor}
                    disabled={!cambiosPendientes}
                >
                    {cambiosPendientes ? 'CONFIRMAR Y GUARDAR EN DB' : 'TODO SINCRONIZADO'}
                </button>
            </div>

            {/* Modal Eliminar */}
            <EliminarPeli 
                mostrar={mostrarModalEliminar}
                nombrePeli={peliSeleccionada?.titulo}
                alConfirmar={confirmarEliminacionVisual}
                alCancelar={() => setMostrarModalEliminar(false)}
            />

            {/* Modal Salida */}
            <ConfirmarSalida 
                mostrar={mostrarModalSalida}
                alGuardar={aplicarCambiosEnServidor}
                alSalirSinGuardar={() => {
                    cambiosService.limpiarCaches();
                    navigate('/');
                }}
                alCancelar={() => setMostrarModalSalida(false)}
            />
        </div>
    );
};

export { AdminCartelera };