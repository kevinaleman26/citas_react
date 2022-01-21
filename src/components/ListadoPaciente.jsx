import {useEffect} from "react"
import Paciente from "./Paciente"

const ListadoPaciente = ({pacientes, setPaciente, eliminarPaciente}) => {

    // Se muestra mensaje cuando se ingresa un nuevo paciente.
    useEffect(() => {
        if(pacientes.length > 0)
            console.log("Nuevo Paciente ingresado.")
    },[pacientes])

    return (

        <div className="md:w-1/2 lg:w-3/5 h-screen overflow-y-scroll">

            { pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus <span className="text-indigo-600 font-bold">Pacientes y citas</span>
                    </p> 

                    {pacientes.map( (paciente) => (
                        <Paciente 
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes pendientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes <span className="text-indigo-600 font-bold"> y apareceran en este lugar</span>
                    </p> 
                </>
            )}

            

            
            

            
            
        </div>
    )
}

export default ListadoPaciente
