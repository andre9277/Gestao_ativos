import React from "react";
import axiosClient from "../axios-client.js";
import { useState } from "react";

const ImportForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosClient.post("/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="importAsset">
      <h1>Importar Ativos</h1>
      <div>
        <p></p>
        <label htmlFor="fileInput" className="impLab">
          Selecione o Ficheiro:
        </label>
        <input
          type="file"
          id="fileInput"
          className="inpImport"
          onChange={handleFileSelect}
        />
      </div>
      <button onClick={handleImport} className="btn-dwl">
        Importar
      </button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ImportForm;
