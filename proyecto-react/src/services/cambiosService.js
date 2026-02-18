// src/services/cambiosService.js

let listaLocal = []; // Copia de trabajo actual
let pendientesGuardar = []; // Objetos completos a insertar/actualizar
let pendientesBorrar = []; // IDs a eliminar

export const cambiosService = {
    // Inicializa la lista con datos de la DB
    setDatosIniciales: (datos) => {
        listaLocal = [...datos];
    },

    // Retorna la lista combinada (DB + Cambios locales)
    getListaVisual: () => {
        return listaLocal;
    },

    // Registrar una edición o creación nueva
    registrarCambio: (peli) => {
        const peliConBorrador = { ...peli, esBorrador: true };

        // Actualizar lista visual
        const index = listaLocal.findIndex(p => p.id === peli.id);
        if (index !== -1) {
            listaLocal[index] = peliConBorrador;
        } else {
            listaLocal = [peliConBorrador, ...listaLocal];
        }

        // Agregar a cola de persistencia
        pendientesGuardar = pendientesGuardar.filter(p => p.id !== peli.id);
        pendientesGuardar.push(peliConBorrador);
        
        // Si estaba en cola de borrar y lo re-creamos, lo quitamos de borrar
        pendientesBorrar = pendientesBorrar.filter(id => id !== peli.id);
    },

    // Registrar una eliminación
    registrarEliminacion: (peli) => {
        listaLocal = listaLocal.filter(p => p.id !== peli.id);
        pendientesGuardar = pendientesGuardar.filter(p => p.id !== peli.id);
        
        if (!peli.esNueva) {
            pendientesBorrar.push(peli.id);
        }
    },

    // Obtener las colas para el envío final
    getColas: () => ({
        guardar: pendientesGuardar,
        borrar: pendientesBorrar,
        tieneCambios: pendientesGuardar.length > 0 || pendientesBorrar.length > 0
    }),

    // Limpia las colas y quita las marcas de "esBorrador" de la lista visual
    confirmarSincronizacion: () => {
        listaLocal = listaLocal.map(peli => ({
            ...peli,
            esBorrador: false,
            esNueva: false
        }));
        pendientesGuardar = [];
        pendientesBorrar = [];
    },

    // Limpiar caches sin afectar la visual (para descartar cambios)
    limpiarCaches: () => {
        pendientesGuardar = [];
        pendientesBorrar = [];
    }
};