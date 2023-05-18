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

  //returns all objects (called x2times)
  useEffect(() => {
    getCats();
    getEnts();
    getModels_HB();
    getBrands();
    getSuppliers();
    getUnits();
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

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);

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

  //-------File checked--------
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //-------Import handle-------
  const handleImport = async () => {
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

      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Get the values for the selected box´s
  const getModels_HB = (url) => {
    url = url || "/modelos";

    axiosClient.get(url).then(({ data }) => {
      setModelos(data);
    });
  };

  const getBrands = (url) => {
    url = url || "/brands";

    axiosClient.get(url).then(({ data }) => {
      setBrands(data);
    });
  };

  const getCats = (url) => {
    url = url || "/categories";

    axiosClient.get(url).then(({ data }) => {
      setCats(data);
    });
  };

  const getEnts = (url) => {
    url = url || "/entities";

    axiosClient.get(url).then(({ data }) => {
      setEnts(data);
    });
  };

  const getSuppliers = (url) => {
    url = url || "supplier";

    axiosClient.get(url).then(({ data }) => {
      setSupplier(data);
    });
  };

  const getUnits = (url) => {
    url = url || "units";
    axiosClient.get(url).then(({ data }) => {
      setUnits(data);
    });
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

  function handleSupplierChange(event) {
    setSupplierId(event.target.value);
    const newAsset = {
      ...asset,
      supplier_id: event.target.value,
    };
    setAsset(newAsset);
  }

  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      ent_id: selectedEntity,
      unit_id: "",
    }));
    setSelectedEntity(selectedEntity);
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
      <h1>Importar Ativos</h1>
      {loading && <div className="caprr-re">Carregando...</div>}
      {!loading && (
        <div>
          <p></p>
          <label htmlFor="fileInput" className="impLab">
            Preencha os campos dos ativos a inserir:
          </label>
          <p></p>

          {/* ---------- Category ----------*/}
          <label htmlFor="category" className="lb-info">
            Categoria:
            <select
              className="form-select"
              name="category"
              id="category"
              value={asset.cat_id}
              onChange={(event) =>
                setAsset({ ...asset, cat_id: event.target.value })
              }
            >
              <option value="">Selecione a Categoria ...</option>
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
            Marca*:
            <select
              value={asset.brand_id}
              onChange={handleBrandChange}
              className="form-select"
            >
              <option value="">Selecione uma Marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.sig}
                </option>
              ))}
            </select>
          </label>

          {/* ---------- Models ----------*/}
          <label className="lb-info">
            {" "}
            Modelo*:
            <select
              value={asset.model_id}
              className="form-select"
              onChange={(event) =>
                setAsset({ ...asset, model_id: event.target.value })
              }
            >
              <option value="">Selecione um Modelo</option>
              {modelos.map((modelo) => (
                <option key={modelo.id} value={modelo.id}>
                  {modelo.model_name}
                </option>
              ))}
            </select>
          </label>

          {/* ---------- Supplier ----------*/}
          <label className="lb-info">
            {" "}
            Fornecedor*:
            <select
              className="form-select"
              value={asset.supplier_id}
              onChange={handleSupplierChange}
            >
              <option value="">Selecione um Fornecedor</option>
              {supplier.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
          </label>

          {/* ---------- Entities ----------*/}
          <label htmlFor="entity" className="lb-info">
            Entidade:
            <select
              className="form-select"
              name="entity"
              id="entity"
              value={asset.ent_id}
              onChange={handleEntityChange}
            >
              <option value="">Selecione a Entidade ...</option>
              {ents.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.ent_name}
                </option>
              ))}
            </select>
          </label>
          {/* ---------- Units ----------*/}
          <label htmlFor="unit" className="lb-info">
            Unidade:
            <select
              className="form-select"
              name="unit"
              id="unit"
              value={asset.unit_id === null ? "" : asset.unit_id}
              onChange={(event) =>
                setAsset({ ...asset, unit_id: event.target.value })
              }
            >
              <option value="">Selecione a Unidade ...</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </label>
          <p></p>
          <p></p>

          {/*------Ficheiro upload de ativos------*/}
          <h5 htmlFor="fileInput" className="impLab">
            Selecione o Ficheiro para Upload: (Ficheiros .CSV)
          </h5>

          <input
            type="file"
            id="fileInput"
            className="inpImport"
            onChange={handleFileSelect}
          />
          <button onClick={handleImport} className="btn-dwl">
            Importar
          </button>
          {successMessage && <p className="succMess">{successMessage}</p>}
          {errorMessage && <p className="errMess">{errorMessage}</p>}

          <button onClick={handleDownload} className="dwlTemp">
            Download Template
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportForm;
