import { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

const QRReader = () => {
    
    const [data, setData] = useState('No result');

    return (
      <div className="container w-1/2 mx-auto">
        <QrReader
          
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
  
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '100px' }}
        />
        <p>{data}</p>
      </div>
    );
};

export default QRReader;
