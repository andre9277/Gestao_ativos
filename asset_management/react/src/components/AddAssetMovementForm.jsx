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

  const [allo, setAllo] = useState([]);

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

  console.log(matchingAsset);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const allocationDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const data = {
      allocation_date: allocationDate,
      reason: reason,
      ser_number: serNumber,
      action_type: "Atualiza",
      other: other,
      user_id: user.id,
      asset_id: matchingAsset ? matchingAsset.id : null,
      ci: assetCi,
      entity: assetEnt,
    };

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
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  /* console.log("allo", allo);
  console.log("mat", matchingAsset); */
  return (
    <>
      <h1 className="title-page-all">Movimento de Ativo</h1>

      <div className="card animated fadeInDown">
        <h6>Insira primeiro o Número de Série do ativo a mover!</h6>
        <form onSubmit={handleSubmit} className="assetForm">
          <button type="submit" className="btn-adicionar">
            Gravar
          </button>
          {/* ---------- Número de Série ----------*/}
          <label className="lb-info">
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

          <label htmlFor="entity" className="lb-info">
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
          <label className="lb-info">
            Novo CI:{" "}
            <input
              value={assetCi}
              onChange={(e) => setAssetCi(e.target.value)}
              className="infoInp"
            />
          </label>

          {/* ---------- Local Now ----------*/}
          <label className="lb-info">
            Localização Origem:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.entity.ent_name : ""}
            </h6>
          </label>
          {/* ---------- Reason ----------*/}
          <label className="lb-info">
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
          {/* ---------- Obs ----------*/}
          <label className="lb-info">
            Observações:
            <textarea
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="obs-mov"
            />
          </label>

          {/* ---------- CI ----------*/}
          <label className="lb-info">
            CI:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.ci : ""}
            </h6>
          </label>
        </form>
      </div>
    </>
  );
};

export default AddAssetMovementForm;
