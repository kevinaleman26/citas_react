import { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function QRReader({pacientes,setPacientes}) {
  const [data, setData] = useState('');

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            setData(JSON.parse(result.text));
          }
        }}
      />
      <p>{data !== '' ? (
        <>
          <p className="mt-3 text-center mb-3 font-bold text-xl">
              Lector de {' '}
              <span className="text-indigo-600 text-lg">Pacientes</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
              Nombre: <span className="font-normal normal-case">{data.nombre}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
              Propietario: <span className="font-normal normal-case">{data.propietario}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
              Email: <span className="font-normal normal-case">{data.email}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
              Fecha Alta: <span className="font-normal normal-case">{data.alta}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
              Sintomas: <span className="font-normal normal-case">{data.sintomas}</span>
          </p>
          <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setPacientes([...pacientes,data]);
                console.log("Nuevo Registro")
              }}
          >
              Guardar dato
          </button>
        </>
      ) : '' }</p>
    </>
  );
}

export default QRReader;
