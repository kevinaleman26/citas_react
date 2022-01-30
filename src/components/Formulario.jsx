import {useState, useEffect} from 'react'
import MensajeError from './MensajeError';
import QRReader from './QRReader'

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [alta,setAlta] = useState('');
    const [sintomas,setSintomas] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [error, setError] = useState(false)

    useEffect(() => {

        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }

    },[paciente])
    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handlerSubmit = (e) => {

        e.preventDefault()

        // Validamos los campos del formulario
        if([nombre,propietario,email,alta,sintomas].includes('')){
            console.log("Hay algun campo vacio")
            setError(true)
            return
        }

        console.log("Enviando formulario")

        setError(false)

        // Objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }

        if(paciente.id){

            objetoPaciente.id = paciente.id
            const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id 
                ? objetoPaciente : pacienteState)
            setPacientes(pacienteActualizado);   
            setPaciente({}) 
            console.log("Editando")
        } else {

            const id = generarId()
            objetoPaciente.id = id
            setPacientes([...pacientes,objetoPaciente]);
            console.log("Nuevo Registro")
        }

        
        // reiniciar formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setAlta('')
        setSintomas('')

    }

    return (
        <div className="md:w-1/2 lg:w-3/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Aniade pacientes y {' '}
                <span className="text-indigo-600 font-bold text-lg">Administralos</span>
            </p>
            <form 
                className="bg-white shadow-md rounded py-10 px-5 mb-10"
                onSubmit={handlerSubmit}
            >
                {error && (
                    <MensajeError>Todos los campos son obligatorios.</MensajeError>
                )}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        id="mascota"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del Propietario</label>
                    <input
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        type="email"
                        placeholder="Correo Electronico"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input
                        type="date"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        id="alta"
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer" 
                    value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                />

                <button
                        className="bg-pink-500 text-white active:bg-pink-600 hover:bg-pink-700 font-bold uppercase w-full p-3 cursor-pointer"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Leer QR
                    </button>
                    {showModal ? (
                        <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-xl font-semibold">
                                   Lector de Codigo
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                    <QRReader
                                        pacientes={pacientes}
                                        setPacientes={setPacientes}
                                    />
                                </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
            </form>
        </div>
    )
}

export default Formulario
