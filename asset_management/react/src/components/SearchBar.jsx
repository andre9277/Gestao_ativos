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
import axiosClient from "../axios-client.js";
import "../styles/SearchBar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [assetNumber, setAssetNumber] = useState("");
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets();
  }, []);

  //Performs a client access request
  const getAssets = (url) => {
    url = url || "/allAssets";

    axiosClient.get(url).then(({ data }) => {
      setAssets(data.data);
    });
  };

  const handleChange = (event) => {
    setAssetNumber(event.target.value);
  };

  //Binary Search to improve performance in search
  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid].numb_inv === target || arr[mid].numb_ser === target) {
        return arr[mid];
      } else if (arr[mid].numb_inv < target || arr[mid].numb_ser < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Sort the assets array by asset number (assuming it's not already sorted)
    const sortedAssets = [...assets].sort(
      (a, b) =>
        a.numb_inv.localeCompare(b.numb_inv) ||
        a.numb_ser.localeCompare(b.numb_ser)
    );

    // Search for the asset by asset number or serial number using binary search
    const matchedAsset = binarySearch(sortedAssets, assetNumber);

    if (matchedAsset) {
      navigate(`/infoasset/${matchedAsset.id}`);
    } else {
      navigate("/*");
    }

    setAssetNumber("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-inline mr-auto w-100 navbar-search"
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="Nº Inventário\Série"
          value={assetNumber}
          onChange={handleChange}
          className="form-control border-0 ssBar"
        />
        <button
          type="submit"
          className="botaosearch fas fa-search fa-sm"
        ></button>
        {/*Icon bar code for users to scan */}
        <Link to="/scan">
          <i className="fa fa-barcode fa-2x" aria-hidden="true"></i>
        </Link>
      </div>
    </form>
  );
};

export default Search;
