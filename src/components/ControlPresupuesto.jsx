import { useEffect, useState } from 'react';
import { formatearCantidad } from '../helpers'; //no requiero el nombre del archivo xk se llama index.js
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto,setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        // reduce va acumular una gran cantidad de datos en unasola variable
        // los datos que toma son dos valores uno un acumulado (total) la otra la instancia del gasto (de donde tengo valores)
        // le digo que vaya sumando los gasto.cantidad con total y el cero es el valor donde va a iniciar
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //calcular el porcentaje gastado con regla de 3
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2) //toFixed(2) es para colocar dos digitos
        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)

        }, 1500);
    }, [gastos])

    // sirve para resetar la app limpiar todo
    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos')
        if (resultado) {
            // no ocupo limpiar o borrar lo de localStorage xk ya lo estoy poniendo como al inicio
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div >
                <CircularProgressbar
                    styles={buildStyles({
                        // le digo que si el porcetaje es mas de 100 meponga el circulo de color rojo sino azul
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    })}
                    value={porcentaje}
                    text={`${(porcentaje)}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >Resetear App</button>
                <p>
                    {/* de esta forma le pongo un parametro a una funcion */}
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                {/* asi pongo el texto disponible en rojo cuando ya hay valores negativos */}
                <p className={`${disponible < 0 ? 'negativo' : null}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div >
    )
}
