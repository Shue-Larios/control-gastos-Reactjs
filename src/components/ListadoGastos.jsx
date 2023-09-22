import { Gasto } from "./Gasto"


export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro,
    gastosFiltrados }) => {
    return (
        <div className="listado-gastos contenedor">

            {
                // si fitro existe si hay algo vamos a iterar por gastosFiltrados
                filtro ? (
                    // si fitro existe si hay algo vamos a iterar por gastosFiltrados
                    <>
                        <h2>
                            {gastosFiltrados.length  ? 'Gastos' : 'No hay gastos en esta categoria'}
                        </h2>
                        {gastosFiltrados.map(gasto => (
                            <Gasto
                                key={gasto.id} // el key siempre tengo a ponerlo y no ponerlo x el indice del arreglo es mala practica 
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>


                )
                    : (
                        <>
                            <h2>
                                {gastos.length ? 'Gastos' : 'No hay gastos aun'}
                            </h2>

                            {/* // mapeo el arreglo de gastos y muestro el componente Gasto x cada elemento que hay  */}
                            {gastos.map(gasto => (
                                <Gasto
                                    key={gasto.id} // el key siempre tengo a ponerlo y no ponerlo x el indice del arreglo es mala practica 
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    eliminarGasto={eliminarGasto}
                                />
                            ))
                            }
                        </>

                    )
            }





        </div>
    )
}
