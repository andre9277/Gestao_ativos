import React, { useState, useEffect } from "react";
import Quagga from "quagga";

const Scan = () => {
  const [barcode, setBarcode] = useState("");

  function initializeBarcodeScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "upc_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Barcode scanner initialized.");
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      console.log("Barcode detected:", result.codeResult.code);
      setBarcode(result.codeResult.code);
      drawLine(result.codeResult);
      Quagga.stop();
    });
  }

  useEffect(() => {
    initializeBarcodeScanner();
  }, []);

  function drawLine(code) {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const x = Math.min(code.startX, code.endX);
    const y = Math.min(code.startY, code.endY);
    const width = Math.abs(code.endX - code.startX);
    const height = Math.abs(code.endY - code.startY);
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <div
        id="scanner-container"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <video style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <p>Barcode: {barcode}</p>
    </div>
  );
};

export default Scan;
