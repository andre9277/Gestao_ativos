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
import React from "react";
import axiosClient from "../axios-client.js";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ImportForm = () => {
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [brands, setBrands] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [cats, setCats] = useState([]);
  const [ents, setEnts] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [units, setUnits] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  //returns all objects (called x2times)
  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setLoading(false);
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      setUnits(responses[0].data.units);
      setSupplier(responses[0].data.suppliers);
      setModelos(responses[0].data.models);
    });
  }, []);

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
      ent_name: "",
      ent_type: "",
    },
    units: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCancelSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

  const handleSave = () => {
    setShowConfirmModal(true); // Open the confirmation modal
  };

  //-------File checked--------
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIconClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  //-------Import handle-------
  const handleImport = async () => {
    setShowConfirmModal(false);
    const formData = new FormData();
    formData.append("brand_id", selectedBrand);
    formData.append("cat_id", asset.cat_id);
    formData.append("supplier_id", supplierId);
    formData.append("ent_id", selectedEntity);
    formData.append("unit_id", asset.unit_id);
    formData.append("model_id", asset.model_id);
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axiosClient.post("/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Ficheiro importado com sucesso!");
      } else {
        throw new Error("Erro inesperado do servidor!");
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  //---------Function handlers-----------
  function handleBrandChange(event) {
    const selectedBrand = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      brand_id: selectedBrand,
      model_id: "",
    }));

    setSelectedBrand(selectedBrand);
  }

  const handleSupplierChange = (event) => {
    setSupplierId(event.target.value);
    const newAsset = {
      ...asset,
      supplier_id: event.target.value,
    };
    setAsset(newAsset);
  };

  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      ent_id: selectedEntity,
      unit_id: "",
    }));
    setSelectedEntity(selectedEntity);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    setAsset({ ...asset, cat_id: selectedCategory });

    setLoading(true);
    axiosClient
      .get(`/brands/category/${selectedCategory}`)
      .then((response) => {
        setLoading(false);
        setBrands(response.data);
        /*       console.log(selectedCategory);
        console.log(brands); */
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
        console.error("Download failed:", error);
        setLoading(false);
      });
  };

  return (
    <div className="importAsset">
      <Modal show={showConfirmModal} onHide={handleCancelSave}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Deseja importar o ficheiro selecionado?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImport}>
            Confirmar
          </Button>
          <Button variant="primary" onClick={handleCancelSave}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="title-page-all">Importar Ativos</h1>

      {loading && <div className="caprr-re">A carregar...</div>}
      {!loading && (
        <div>
          <p></p>
          <p></p>
          <label htmlFor="fileInput" className="impLab">
            <p></p>
            <h2>Dados dos ativos:</h2>
          </label>
          <p className="camp-obs-mov">*Campo Obrigatório</p>
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
              {cats.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
              {modelos.map((modelo) => (
                <option key={modelo.id} value={modelo.id}>
                  {modelo.name}
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
              {supplier.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
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
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </label>
          <p></p>
          <p></p>
          <div>
            <button onClick={handleDownload} className="dwlTemp">
              Download Template
            </button>
          </div>
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
          </div>
          {successMessage && <p className="succMess">{successMessage}</p>}
          {errorMessage && <p className="errMess">{errorMessage}</p>}

          <div className="impt-temp">
            <p></p>
            <div className="asset-importt">
              <ul>
                <li>
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    onClick={handleIconClick}
                  >
                    Informação
                  </i>
                  {isPopupVisible && (
                    <div className="popup">
                      <h6 className="asset-import">
                        Atenção! Critérios para ficheiro "Template":
                      </h6>
                      <li>
                        Campo <b>"numb_inv"</b>: Iniciar com algarismo <u>0</u>.
                      </li>
                      <li>
                        Campo <b>"date_purch"</b>: Inserir um formato de data
                        Ano-Mês-Dia.
                      </li>
                      <li>
                        Campo <b>"state"</b>: Com valores de <u>Ativo</u> ou{" "}
                        <u>Inativo</u>.
                      </li>
                      <li>
                        Campo <b>"numb_ser"</b>: Insira um número de série que
                        não exista na base de dados.
                      </li>
                      <li>
                        Campo <b>"cond"</b>: Com valores de <u>Novo</u>,{" "}
                        <u>Usado</u>, <u>Reparação</u> e <u>Obsoleto</u>.
                      </li>
                      <li>
                        Campo <b>"ala"</b>: Com valores de <u>B</u>, <u>C</u>,{" "}
                        <u>D</u>, <u>E</u>.
                      </li>
                      <li>
                        Campo <b>"floor"</b>: Com valores de <u>-1</u>, <u>0</u>
                        , <u>1</u>, <u>2</u>, <u>3</u>, <u>4</u>, <u>5</u>.
                      </li>
                      <li>
                        Campo <b>"ci"</b>: Inserir CI válido.
                      </li>
                    </div>
                  )}
                </li>
                {/* Other list items */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportForm;
