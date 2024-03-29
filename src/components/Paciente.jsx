import QRGenerator from './QRGenerator';


const Paciente = ({paciente,setPaciente,eliminarPaciente}) => {

    const handlerEliminar = () => {

        const respuesta = confirm('Desea eliminar este paciente?')
        if(respuesta) {
            eliminarPaciente(paciente.id)
        }
    }

    const stringData = JSON.stringify(paciente)

    return (
        <>
            <div className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
                <div className='flex justify-center mb-3'>
                    <QRGenerator
                        data={stringData}
                    />
                </div>
                <p className="font-bold mb-3 text-gray-700 uppercase">
                    Nombre: <span className="font-normal normal-case">{paciente.nombre}</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">
                    Propietario: <span className="font-normal normal-case">{paciente.propietario}</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">
                    Email: <span className="font-normal normal-case">{paciente.email}</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">
                    Fecha Alta: <span className="font-normal normal-case">{paciente.alta}</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">
                    Sintomas: <span className="font-normal normal-case">{paciente.sintomas}</span>
                </p>
                <div className="flex justify-between mt-10">
                    <button 
                        type="button" 
                        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-xl"
                        onClick={() => setPaciente(paciente)}
                    >Editar</button>
                    <button 
                        type="button" 
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-xl"
                        onClick={handlerEliminar}
                    >Eliminar</button>
                </div>
                
            </div>
        </>
    )
}

export default Paciente
