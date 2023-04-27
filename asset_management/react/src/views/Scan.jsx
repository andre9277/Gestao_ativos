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
import React, { useState, useEffect } from "react";
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
      drawLine(result.codeResult);

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
  }, [assets]);

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
  }

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
