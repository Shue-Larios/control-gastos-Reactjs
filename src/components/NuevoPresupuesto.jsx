import { useState } from "react";
import { Mensaje } from "./Mensaje";


export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()

        // se puede hacer asi cuando el numero viene como string en este caso dsd que lo escribo se convierte a string
        // sino es un numero      o   si ingresan numero negativo          
        // if (!Number(presupuesto) || Number(presupuesto) < 0) {
        //     setMensaje('No es un presupuesto valido');
        //     return
        // }

        // sino eciste el presupuesto  o el presupuesto es menor a cero
        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido');
            return
        }
        // limpiamos este state
        setMensaje('')
        // cambia el state para mostrar o no un componente
        setIsValidPresupuesto(true)


    }



    return (
        <>
            <div className='contenedor-presupuesto contenedor sombra'>


                <form
                    onSubmit={handlePresupuesto}
                    className='formulario'
                >
                    <div className='campo'>
                        <label htmlFor=""> Definir Presupuesto</label>
                        <input
                            className='nuevo-presupuesto'
                            type="number"
                            min={0}
                            placeholder='Añade tu presupuesto'
                            value={presupuesto}
                            // con Number antes es para que cree de un solo el valor como numero
                            onChange={(e) => setPresupuesto(Number(e.target.value))}
                        />
                    </div>

                    <input type="submit"
                        value='Añadr' />
                    {/* en este caso mandamos el {mensaje} para ser leido como children en ese componente y el tipo se lo mandamos como props */}
                    {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                </form>
            </div>
        </>
    )
}
