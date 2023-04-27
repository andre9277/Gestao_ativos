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
    <div>
      <h1>Import Form</h1>
      <div>
        <label htmlFor="fileInput">Select File:</label>
        <input type="file" id="fileInput" onChange={handleFileSelect} />
      </div>
      <button onClick={handleImport}>Import</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ImportForm;
