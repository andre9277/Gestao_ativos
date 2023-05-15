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


All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React, { useState, useEffect, useRef } from "react";
import Quagga from "quagga";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";

const Scan = () => {
  const [barcode, setBarcode] = useState("");
  const [assets, setAssets] = useState([]);

  const navigate = useNavigate();

  const getAssets = async () => {
    const response = await axiosClient.get("/assets");
    console.log(response.data.data);
    setAssets(response.data.data);
    initializeBarcodeScanner();
  };

  useEffect(() => {
    getAssets();
  }, []);

  useEffect(() => {
    Quagga.onDetected((result) => {
      console.log("Barcode detected:", result.codeResult.code);
      setBarcode(result.codeResult.code);

      // Look up the asset by inventory number
      const inventoryNumber = result.codeResult.code;
      console.log("eer", assets);
      const foundAsset = assets.find((asset) => {
        return asset.numb_inv === inventoryNumber;
      });
      console.log("Found Asset:", foundAsset);

      // Redirect to corresponding asset page
      if (foundAsset) {
        navigate(`/infoasset/${foundAsset.id}`);
        Quagga.stop();
      }
    });
  }, [assets, navigate]);

  function initializeBarcodeScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
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
      }
    );

    Quagga.onProcessed((result) => {
      const drawingCanvas = document.querySelector(".drawingBuffer");
      const drawingCtx = drawingCanvas.getContext("2d");

      // clear canvas
      drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

      // draw detection result
      if (result && result.codeResult) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: "x", y: "y" },
          drawingCtx,
          {
            color: "green",
            lineWidth: 4,
          }
        );
      }
    });
  }

  return (
    <>
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
    </>
  );
};

export default Scan;
