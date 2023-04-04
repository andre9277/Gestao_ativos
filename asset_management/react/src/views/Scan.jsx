import React, { useState } from "react";
import BarcodeScan from "./BarcodeScan";

const Scan = () => {
  const [barcode, setBarcode] = useState("");

  const handleBarcodeDetected = (code) => {
    setBarcode(code);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScan onDetected={handleBarcodeDetected} />
      <p>{barcode}</p>
    </div>
  );
};

export default Scan;
