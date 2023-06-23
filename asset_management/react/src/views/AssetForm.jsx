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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function AssetForm() {
  const [errors, setErrors] = useState(null);

  //Meanwhile the table isnt loading we show a loading string
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

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
  //Allows the navigation of the assets to other page
  const navigate = useNavigate();

  //We take the id
  let { id } = useParams();

  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setLoading(false);
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      setUnits(responses[0].data.units);
      setBrands(responses[0].data.brands);
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
  });

  //When the user submits the request
  const onSubmit = (ev) => {
    ev.preventDefault();

    //if asset id exists: it updates
    if (asset.id) {
      setLoading(true);
      axiosClient
        .put(`/assets/${asset.id}`, asset)
        .then(() => {
          setLoading(false);
          //update with good outcome
          setNotification("Ativo atualizado com sucesso!");
          //redirect to the page with assets
          navigate("/assets");
        })
        .catch((err) => {
          setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
    //or it will create a new asset
    else {
      axiosClient
        .post("/assets", asset)
        .then(() => {
          setNotification("Ativo adicionado com sucesso!");
          navigate("/assets");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
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
  return (
    <>
      {asset.id && (
        <h1 className="title-page-all">Atualizar Ativo: {asset.numb_inv}</h1>
      )}
      {!asset.id && <h1 className="title-page-all">Novo Ativo</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="caprr-re">A carregar...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="assetForm-asset">
            {/* ---------- Inventory Number ----------*/}
            <h4 className="title-page-all-sub">Dados do Ativo: </h4>
            <p></p>
            <label className="lb-info-asset">
              {" "}
              Número de inventário:
              <input
                value={asset.numb_inv === null ? "" : asset.numb_inv}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_inv: ev.target.value })
                }
                className="infoInp-asset"
              />
            </label>

            {/* ---------- Serial Number ----------*/}
            <label className="lb-info-asset">
              {" "}
              Número de série:
              <input
                value={asset.numb_ser}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_ser: ev.target.value })
                }
                className="infoInp-asset"
              />
            </label>

            {/* ---------- Category ----------*/}
            <label htmlFor="category" className="lb-info-asset">
              Categoria:
              <select
                className="form-select-asset"
                name="category"
                id="category"
                value={asset.cat_id}
                onChange={(event) =>
                  setAsset({ ...asset, cat_id: event.target.value })
                }
              >
                <option value="">Selecione a Categoria...</option>
                {cats.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            {/* ---------- Brands ----------*/}
            <label className="lb-info-asset">
              {" "}
              Marca*:
              <select
                value={asset.brand_id}
                onChange={handleBrandChange}
                className="form-select-asset"
              >
                <option value="">Selecione a Marca...</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>

            {/* ---------- Models ----------*/}
            <label className="lb-info-asset">
              {" "}
              Modelo*:
              <select
                value={asset.model_id}
                className="form-select-asset"
                onChange={(event) =>
                  setAsset({ ...asset, model_id: event.target.value })
                }
              >
                <option value="">Selecione o Modelo...</option>
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="localAsset-cond">
              {/* ---------- Condition ----------*/}
              <label htmlFor="condicao" className="lb-info-asset">
                Condição:
                <select
                  className="form-select-asset"
                  name="condicao"
                  id="condicao"
                  value={asset.cond}
                  onChange={(event) =>
                    setAsset({ ...asset, cond: event.target.value })
                  }
                >
                  <option value="">Selecione a Condição...</option>
                  <option value="Novo">Novo</option>
                  <option value="Usado">Usado</option>
                  <option value="Reparação">Reparação</option>
                  <option value="Obsoleto">Obsoleto</option>
                </select>
              </label>

              {/* ---------- Status ----------*/}
              <label htmlFor="estado" className="lb-info-asset">
                Estado:
                <select
                  className="form-select-asset"
                  name="estado"
                  id="estado"
                  value={asset.state}
                  onChange={(event) =>
                    setAsset({ ...asset, state: event.target.value })
                  }
                >
                  <option value="">Selecione o Estado...</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </label>

              {/* ---------- Date of purchase ----------*/}
              <label className="lb-info-asset">
                {" "}
                Data de Compra:
                <input
                  className="form-calendar-asset"
                  type="date"
                  value={asset.date_purch}
                  onChange={(ev) =>
                    setAsset({ ...asset, date_purch: ev.target.value })
                  }
                  placeholder="YYYY-MM-DD"
                />
              </label>
              {/* ---------- Supplier ----------*/}
              <label className="lb-info-asset">
                {" "}
                Fornecedor*:
                <select
                  className="form-select-asset-sup"
                  value={asset.supplier_id}
                  onChange={handleSupplierChange}
                >
                  <option value="">Selecione o Fornecedor...</option>
                  {supplier.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="localAsset-local">
              <p></p>
              <h4 className="title-page-all-sub">Localização: </h4>
              <p></p>
              {/* ---------- CI ----------*/}
              <label className="lb-info-asset">
                {" "}
                CI:
                <input
                  value={asset.ci === null ? "" : asset.ci}
                  onChange={(ev) => setAsset({ ...asset, ci: ev.target.value })}
                  className="infoInp-asset"
                />
              </label>
              {/* ---------- Entities ----------*/}
              <label htmlFor="entity" className="lb-info-asset">
                Entidade:
                <select
                  className="form-select-asset"
                  name="entity"
                  id="entity"
                  value={asset.ent_id}
                  onChange={handleEntityChange}
                >
                  <option value="">Selecione a Entidade...</option>

                  {ents.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {ent.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* ---------- Units ----------*/}
              <label htmlFor="unit" className="lb-info-asset">
                Unidade:
                <select
                  className="form-select-asset"
                  name="unit"
                  id="unit"
                  value={asset.unit_id === null ? "" : asset.unit_id}
                  onChange={(event) =>
                    setAsset({ ...asset, unit_id: event.target.value })
                  }
                >
                  <option value="">Selecione a Unidade...</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* ---------- Floor ----------*/}
              <label htmlFor="floor" className="lb-info-asset">
                Piso:
                <select
                  className="form-select-asset"
                  name="floor"
                  id="floor"
                  value={asset.floor === null ? "" : asset.floor}
                  onChange={(event) =>
                    setAsset({ ...asset, floor: event.target.value })
                  }
                >
                  <option value="">Selecione o Piso...</option>
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
              <label htmlFor="ala" className="lb-info-asset">
                Ala:
                <select
                  className="form-select-asset"
                  name="ala"
                  id="ala"
                  value={asset.ala === null ? "" : asset.ala}
                  onChange={(event) =>
                    setAsset({ ...asset, ala: event.target.value })
                  }
                >
                  <option value="">Selecione a Ala...</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </label>

              <div className="localAsset">
                {/* ---------- Observações ----------*/}
                <label className="lb-info-obs">
                  Observações:
                  <textarea
                    value={asset.obs === null ? "" : asset.obs}
                    onChange={(ev) =>
                      setAsset({ ...asset, obs: ev.target.value })
                    }
                    className="obs-mov-e"
                  />
                </label>
                <button className="btn-adicionar-assetFormm">Guardar</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
