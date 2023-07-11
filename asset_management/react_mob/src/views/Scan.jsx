/* The MIT License (MIT)

Copyright (c) 2013-2023 Start Bootstrap LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 

You may obtain a copy of the license at:

      https://github.com/StartBootstrap/startbootstrap-sb-admin-2


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/Scan.css";

const Scan = () => {
  const [barcode, setBarcode] = useState("");
  const [assets, setAssets] = useState([]);

  const navigate = useNavigate();

  const getAssets = async () => {
    const response = await axiosClient.get("/allAssets");
    console.log(response.data.data);
    setAssets(response.data.data);
    initializeBarcodeScanner();
  };

  useEffect(() => {
    getAssets();

    return () => {
      stopBarcodeScanner();
    };
  }, []);
  useEffect(() => {
    Quagga.onDetected((result) => {
      console.log("Barcode detected:", result.codeResult.code);
      setBarcode(result.codeResult.code);

      // Look up the asset by inventory number
      const inventoryNumber = result.codeResult.code;
      console.log("asset", assets);
      const foundAsset = assets.find(
        (asset) => asset.numb_inv === inventoryNumber
      );
      console.log("Asset encontrado:", foundAsset);

      // Redirect to corresponding asset page or new asset page
      if (foundAsset) {
        navigate(`/infoasset/${foundAsset.id}`);
        Quagga.stop();
      } else {
        navigate("/assets/new");
        Quagga.stop();
      }
    });

    return () => {
      Quagga.offDetected(); // Unbind the detected event on component unmount
    };
  }, [assets, navigate]);

  let barcodeScannerInitialized = false; // flag to track if the barcode scanner has been initialized

  function initializeBarcodeScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 100, // adjust the width as needed
            height: 100, // adjust the height as needed
          },
          scan: true, // added property
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "upc_reader"],
        },
        debug: false, // disable debug canvas
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Barcode scanner initialized.");
        Quagga.start();
        barcodeScannerInitialized = true;
      }
    );

    Quagga.onProcessed((result) => {
      const drawingCanvas = document.querySelector(".drawingBuffer");
      const drawingCtx = drawingCanvas.getContext("2d");

      // clear canvas
      drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

      // draw detection result
      if (
        result &&
        result.codeResult &&
        result.codeResult.box &&
        result.codeResult.box.length >= 3
      ) {
        const { box } = result.codeResult;

        // draw rectangle around barcode area
        drawingCtx.strokeStyle = "red";
        drawingCtx.lineWidth = 2;
        drawingCtx.beginPath();
        drawingCtx.rect(
          box[0].x,
          box[0].y,
          box[2].x - box[0].x,
          box[2].y - box[0].y
        );
        drawingCtx.closePath();
        drawingCtx.stroke();
      } else {
        // draw rectangle in the middle of the scanner area
        const canvasWidth = drawingCanvas.width;
        const canvasHeight = drawingCanvas.height;
        const rectWidth = canvasWidth * 0.5; // adjust rectangle width as needed
        const rectHeight = canvasHeight * 0.3; // adjust rectangle height as needed
        const rectX = (canvasWidth - rectWidth) / 2;
        const rectY = (canvasHeight - rectHeight) / 2;

        drawingCtx.strokeStyle = "red";
        drawingCtx.lineWidth = 2;
        drawingCtx.beginPath();
        drawingCtx.rect(rectX, rectY, rectWidth, rectHeight);
        drawingCtx.closePath();
        drawingCtx.stroke();
      }
    });
  }
  function stopBarcodeScanner() {
    if (barcodeScannerInitialized) {
      Quagga.stop();
      barcodeScannerInitialized = false;
    }
  }

  return (
    <div className="mn-cnt-bc">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Barcode Scanner</h1>
      </div>
      <div id="scanner-container" className="row">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <video
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none", // prevent canvas from capturing mouse/touch events
              zIndex: 1, // position canvas on top of video
            }}
          />
        </div>

        <p>Barcode: {barcode}</p>
      </div>
    </div>
  );
};

export default Scan;
