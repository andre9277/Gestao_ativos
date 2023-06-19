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
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

const AddAssetMovementForm = () => {
  const [errors, setErrors] = useState(null);
  const [serNumber, setSerNumber] = useState("");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [assetEve, setAssetEve] = useState([]);
  const [assetCi, setAssetCi] = useState("");
  const [assetEnt, setAssetEnt] = useState("");
  const { user, setNotification } = useStateContext();
  const [ents, setEnts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTotalAssetsEve();
    getEnts();
  }, []);

  const getEnts = (url) => {
    url = url || "/entities";
    axiosClient.get(url).then(({ data }) => {
      setEnts(data);
    });
  };

  const getTotalAssetsEve = (url) => {
    url = url || "/allAssets";
    axiosClient.get(url).then(({ data }) => {
      setAssetEve(data.data);
    });
  };

  let matchingAsset = null;

  if (assetEve !== null) {
    const serNumberr = serNumber; // Replace with the user-inputted ser_number
    matchingAsset = assetEve.find((asset) => asset.numb_ser === serNumberr);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //For the format Data: YYYY-MM-DD HH:MM:SS
    const currentDate = new Date();
    let allocationDate = currentDate.toLocaleString();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    allocationDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const data = {
      allocation_date: allocationDate,
      ser_number: serNumber,
      action_type: "Atualiza",
      user_id: user.id,
      asset_id: matchingAsset ? matchingAsset.id : null,
      ci: assetCi,
      entity: assetEnt,
      other: other,
      reason: reason,
    };

    // Perform the POST request using a library like Axios or fetch
    // Example using Axios:
    axiosClient
      .post("/assetMovement", data)
      .then(() => {
        if (matchingAsset) {
          const updateAsset = {
            ...matchingAsset,
            ci: assetCi !== "" ? assetCi : matchingAsset.ci, // Update asset CI only if there is a new value
            ent_id: assetEnt !== "" ? assetEnt : matchingAsset.ent_id,
          };

          axiosClient
            .put(`/assets/${matchingAsset.id}`, updateAsset)
            .then(() => {
              setNotification("Ativo Movimentado com sucesso!");
              navigate("/report");
            })
            .catch((err) => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors);
              }
            });
        }
      })
      .catch(() => {
        // Handle the error
        /*  const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        } */
      });
  };

  return (
    <>
      <h1 className="title-page-all">Movimento de Ativo</h1>

      <div className="card animated fadeInDown">
        <h6>Insira primeiro o Número de Série do ativo a mover!</h6>
        <form onSubmit={handleSubmit} className="assetForm">
          {/* ---------- Número de Série ----------*/}
          <label className="lb-info-allo">
            Número de Série:
            <input
              type="text"
              value={serNumber}
              onChange={(e) => setSerNumber(e.target.value)}
              required
              className="infoInp"
            />
          </label>
          {/* ----------New Local ----------*/}

          <label htmlFor="entity" className="lb-info-allo">
            Localização:
            <select
              className="form-select-mov"
              name="entity"
              id="entity"
              value={assetEnt}
              onChange={(e) => setAssetEnt(e.target.value)}
            >
              <option value="">Selecione a Entidade...</option>

              {ents.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.ent_name}
                </option>
              ))}
            </select>
          </label>
          {/* ---------- CI Now ----------*/}
          <label className="lb-info-allo-new">
            Novo CI:{" "}
            <input
              value={assetCi}
              onChange={(e) => setAssetCi(e.target.value)}
              className="infoInp-new"
            />
          </label>

          {/* ---------- Reason ----------*/}
          <label className="lb-info-allo">
            Motivo:
            <select
              className="form-select-mov"
              name="motivo"
              id="motivo"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              <option value="">Selecione o Motivo...</option>
              <option value="Transferência">Transferência</option>
              <option value="Reparação">Reparação</option>
              <option value="Obsoleto">Obsoleto</option>
              <option value="Garantia">Garantia</option>
            </select>
          </label>
          {/* ---------- Local Now ----------*/}
          <label className="lb-info-allo-now">
            Localização Origem:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.entity.ent_name : ""}
            </h6>
          </label>
          {/* ---------- CI ----------*/}
          <label className="lb-info-allo-ci">
            CI Origem:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.ci : ""}
            </h6>
          </label>

          {/* ---------- Obs ----------*/}
          <label className="lb-info-allo-obs">
            Observações:
            <input
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="obs-mov-et"
            />
          </label>
          <button type="submit" className="btn-adicionar-movAsset">
            <i className="fa fa-save fa-lg" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAssetMovementForm;
