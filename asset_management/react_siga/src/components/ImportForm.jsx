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


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React from "react";
import axiosClient from "../axios-client.js";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ImportForm = () => {
  const [loading, setLoading] = useState(false); //saves the loading state

  const [selectedFile, setSelectedFile] = useState(null); //variable for the selectedFile
  const [successMessage, setSuccessMessage] = useState(null); // success message
  const [errorMessage, setErrorMessage] = useState(null); //error message

  const [brands, setBrands] = useState([]); //saves the brands data
  const [modelos, setModelos] = useState([]); //saves the models data
  const [cats, setCats] = useState([]); //saves the category data
  const [ents, setEnts] = useState([]); //saves the entity data
  const [supplier, setSupplier] = useState([]); //saves the supplier data
  const [units, setUnits] = useState([]); // saves the units data
  const [supplierId, setSupplierId] = useState(""); // saves the state of the supplierId
  const [selectedEntity, setSelectedEntity] = useState(""); //saves the selected entity
  const [selectedBrand, setSelectedBrand] = useState(""); //saves the selected brand

  //message of the error
  const [showMessage, setShowMessage] = useState(false);

  //Saves the state of the popUp visible
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  //returns all objects (called x2times), saves all data of the requests
  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setLoading(false);
      setCats(responses[0].data.cats); //saves all category from the database
      setEnts(responses[0].data.ents); //saves all the entity from the database
      setUnits(responses[0].data.units); //saves all the units from the database
      setSupplier(responses[0].data.suppliers); //saves all suppliers from the database
      setModelos(responses[0].data.models); //saves all models from the database
    });
  }, []);

  //Gets the brand_id of a certain model
  useEffect(() => {
    if (selectedBrand) {
      setLoading(true);
      axiosClient
        .get(`/modelsHb?brand_id=${selectedBrand}`)
        .then((response) => {
          setLoading(false);
          setModelos(response.data);
        });
    } else {
      setModelos([]);
    }
  }, [selectedBrand]);

  //Give options by the relation entity/unit
  useEffect(() => {
    if (selectedEntity) {
      setLoading(true);
      axiosClient.get(`/unitss?ent_id=${selectedEntity}`).then((response) => {
        setLoading(false);
        setUnits(response.data);
      });
    } else {
      setUnits([]);
    }
  }, [selectedEntity]);

  //Timer for the success and error Message
  useEffect(() => {
    if (successMessage || errorMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage, errorMessage]);

  //Asset object template with the parameters by default
  const [asset, setAsset] = useState({
    id: null,
    numb_inv: "",
    numb_ser: "",
    cond: "",
    ala: "",
    ci: "",
    state: "",
    floor: "",
    category: {
      id: "",
      name: "",
    },
    cat_id: "",
    supplier_id: "",
    brand: {
      id: "",
      name: "",
      sig: "",
    },
    brand_id: "",
    ent_id: "",
    date_purch: "",
    model_id: "",
    modelo: {
      id: "",
      model_name: "",
    },
    unit_id: "",
    entity: {
      id: "",
      name: "",
      ent_type: "",
    },
    units: "",
  });

  //state to control the modal confirmation
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //Function to close the modal
  const handleCancelSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

  //Function to show the modal
  const handleSave = () => {
    setShowConfirmModal(true); // Open the confirmation modal
  };

  //-------File checked--------
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //Function to handle the visibility of the information icon
  const handleIconClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  //-------Import handle-------
  const handleImport = async () => {
    setShowConfirmModal(false);

    // Validate file attachment
    if (!selectedFile) {
      setErrorMessage("Por favor, anexe um arquivo CSV.");
      return;
    }

    // Validate required input fields
    if (
      !asset.cat_id ||
      !supplierId ||
      !selectedBrand ||
      !asset.model_id ||
      !selectedEntity
    ) {
      setErrorMessage("Atenção! Preencha todos os campos obrigatórios!");
      return;
    }

    const formData = new FormData();

    //Appends the data to the import file
    formData.append("brand_id", selectedBrand);
    formData.append("cat_id", asset.cat_id);
    formData.append("supplier_id", supplierId);
    formData.append("ent_id", selectedEntity);
    formData.append("unit_id", asset.unit_id);
    formData.append("model_id", asset.model_id);
    formData.append("file", selectedFile);

    // Define the array to hold the validated rows
    let validRows = [];

    // Flag to track file validity
    let isValidFile = true;

    try {
      setLoading(true);

      // Read the file rows and validate them
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        const fileContent = event.target.result;
        const rows = fileContent.split("\n");

        // Check if the last line is empty
        const lastRowIndex = rows.length - 1;
        const lastRow = rows[lastRowIndex].trim(); // Remove leading/trailing whitespace

        if (lastRow === "") {
          rows.pop(); // Remove the last empty row
        }

        //Iterates on all rows
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(",");
          const [numb_inv, date_purch, state, numb_ser, cond, ala, floor, ci] =
            row;

          // Perform your validation logic on the row values
          if (
            validateNumbInv(numb_inv) &&
            validateDatePurch(date_purch) &&
            validateNumbSer(numb_ser) &&
            validateState(state) &&
            validateCond(cond) &&
            validateAla(ala) &&
            validateFloor(floor)
          ) {
            // If the row is valid, create an object with the row data
            const rowData = {
              numb_inv,
              date_purch,
              state,
              numb_ser,
              cond,
              ala: ala || null, // Allow null value for ala
              floor: floor || null, // Allow null value for floor
              ci: ci || null, // Allow null value for ci
            };
            // If the row is valid, add it to the validRows array
            validRows.push(rowData);
          } else {
            // Set the isValidFile flag to false if there is an invalid row
            isValidFile = false;

            //Console log to check what row is giving an error
            /*  console.log(row); */

            break; // Stop processing remaining rows
          }
        }
        if (isValidFile) {
          // Continue with the API call using the validated rows
          formData.append("rows", JSON.stringify(validRows));

          axiosClient
            .post("/import", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.status === 200) {
                setSuccessMessage("Ficheiro importado com sucesso!");
                // Display the message for a time and then reload the page
                axiosClient.get("/assets");
                setTimeout(function () {}, 2000); // 2000 milliseconds = 2 seconds
              } else {
                throw new Error("Erro inesperado do servidor!");
              }
            })
            .catch((error) => {
              if (error.response) {
                // Server responded with an error
                const { data } = error.response;

                if (data && data.message) {
                  setErrorMessage(
                    "Verifique se o nºsérie ou nºinventário se encontra inserido na lista de ativos!"
                  );
                } else {
                  setErrorMessage("Um erro ocorreu ao processar o pedido!");
                }
              } else if (error.message) {
                // Network or request-related error
                setErrorMessage(error.message);
              } else {
                setErrorMessage("Ocorreu um erro desconhecido!");
              }
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setErrorMessage(
            "O arquivo contém linhas inválidas. A importação foi interrompida."
          );
          setLoading(false);
        }
      };

      fileReader.readAsText(selectedFile);
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao ler o arquivo!");
      setLoading(false);
    }
  };

  // Validation function for numb_inv
  const validateNumbInv = (numb_inv) => {
    if (numb_inv.length === 6 && numb_inv.startsWith("0")) {
      return true;
    }

    return false;
  };

  // Validation function for date_purch
  const validateDatePurch = (date_purch) => {
    //Regular expression to check if the data format is valid
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (date_purch && dateRegex.test(date_purch)) {
      const date = new Date(date_purch);

      if (!isNaN(date)) {
        return true;
      }
    }

    return false;
  };

  // Validation function for ala
  const validateAla = (ala) => {
    if (!ala || ["A", "B", "C", "D", "E", "F", "I", "GH"].includes(ala)) {
      return true;
    }
    return false;
  };

  // Validation function for state
  const validateState = (state) => {
    if (state === "Ativo" || state === "Inativo") {
      return true;
    }
    return false;
  };

  // Validation function for condition of the asset
  const validateCond = (cond) => {
    if (
      cond === "Novo" ||
      cond === "Usado" ||
      cond === "Obsoleto" ||
      cond === "Reparação"
    ) {
      return true;
    }
    return false;
  };

  //Validation for the floor of the asset
  const validateFloor = (floor) => {
    if (
      !floor ||
      floor === "-1" ||
      floor === "0" ||
      floor === "1" ||
      floor === "2" ||
      floor === "3" ||
      floor === "4" ||
      floor === "5"
    ) {
      return true;
    }
    return false;
  };

  //Validates serial number
  const validateNumbSer = (numb_ser) => {
    if (!numb_ser) {
      return true; // Accept null values
    }

    if (numb_ser !== null && numb_ser.trim() !== "") {
      return true;
    }
    return false;
  };

  //---------Function handlers-----------
  //Handle the change of brand
  function handleBrandChange(event) {
    const selectedBrand = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      brand_id: selectedBrand,
      model_id: "",
    }));

    setSelectedBrand(selectedBrand);
  }

  //Handle the change of supplier
  const handleSupplierChange = (event) => {
    setSupplierId(event.target.value);
    const newAsset = {
      ...asset,
      supplier_id: event.target.value,
    };
    setAsset(newAsset);
  };

  //Handle the change of entity
  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      ent_id: selectedEntity,
      unit_id: "",
    }));
    setSelectedEntity(selectedEntity);
  };

  //Handle the change of category
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    setAsset({ ...asset, cat_id: selectedCategory });

    setLoading(true);
    axiosClient
      .get(`/brands/category/${selectedCategory}`)
      .then((response) => {
        setLoading(false);
        setBrands(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  //-------------Download template----------------
  const handleDownload = () => {
    axiosClient
      .get("/download-template")
      .then((response) => {
        // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a temporary anchor tag and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template.csv");
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and anchor
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Download falhou:", error);
        setLoading(false);
      });
  };

  return (
    <div id="content">
      <div className="importAsset">
        <Modal show={showConfirmModal} onHide={handleCancelSave}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>{"Deseja importar o ficheiro selecionado?"}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleImport}>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={handleCancelSave}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 className="title-page-all">Importar Ativos</h1>
        <p></p>
        {loading && <div className="caprr-re">A carregar...</div>}
        {!loading && (
          <div>
            <p></p>
            <label htmlFor="fileInput" className="impLab">
              <p></p>
              <p className="camp-obs-mov">*Campo Obrigatório</p>
              <h2>Dados dos ativos:</h2>
            </label>
            <hr className="custom-hr" />
            <p></p>

            {/* ---------- Category ----------*/}
            <label htmlFor="category" className="lb-info">
              Categoria:<label className="cmp-obg">*</label>
              <select
                className="infoInpp"
                name="category"
                id="category"
                value={asset.cat_id}
                onChange={handleCategoryChange}
              >
                <option value=""></option>
                {/* Iterates on all category registered */}
                {cats.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            {/* ---------- Supplier ----------*/}
            <label className="lb-info">
              {" "}
              Fornecedor:<label className="cmp-obg">*</label>
              <select
                className="infoInpp"
                value={asset.supplier_id}
                onChange={handleSupplierChange}
              >
                <option value=""></option>
                {/* Iterates on all suppliers registered */}
                {supplier.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </label>
            {/* --------------Brands--------- */}
            <label className="lb-info">
              {" "}
              Marca:<label className="cmp-obg">*</label>
              <select
                value={asset.brand_id}
                onChange={handleBrandChange}
                className="infoInpp"
              >
                <option value=""></option>
                {/* Iterates on all brands registered */}
                {brands.map((brand, index) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>

            {/* ---------- Models ----------*/}
            <label className="lb-info">
              {" "}
              Modelo:<label className="cmp-obg">*</label>
              <select
                value={asset.model_id}
                className="infoInpp"
                onChange={(event) =>
                  setAsset({ ...asset, model_id: event.target.value })
                }
              >
                <option value=""></option>
                {/* Iterates on all models registered */}
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.name}
                  </option>
                ))}
              </select>
            </label>

            {/* ---------- Entities ----------*/}
            <label htmlFor="entity" className="lb-info">
              Entidade:<label className="cmp-obg">*</label>
              <select
                className="infoInpp"
                name="entity"
                id="entity"
                value={asset.ent_id}
                onChange={handleEntityChange}
              >
                <option value=""></option>
                {/* Iterates on all entitys registered */}
                {ents.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name}
                  </option>
                ))}
              </select>
            </label>
            {/* ---------- Units ----------*/}
            <label htmlFor="unit" className="lb-info">
              Unidade:
              <select
                className="infoInpp"
                name="unit"
                id="unit"
                value={asset.unit_id === null ? "" : asset.unit_id}
                onChange={(event) =>
                  setAsset({ ...asset, unit_id: event.target.value })
                }
              >
                <option value=""></option>
                {/* Iterates on all units registered */}
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>

            {/*------Ficheiro upload de ativos------*/}
            <h5 htmlFor="fileInput" className="impLab">
              <p></p>
              Selecione o Ficheiro para Upload: (Ficheiros .CSV)
            </h5>
            <p></p>
            <div className="importing-file">
              <input
                type="file"
                id="fileInput"
                className="inpImport"
                onChange={handleFileSelect}
              />

              <button onClick={handleSave} className="btn-dwl">
                Importar
              </button>

              <div className="template-dwl">
                {/* Display the link to download the template for the import */}
                <button onClick={handleDownload} className="dwlTemp">
                  Download Template
                </button>
              </div>
            </div>
            {successMessage && <p className="good">{successMessage}</p>}
            {errorMessage && <p className="alert">{errorMessage}</p>}

            <div className="impt-temp">
              <p></p>
              <div className="asset-importt">
                <ul>
                  <div>
                    <i
                      className="fa fa-info-circle"
                      aria-hidden="true"
                      onClick={handleIconClick}
                      title="Informação"
                    >
                      <span className="icon-text">Informação</span>
                    </i>
                    {/*  Information about the template file */}
                    {isPopupVisible && (
                      <div className="popup">
                        <h6 className="asset-import">
                          Atenção! Critérios para ficheiro "Template":
                        </h6>
                        <li className="info-import-tx">
                          Campo <b>"numb_inv"</b>: Iniciar com algarismo{" "}
                          <u>0</u>.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"date_purch"</b>: Inserir um formato de data
                          Ano-Mês-Dia.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"state"</b>: Com valores de <u>Ativo</u> ou{" "}
                          <u>Inativo</u>.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"numb_ser"</b>: Insira um número de série que
                          não exista na base de dados.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"cond"</b>: Com valores de <u>Novo</u>,{" "}
                          <u>Usado</u>, <u>Reparação</u> e <u>Obsoleto</u>.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"ala"</b>: Com valores de <u>B</u>, <u>C</u>,{" "}
                          <u>D</u>, <u>E</u>.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"floor"</b>: Com valores de <u>-1</u>,{" "}
                          <u>0</u>, <u>1</u>, <u>2</u>, <u>3</u>, <u>4</u>,{" "}
                          <u>5</u>.
                        </li>
                        <li className="info-import-tx">
                          Campo <b>"ci"</b>: Inserir CI válido ou "Armazém".
                        </li>
                      </div>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportForm;
