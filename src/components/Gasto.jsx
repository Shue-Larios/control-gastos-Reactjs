//  importamos el paquete de swipeable-list que hace mover a los lados 
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
// importamos la hoja de estilos d este paquete
import 'react-swipeable-list/dist/styles.css';

import { formatearCantidad, formatearFecha } from '../helpers'; //no requiero el nombre del archivo xk se llama index.js

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripcion from '../img/icono_suscripciones.svg';

// creamos un diccionario de iconos para asociar la categoria con un icono
const diccionarioIconos = {
    ahorro: IconoAhorro, //asigno una imagen a cada elemento del objeto
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripcion
}

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

    // aplicamos destructuring 
    const { id, nombre, cantidad, categoria, fecha } = gasto

    
    // funcion para mover de izquierda derecha
    const leadingActions = () => (
        <LeadingActions>
            {/* llevo el objeto state setGastoEditar con gasto */}
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
          </SwipeAction>
        </LeadingActions>
      );
      
    //   function para mover derecha a izquierda
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            // le paso solo el id xk d ser unico sirve para borrar el dato
            onClick={() => eliminarGasto(id)
            
            }
          >
            Eliminar
          </SwipeAction>
        </TrailingActions>
      );

    return (
        <SwipeableList>
            <SwipeableListItem
            // eesta es la parte de izquierda a derecha
                leadingActions={leadingActions()}
                // esta es la parte de derecha a izquierda
                trailingActions={trailingActions()}
              
  
            >


                <div className='gasto sombra'>

                    <div className='contenido-gasto'>
                        {/* compara categoria con el nombre de cada elemento del objeto diccionarioIconos */}
                         {/* draggable="false" /* Deshabilitar el arrastre de la imagen  */}
                        <img src={diccionarioIconos[categoria]} alt="icono gasto" draggable="false" />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{categoria}</p>
                            <p className='nombre-gasto'>{nombre}</p>
                            <p className='fecha-gasto'>Agregado el:{''} <span>{formatearFecha(fecha)}</span></p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>{formatearCantidad(cantidad)} </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>

    )
}
