import {useState, useEffect} from 'react'
import MensajeError from './MensajeError';

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [alta,setAlta] = useState('');
    const [sintomas,setSintomas] = useState('');

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
            </form>
        </div>
    )
}

export default Formulario
