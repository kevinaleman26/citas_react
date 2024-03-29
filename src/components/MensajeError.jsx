
const MensajeError = ({children}) => {
    return (
        <div>
            <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-xl">
                <p>{children}</p>
            </div>
        </div>
    )
}

export default MensajeError
