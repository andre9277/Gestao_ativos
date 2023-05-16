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

const Search = ({ setResults }) => {
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  const getAssets = (url, value) => {
    url = url || "/allAssets";

    axiosClient.get(url, { params: { numb_inv: value } }).then(({ data }) => {
      const assets = data.data;

      const results = assets.filter((asset) => {
        return (
          value &&
          asset &&
          asset.numb_inv &&
          asset.numb_inv.toUpperCase().includes(value)
        );
      });
      setResults(results);
      if (results.length === 1) {
        navigate(`/infoasset/${results[0].id}`); // add this line
      }
    });
  };

  const handleChange = (value) => {
    setInputText(value);
    getAssets("", value);
  };

  return (
    <div>
      <form className="className=form-inline mr-auto w-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control border-0 small ssBar"
            placeholder="Procure o ativo..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(e) => handleChange(e.target.value)}
            value={inputText}
          />
          <div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                getAssets("", inputText);
              }}
            >
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
