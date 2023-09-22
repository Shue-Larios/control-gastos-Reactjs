import { useEffect, useState } from "react";
import CerrarBTN from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {


    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        // si gastoEditar no viene vacio es xk esta editando
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id) // asigno el id que ya tengo en el gasto a este state
        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
            setGastoEditar({})  //para limpiar el state de editargasto
        }, 500); //cada mil son 1 segundo 500 medio segundo
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // validaciones
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            // coloco un tiempo para mostrar el msj de alerta y borrarlo
            setTimeout(() => {
                setMensaje('')
            }, 1500);
            return
        }

        // si pasa la validacion
        guardarGasto({ nombre, cantidad, categoria, id, fecha });


    }


    return (
        <>
            <div className='modal'>
                <div className='cerrar-modal'>
                    <img src={CerrarBTN} alt="cerrar modal"
                        onClick={ocultarModal}
                    />
                </div>
                {/* asi puedo quitar clases dinamicamente */}
                <form
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                        {/* si existe la propiedad gastoEditar.nombre muestra un texto sino otro */}
                    <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                    {/* en este caso mandamos el {mensaje} para ser leido como children en ese componente y el tipo se lo mandamos como props */}
                    {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}


                    <div className="campo">
                        <label htmlFor="nombre">Nombre Gasto</label>
                        <input type="text"
                            id="nombre"
                            placeholder="Añade el nombre del gasto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input type="number"
                            min={0}
                            step='0.01' //para permitir 2 decimales
                            id="cantidad"
                            placeholder="Añade la cantidad del gasto: ej. 300"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="categoria">Categoria</label>

                        <select
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="ocio">Ocio</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                        </select>

                        <input type="submit"
                            value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} 
                        />

                    </div>



                </form>




            </div>




        </>
    )
}
