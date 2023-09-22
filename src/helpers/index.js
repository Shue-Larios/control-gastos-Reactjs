// para formatear la cantidad
export const formatearCantidad = (cantidad) => {
    // asi se hace para el lempira
    return cantidad.toLocaleString('es-HN', {
        style: 'currency',
        currency: 'HNL'
    });
    // // asi se hace para el dolar
    // return cantidad.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'USD'
    // })
}


// para generar un id 
export const generarId = () => {
    const random = Math.random().toString(36).slice(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}


// para formatear la fecha
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha); //instanciamos la fecha
    // opciones de configuracion de la fecha
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}