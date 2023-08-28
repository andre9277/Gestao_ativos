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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Modal, Button } from "react-bootstrap";

export default function AssetForm() {
  const [errors, setErrors] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //Meanwhile the table isnt loading we show a loading string
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();

  //States to get the list of selected options
  const [cats, setCats] = useState([]);
  const [ents, setEnts] = useState([]);
  const [units, setUnits] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [supplierId, setSupplierId] = useState("");

  //List of assets:
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
    import_type: "",
  });

  //Allows the navigation of the assets to other page
  const navigate = useNavigate();

  //We take the id
  let { id } = useParams();
  const isEditing = id !== undefined;

  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setLoading(false);
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      setUnits(responses[0].data.units);
      //setBrands(responses[0].data.brands);
      setModelos(responses[0].data.models);
      setSupplier(responses[0].data.suppliers);
    });
  }, []);

  //Whenever the asset ID exists:
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/assets/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setAsset(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

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
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null); // Clear the error messages after 15 seconds
      }, 15000);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
      };
    }
  }, [errors]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    // Open the confirmation modal
    setShowConfirmModal(true);
  };

  //When the user submits the request
  const handleConfirmSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
    if (asset.id) {
      // Update existing asset
      setLoading(true);
      axiosClient
        .put(`/assets/${asset.id}`, asset)
        .then(() => {
          setLoading(false);
          setNotification("Ativo atualizado com sucesso!");
          navigate("/assets");
        })
        .catch((err) => {
          setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);

            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    } else {
      // Add new asset
      axiosClient
        .post("/assets", asset)
        .then(() => {
          setNotification("Ativo adicionado com sucesso!");
          navigate("/assets");
          window.location.reload(); // Refresh the page
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);

            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCancelSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

  const handleSave = () => {
    setShowConfirmModal(true); // Open the confirmation modal
  };

  //---------Functions that allow the change of some values-------------
  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      ent_id: selectedEntity,
      unit_id: "",
    }));
    setSelectedEntity(selectedEntity);
  };

  //Handle Brand change on assetForm
  function handleBrandChange(event) {
    const selectedBrand = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      brand_id: selectedBrand,
      model_id: "",
    }));

    setSelectedBrand(selectedBrand);
  }

  //Handle Supplier change on assetForm
  function handleSupplierChange(event) {
    setSupplierId(event.target.value);
    const newAsset = {
      ...asset,
      supplier_id: event.target.value,
    };
    setAsset(newAsset);
  }

  //Handle Category change on assetForm
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    setAsset({ ...asset, cat_id: selectedCategory });

    setLoading(true);
    axiosClient
      .get(`/brands/category/${selectedCategory}`)
      .then((response) => {
        setLoading(false);
        setBrands(response.data);
        /*  console.log(selectedCategory);
        console.log(brands); */
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  //Reset Filter of the assets forms
  const resetFilter = () => {
    // Reset all the values to empty or default

    setAsset({
      numb_inv: "",
      numb_ser: "",
      cat_id: "",
      brand_id: "",
      model_id: "",
      cond: "",
      state: "",
      date_purch: "",
      supplier_id: "",
      ci: "",
      ent_id: "",
      unit_id: "",
      floor: "",
      ala: "",
      obs: "",
    });
  };

  //handles data change of the filter from assetForm
  const handleDateChange = (ev) => {
    const enteredDate = ev.target.value;

    // Check if the entered date is valid
    if (enteredDate && !isValidDate(enteredDate)) {
      // Date is invalid, set the error message
      setErrorMessage("Data inválida");
      setAsset({ ...asset, date_purch: "" });

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      // Date is valid, clear the error message and update the state
      setErrorMessage("");
      setAsset({ ...asset, date_purch: enteredDate });
    }
  };

  //Checks if date is valid of filter
  const isValidDate = (dateString) => {
    // Check if the input is in the format "YYYY-MM-DD"
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Check if the date is valid
    const date = new Date(dateString);
    const year = date.getFullYear();
    const isValid = !isNaN(date.getTime()) && year >= 2000 && year <= 2040;
    return isValid;
  };

  return (
    <>
      {" "}
      <Modal show={showConfirmModal} onHide={handleCancelSave}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {asset.id
            ? "Deseja atualizar o Ativo selecionado?"
            : "Deseja adicionar o Ativo?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmSave}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={handleCancelSave}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {asset.id && (
        <h1 className="title-page-all">Atualizar Ativo: {asset.numb_inv}</h1>
      )}
      {!asset.id && <h1 className="title-page-all">Novo Ativo</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="caprr-re">A carregar...</div>}

        {!loading && (
          <form onSubmit={onSubmit} className="assetForm-assett">
            <p className="camp-obs">*Campo Obrigatório</p>
            {/* ---------- Inventory Number ----------*/}
            <h1 className="title-page-all-sub">Dados Gerais</h1>
            <hr className="custom-hr" />
            <p></p>
            <label className="lb-info">
              {" "}
              <label className="labelofLabel">
                {" "}
                Nº de inventário:<label className="cmp-obg">*</label>
              </label>
              <input
                value={asset.numb_inv === null ? "" : asset.numb_inv}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_inv: ev.target.value })
                }
                className={`infoInp ${
                  errors && errors.numb_inv ? "error-input" : ""
                }`}
              />
              {errors && errors.numb_inv && (
                <div className="alert">{errors.numb_inv[0]}</div>
              )}
            </label>

            {/* ---------- Serial Number ----------*/}
            <label className="lb-info">
              {" "}
              <label className="labelofLabel">Nº de série:</label>
              <input
                value={asset.numb_ser}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_ser: ev.target.value })
                }
                className={`infoInp ${
                  errors && errors.numb_ser ? "error-input" : ""
                }`}
              />
              {errors && errors.numb_ser && (
                <div className="alert">{errors.numb_ser[0]}</div>
              )}
            </label>

            {/* ---------- Category ----------*/}
            <label htmlFor="category" className="lb-info">
              <label className="labelofLabel">
                {" "}
                Categoria:<label className="cmp-obg">*</label>
              </label>
              <select
                className={`infoInp-select ${
                  errors && errors.cat_id ? "error-input" : ""
                }`}
                name="category"
                id="category"
                value={asset.cat_id}
                onChange={handleCategoryChange}
                required
              >
                <option value=""></option>
                {cats.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors && errors.cat_id && (
                <div className="alert">{errors.cat_id[0]}</div>
              )}
            </label>
            {/* ---------- Status ----------*/}
            <label htmlFor="estado" className="lb-info">
              <label className="labelofLabel">
                Estado:<label className="cmp-obg">*</label>
              </label>
              <select
                className={`infoInp-select ${
                  errors && errors.state ? "error-input" : ""
                }`}
                name="estado"
                id="estado"
                value={asset.state}
                onChange={(event) =>
                  setAsset({ ...asset, state: event.target.value })
                }
                required
              >
                <option value=""></option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>

              {errors && errors.state && (
                <div className="alert">{errors.state[0]}</div>
              )}
            </label>
            {/* ---------- Brands ----------*/}
            <label className="lb-info">
              <label className="labelofLabel">
                {" "}
                Marca:<label className="cmp-obg">*</label>
              </label>
              <select
                value={asset.brand_id}
                onChange={handleBrandChange}
                className={`infoInp-select ${
                  errors && errors.brand_id ? "error-input" : ""
                }`}
              >
                {brands.length != 0 ? <option value=""></option> : ""}
                {brands.length === 0 ? (
                  <option>{asset.brand && asset.brand.name}</option> // Add null check for asset.brand
                ) : (
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))
                )}
              </select>
              {errors && errors.brand_id && (
                <div className="alert">{errors.brand_id[0]}</div>
              )}
            </label>

            {/* ---------- Models ----------*/}
            <label className="lb-info">
              <label className="labelofLabel">
                {" "}
                Modelo:<label className="cmp-obg">*</label>
              </label>
              <select
                value={asset.model_id}
                className={`infoInp-select ${
                  errors && errors.model_id ? "error-input" : ""
                }`}
                onChange={(event) =>
                  setAsset({ ...asset, model_id: event.target.value })
                }
                required
              >
                <option value=""></option>
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.name}
                  </option>
                ))}
              </select>
              {errors && errors.model_id && (
                <div className="alert">{errors.model_id[0]}</div>
              )}
            </label>

            <div className="localAsset-cond">
              {/* ---------- Condition ----------*/}
              <label htmlFor="condicao" className="lb-info">
                <label className="labelofLabel">
                  Condição:<label className="cmp-obg">*</label>
                </label>
                <select
                  className={`infoInp-select ${
                    errors && errors.cond ? "error-input" : ""
                  }`}
                  name="condicao"
                  id="condicao"
                  value={asset.cond === "Transferência" ? "Usado" : asset.cond}
                  onChange={(event) =>
                    setAsset({ ...asset, cond: event.target.value })
                  }
                  required
                >
                  <option value=""></option>
                  <option value="Novo">Novo</option>
                  <option value="Usado">Usado</option>
                  <option value="Reparação">Reparação</option>
                  <option value="Obsoleto">Obsoleto</option>
                </select>
                {errors && errors.cond && (
                  <div className="alert">{errors.cond[0]}</div>
                )}
              </label>

              {/* ---------- Date of purchase ----------*/}
              <label className="lb-info">
                {" "}
                <label className="labelofLabel">
                  Data de Compra:<label className="cmp-obg">*</label>
                </label>
                <input
                  className={`form-calendar-asset ${
                    errors && errors.date_purch ? "error" : ""
                  }`}
                  type="date"
                  value={asset.date_purch}
                  onChange={handleDateChange}
                  placeholder="YYYY-MM-DD"
                />
                {errorMessage && <p className="alert">{errorMessage}</p>}
                {errors && errors.date_purch && (
                  <div className="alert">{errors.date_purch[0]}</div>
                )}
              </label>
              {/* ---------- Supplier ----------*/}
              <label className="lb-info">
                {" "}
                <label className="labelofLabel">
                  {" "}
                  Fornecedor:<label className="cmp-obg">*</label>
                </label>
                <select
                  className={`infoInp-select ${
                    errors && errors.supplier_id ? "error-input" : ""
                  }`}
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
                {errors && errors.supplier_id && (
                  <div className="alert">{errors.supplier_id[0]}</div>
                )}
              </label>
            </div>
            <div className="space-mov"></div>
            <div className="localAsset-local">
              <h1 className="title-page-all-sub">Localização </h1>
              <hr className="custom-hr" />
              <p></p>

              {/* ---------- Entities ---------- */}
              <label htmlFor="entity" className="lb-info">
                <label className="labelofLabel">
                  Entidade:<label className="cmp-obg">*</label>
                </label>
                <select
                  className={`infoInp-select ${
                    errors && errors.ent_id ? "error-input" : ""
                  }`}
                  name="entity"
                  id="entity"
                  value={asset.ent_id}
                  onChange={handleEntityChange}
                  disabled={isEditing} // Disable when editing
                >
                  <option value=""></option>
                  {ents.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {ent.name}
                    </option>
                  ))}
                </select>
                {errors && errors.ent_id && (
                  <div className="alert">{errors.ent_id[0]}</div>
                )}
              </label>

              {/* ---------- Units ---------- */}
              <label htmlFor="unit" className="lb-info">
                <label className="labelofLabel">Unidade: </label>
                <select
                  className="infoInp"
                  name="unit"
                  id="unit"
                  value={asset.unit_id === null ? "" : asset.unit_id}
                  onChange={(event) =>
                    setAsset({ ...asset, unit_id: event.target.value })
                  }
                  disabled={isEditing || !units.length || !asset.ent_id} // Disable when editing
                >
                  <option value=""></option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* ---------- CI ----------*/}

              <label className="lb-info">
                <label className="labelofLabel">
                  CI:<label className="cmp-obg">*</label>
                </label>
                <input
                  value={asset.ci === null ? "" : asset.ci}
                  onChange={(ev) => setAsset({ ...asset, ci: ev.target.value })}
                  className={`infoInp ${
                    errors && errors.ci ? "error-input" : ""
                  } ${isEditing ? "disabled-input" : ""}`}
                  disabled={isEditing} // Disable the input field when editing
                />
                {errors && errors.ci && (
                  <div className="alert">{errors.ci[0]}</div>
                )}
              </label>

              {/* ---------- Floor ----------*/}
              <label htmlFor="floor" className="lb-info">
                <label className="labelofLabel">Piso: </label>
                <select
                  className="infoInp"
                  name="floor"
                  id="floor"
                  value={asset.floor === null ? "" : asset.floor}
                  onChange={(event) =>
                    setAsset({ ...asset, floor: event.target.value })
                  }
                >
                  <option value=""></option>
                  <option value="-1">-1</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              {/* ---------- Ala ----------*/}
              <label htmlFor="ala" className="lb-info">
                <label className="labelofLabel"> Ala: </label>
                <select
                  className="infoInp-select"
                  name="ala"
                  id="ala"
                  value={asset.ala === null ? "" : asset.ala}
                  onChange={(event) =>
                    setAsset({ ...asset, ala: event.target.value })
                  }
                >
                  <option value=""></option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </label>
              <div className="space-mov"></div>
              <h1 className="title-page-all-sub">Outros</h1>
              <hr className="custom-hr-one" />
              <p></p>
              {/* ---------- Observações ----------*/}
              <label className="lb-info">
                <label className="labelofLabel">Observações: </label>
                <textarea
                  value={asset.obs === null ? "" : asset.obs}
                  onChange={(ev) =>
                    setAsset({ ...asset, obs: ev.target.value })
                  }
                  className="obs-mov-ee"
                />
              </label>

              <label className="lb-info-btn">
                {id === undefined ? (
                  <input
                    type="button"
                    onClick={resetFilter}
                    value="Limpar"
                    className="btn-cleanfilter-assett"
                  />
                ) : (
                  ""
                )}

                <button
                  className="btn-adicionar-assetFormm"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </label>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
