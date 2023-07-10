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
import { Modal, Button } from "react-bootstrap";
import "../styles/AddAssetMovementForm.css";

const AddAssetMovementForm = () => {
  const [errors, setErrors] = useState(null);
  const [serNumber, setSerNumber] = useState("");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [assetEve, setAssetEve] = useState([]);
  const [assetCi, setAssetCi] = useState("");
  const [assetEnt, setAssetEnt] = useState("");
  const [assetDate, setAssetDate] = useState("");
  const { user, setNotification } = useStateContext();
  const [ents, setEnts] = useState([]);
  const [invNumber, setInvNumber] = useState("");

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
  let matchingInv = null;

  if (assetEve !== null) {
    const serNumberr = serNumber; // Replace with the user-inputted ser_number
    matchingAsset = assetEve.find((asset) => asset.numb_ser === serNumberr);
  }
  if (assetEve !== null) {
    const invNumberr = invNumber;
    matchingInv = assetEve.find((asset) => asset.numb_inv === invNumberr);
  }

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCancelSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

  const handleSave = () => {
    setShowConfirmModal(true); // Open the confirmation modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Open the confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
    const data = {
      allocation_date: assetDate,
      ser_number: matchingInv ? matchingInv.numb_ser : serNumber,
      inv_number: matchingAsset ? matchingAsset.numb_inv : invNumber,
      action_type: "Atualiza",
      user_id: user.id,
      asset_id: matchingAsset
        ? matchingAsset.id
        : null || matchingInv
        ? matchingInv.id
        : null,
      ci: assetCi,
      entity: assetEnt,
      other: other,
      reason: reason,
    };

    // Perform the POST request
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

        if (matchingInv) {
          const updateAsset = {
            ...matchingInv,
            ci: assetCi !== "" ? assetCi : matchingInv.ci, // Update asset CI only if there is a new value
            ent_id: assetEnt !== "" ? assetEnt : matchingInv.ent_id,
          };

          axiosClient
            .put(`/assets/${matchingInv.id}`, updateAsset)
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
      .catch(() => {});
  };
  //Reset of the filters implemented
  const resetFilter = () => {
    setAssetDate("");
    setInvNumber("");
    setSerNumber("");
    setAssetEnt("");
    setAssetCi("");
    setReason("");
    setOther("");
  };
  return (
    <div className="mn-cnt-mov">
      <Modal show={showConfirmModal} onHide={handleCancelSave}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Deseja guardar todas as alterações?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmSave}>
            Confirmar
          </Button>
          <Button variant="primary" onClick={handleCancelSave}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="tlt-assetInfo">Movimento de Ativo</h1>
      <form onSubmit={handleSubmit} className="assetForm">
        <h1 className="headerInfoAsset">Dados Gerais: </h1>
        <p></p>
        <p></p>
        <p className="camp-obs-mov">*Campo Obrigatório</p>
        <p></p>

        {/* ---------- Allocation Date ----------*/}
        <label className="lb-info">
          {" "}
          <label className="labelofLabel">
            {" "}
            Data:<label className="cmp-obg">*</label>
          </label>
          <input
            className="form-calendar-asset"
            type="date"
            value={assetDate}
            onChange={(e) => setAssetDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </label>

        {/*  {console.log(assetDate)} */}
        <p></p>
        {/* ---------- Num Inv ----------*/}

        <label className="lb-info">
          <label className="labelofLabel">Nº de Inventário:</label>
          <input
            type="text"
            value={matchingAsset ? matchingAsset.numb_inv : invNumber}
            onChange={(e) => setInvNumber(e.target.value)}
            className="infoInp"
          />
        </label>

        {/* ---------- Num Serial ----------*/}
        <label className="lb-info">
          <label className="labelofLabel">
            {" "}
            Nº de Série:<label className="cmp-obg">*</label>
          </label>
          <input
            type="text"
            value={matchingInv ? matchingInv.numb_ser : serNumber}
            onChange={(e) => setSerNumber(e.target.value)}
            required
            className="infoInp"
          />
        </label>
        <div className="space-mov"></div>
        <h1 className="title-page-all-sub">Localização: </h1>
        <p></p>
        {/* ---------- Local Now ----------*/}
        <label className="lb-info">
          <label className="labelofLabel">Local origem: </label>
          {matchingAsset ? (
            <input
              type="text"
              value={matchingAsset.entity.ent_name}
              readOnly
              className="attrAsset"
            />
          ) : matchingInv ? (
            <input
              type="text"
              value={matchingInv.entity.ent_name}
              readOnly
              className="attrAsset"
            />
          ) : (
            <input
              type="text"
              value=""
              readOnly
              className="attrAsset null-input"
            />
          )}
        </label>

        {/* ----------New Local ----------*/}

        <label htmlFor="entity" className="lb-info">
          <label className="labelofLabel"> Local destino: </label>
          <select
            className="infoInp-select"
            name="entity"
            id="entity"
            value={assetEnt}
            onChange={(e) => setAssetEnt(e.target.value)}
          >
            <option value=""></option>
            {ents.map((ent) => (
              <option key={ent.id} value={ent.id}>
                {ent.ent_name}
              </option>
            ))}
          </select>
        </label>

        {/* ----------CI----------*/}
        <label className="lb-info">
          <label className="labelofLabel">CI origem: </label>
          {matchingAsset ? (
            <input
              type="text"
              value={matchingAsset.ci}
              readOnly
              className="attrAsset"
            />
          ) : matchingInv ? (
            <input
              type="text"
              value={matchingInv.ci}
              readOnly
              className="attrAsset"
            />
          ) : (
            <input
              type="text"
              value=""
              readOnly
              className="attrAsset null-input"
            />
          )}
        </label>

        {/* ---------- CI Now ----------*/}
        <label className="lb-info">
          <label className="labelofLabel"> CI destino: </label>
          <input
            value={assetCi}
            onChange={(e) => setAssetCi(e.target.value)}
            className="infoInp"
          />{" "}
        </label>

        <div className="space-mov"></div>
        <h1 className="title-page-all-sub">Outros: </h1>
        <p></p>
        {/* ---------- Reason ----------*/}
        <label className="lb-info">
          <label className="labelofLabel">
            Motivo:<label className="cmp-obg">*</label>
          </label>
          <select
            className="infoInp-select"
            name="motivo"
            id="motivo"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            required
          >
            <option value=""></option>
            <option value="Transferência">Transferência</option>
            <option value="Reparação">Reparação</option>
            <option value="Obsoleto">Obsoleto</option>
            <option value="Garantia">Garantia</option>
          </select>
        </label>

        <label className="lb-info">
          <label className="labelofLabel">Observações:</label>
          <textarea
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="obs-mov-e"
          />
        </label>
        <label className="lb-info"></label>
        <label className="lb-info">
          <button onClick={resetFilter} className="btn-cleanfilter-movAsset">
            Limpar
          </button>
          <button type="submit" className="btn-adicionar-movAsset">
            Guardar
          </button>
        </label>
      </form>
    </div>
  );
};

export default AddAssetMovementForm;
