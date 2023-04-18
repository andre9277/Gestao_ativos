import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import "../styles/SearchBar.css";

const Search = ({ setResults }) => {
  const [inputText, setInputText] = useState("");

  const getAssets = (url, value) => {
    url = url || "/assets";

    axiosClient.get(url, { params: { numb_ser: value } }).then(({ data }) => {
      const assets = data.data;
      const results = assets.filter((asset) => {
        return (
          value &&
          asset &&
          asset.numb_ser &&
          asset.numb_ser.toUpperCase().includes(value)
        );
      });
      //console.log(results);
      setResults(results);
    });
  };

  const handleChange = (value) => {
    setInputText(value);
    getAssets("", value);
  };

  return (
    <div>
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Procure o ativo..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(e) => handleChange(e.target.value)}
            value={inputText}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
