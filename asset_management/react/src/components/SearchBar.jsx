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
import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import "../styles/SearchBar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [assetNumber, setAssetNumber] = useState("");

  const handleChange = (event) => {
    setAssetNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (assetNumber.trim() !== "") {
      try {
        const response = await axiosClient.get(
          `/assetSearch?numb_inv=${assetNumber}`
        );

        const responseSer = await axiosClient.get(
          `/assetSearchSer?numb_ser=${assetNumber}`
        );

        if (responseSer.data.length === 0) {
          const assetId = response.data[0].id; // Assuming the response contains the asset ID
          navigate(`/infoasset/${assetId}`);
        } else {
          const assetId = responseSer.data[0].id;
          navigate(`/infoasset/${assetId}`);
        }
      } catch (error) {
        navigate("/*");
      }
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
