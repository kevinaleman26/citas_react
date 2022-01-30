import { QRCode } from "react-qr-svg";

function QRGenerator({data}) {

    return (
        <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 170 }}
            value={data}
        />
    );
};

export default QRGenerator;