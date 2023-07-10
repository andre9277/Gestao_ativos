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
import { useEffect, useState, useRef } from "react";
import axiosClient from "../axios-client.js";
import "../styles/assets.css";
import barcode from "../assets/barcode.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Assets() {
  const navigate = useNavigate();

  const [assetNumber, setAssetNumber] = useState("");
  const [assets, setAssets] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  //display the error message for 2 seconds
  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Display for 2 seconds (2000 milliseconds)
    }
    return () => clearTimeout(timer); // Clear the timer if component unmounts or if the error message changes
  }, [errorMessage]);

  useEffect(() => {
    getAssets();
  }, []);

  //Performs a client access request
  useEffect(() => {
    getAssets();
  }, []);
  const getAssets = (url) => {
    url = url || "/allAssets";

    axiosClient.get(url).then(({ data }) => {
      setAssets(data.data);
    });
  };

  //gets the value of the input by the user
  const handleChange = (event) => {
    setAssetNumber(event.target.value);
  };

  //Binary Search to improve performance in search by serial number
  const searchByNumbSer = (arr, target) => {
    if (arr[0].numb_ser === target) {
      return arr[0];
    }

    let left = 1;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentAsset = arr[mid];

      if (currentAsset.numb_ser === target) {
        return currentAsset;
      }

      if (currentAsset.numb_ser < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return null;
  };
  //Binary Search to improve performance in search by inventory number
  const searchByNumbInv = (arr, target) => {
    if (arr[0].numb_inv === target) {
      return arr[0];
    }

    let left = 1;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentAsset = arr[mid];

      if (currentAsset.numb_inv === target) {
        return currentAsset;
      }

      if (currentAsset.numb_inv < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!assetNumber) {
      setErrorMessage("Por favor insira algum valor!");
      return;
    }

    // Sort the assets array by asset number (assuming it's not already sorted)
    const sortedAssets = [...assets].sort((a, b) => {
      if (a.numb_ser === null && b.numb_ser === null) {
        return a.id.localeCompare(b.id); // Sort by ID if both ser are null
      } else if (a.numb_ser === null) {
        return 1; // Put null ser at the end
      } else if (b.numb_ser === null) {
        return -1; // Put null ser at the end
      } else {
        return a.numb_ser.localeCompare(b.numb_ser);
      }
    });

    let matchedAsset;

    if (assetNumber.length > 6) {
      matchedAsset = searchByNumbSer(sortedAssets, assetNumber);
    } else {
      matchedAsset = searchByNumbInv(sortedAssets, assetNumber);
    }

    if (matchedAsset) {
      navigate(`/infoasset/${matchedAsset.id}`);
    } else {
      setErrorMessage("Não encontrado, tente novamente!");
    }

    setAssetNumber("");
  };

  return (
    <div className="mn-cnt">
      <form onSubmit={handleSubmit}>
        <div className="space-mov"></div>
        <h1 className="search-tit">Procura</h1>
        <div className="space-mov"></div>
        <div className="icon-search">
          <label className="lb-sch">Nº inventário/série:</label>
          <input
            className="inp-search"
            value={assetNumber}
            onChange={handleChange}
          ></input>
        </div>
        <div className="search-sch">
          <button className="btn-sch-mb">Procurar</button>
        </div>
        <div className="error-search">
          {errorMessage && (
            <p className="err-search">
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
              {" " + errorMessage}
            </p>
          )}
        </div>
        <div className="barcode-search">
          <label className="lb-sch-bc">Código de barras:</label>
          <center>
            <Link to="/scan">
              <img
                src={barcode}
                alt="Barcode image"
                className="w-100-new"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </Link>
          </center>
        </div>
        <p></p>
      </form>
    </div>
  );
}
