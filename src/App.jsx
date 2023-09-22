import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"; // asi se importa una imagen si tengo el codigo svg guardado
import { Modal } from './components/Modal';
import { generarId } from './helpers'; //no requiero el nombre del archivo xk se llama index.js
import { ListadoGastos } from './components/ListadoGastos';
import { Filtros } from './components/Filtros';

function App() {

  // aca le colocamos que el valor inicial va hacer lo del localStorage y sino existe le agrega un cero
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // asi de esta forma puede ver un componente desde el inicio 
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll al principio de la página cuando el componente se monta
  // }, [modal]); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  useEffect(() => {
    //  si el objeto ya tiene algo
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      // hace que mi formulario dentro del modal se tarde en cargar y da un efecto que aparece gracias al css de formulario y animar
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  // useEffect para guardar el presupuesto en localstorage y en caso que no este la variable colocamos un 0
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // para almacenar los gastos en el localStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])



  // este useEffect sirve para cuando hay un presupuesto en localStorage automaticamente me mande a la pantalla de gastos aunq actualice la pagina
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    // aca le digo que si el presupuesto es valido 
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  // para escuchar por los cambios en el filtro
  useEffect(() => {
    if (filtro) {
      // filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])




  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({}) // para que me ponga vacio este objeto si ants de agregar un nuevo tenia editando uno
    // hace que mi formulario dentro del modal se tarde en cargar y da un efecto que aparece gracias al css de formulario y animar
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  // cuando se van a trabajar con datos que vienen de otro componente trabajar de un solo en una funcion
  const guardarGasto = (gasto) => {
    // si el campo id viene lleno vamos actualizar
    if (gasto.id) {
      // aca es gastos.map xk de ahi saco la informacion que son todos los gastos
      // en la parte del ? gasto (esta es la parte que va actualizada) : gastoState (son los otros elementos del arreglo que no estan actualizados)
      const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados);
      setGastoEditar({})
    } else {
      // nuevo gasto
      // si el campo id viene vacio aca lo llenamos
      // como generarId es funcion se ponen () para ejecutarlo
      gasto.id = generarId()
      gasto.fecha = Date.now() //para agregar la fecha en la que se genera el objeto 
      setGastos([...gastos, gasto]);
    }
    // para cerrar el modal con animacion
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500); //cada mil son 1 segundo 500 medio segundo
  }

  const eliminarGasto = (id) => {
    // filter sirve para remover el elemento diferente al que estoy comparando
    const gastoActualizados = gastos.filter(gastoState => gastoState.id !== id)
    // como saca el elemento que quiero borrar y deja lo demas en el objeto paso de un solo esta variable
    setGastos(gastoActualizados);
  }

  return (
    // con esta clase evito scrool para arriba/abajo
    // /* le defino una altura de 100 lo q se salga de la altura lo oculta */

    <div className={modal ? 'fijar' : null} >
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />


      {/* el doble && es un ternario pero solo la parte del verdadero asi evito poner codigo que no va cuando uso ? y : */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />


            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="icono nuevo gasto"
              onClick={handleNuevoGasto} />
          </div>

        </>


      )

      }
      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}

export default App
