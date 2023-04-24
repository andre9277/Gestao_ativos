import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";

const Scan = () => {
  const [barcode, setBarcode] = useState("");
  const [assets, setAssets] = useState([]);

  const navigate = useNavigate();
  /* 
  const getAssets = async () => {
    const response = await axiosClient.get("/assets");
    console.log(response.data.data);
    setAssets(response.data.data);
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

  useEffect(() => {
    initializeBarcodeScanner();
  }, []); */

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
