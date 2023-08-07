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
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx"; //to get data shared across some components
import { Modal, Button } from "react-bootstrap"; //for the confirmation window

const AddAssetMovementForm = () => {
  //Displays the errors
  const [errors, setErrors] = useState(null);

  //saves the serial number field
  const [serNumber, setSerNumber] = useState("");

  //saves the reason field
  const [reason, setReason] = useState("");

  //saves the other field
  const [other, setOther] = useState("");
  //saves the option of the selected input. Its a serial number or an inventoryNumber
  const [assetEve, setAssetEve] = useState([]);
  //saves the new CI of the asset
  const [assetCi, setAssetCi] = useState("");
  //saves the asset entity
  const [assetEnt, setAssetEnt] = useState("");
  //saves the date of the asset movement
  const [assetDate, setAssetDate] = useState("");
  const { user, setNotification } = useStateContext();
  //saves all the entity data
  const [ents, setEnts] = useState([]);

  //saves the asset unit data
  const [assetUt, setAssetUt] = useState("");
  const [units, setUnits] = useState([]);

  //saves the inventory number field
  const [invNumber, setInvNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTotalAssetsEve();

    //Gets all the entities
    getEnts();

    //Gets all the units
    getUnits();
  }, []);

  //Get entities of the url
  const getEnts = (url) => {
    url = url || "/entities";
    axiosClient.get(url).then(({ data }) => {
      setEnts(data);
    });
  };

  const getUnits = (url) => {
    url = url || "/units";
    axiosClient.get(url).then(({ data }) => {
      setUnits(data);
    });
  };
  //Get total entities
  const getTotalAssetsEve = (url) => {
    url = url || "/allAssets";
    axiosClient.get(url).then(({ data }) => {
      setAssetEve(data.data);
    });
  };

  //Timer for the errors
  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null); // Clear the error messages after 5 seconds
      }, 15000);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
      };
    }
  }, [errors]);

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

  //state to control the modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //cancel save
  const handleCancelSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

  //handle the save of the modal
  const handleSave = () => {
    setShowConfirmModal(true); // Open the confirmation modal
  };

  //handles the submit of the add asset movement
  const handleSubmit = (event) => {
    event.preventDefault();
    // Open the confirmation modal
    setShowConfirmModal(true);
  };

  console.log("tam", assetDate.length);

  //Handle the save of the asset movement when the user clicks "Confirmar" on the modal
  const handleConfirmSave = () => {
    setShowConfirmModal(false); // Close the confirmation modal

    // Validate the date before saving
    if (validateDate(assetDate)) {
      console.log("Data inválida");
      return;
    }

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
      unit: assetUt,
    };

    // Perform the POST request to save one asset movement
    axiosClient
      .post("/assetMovement", data)
      .then(() => {
        if (matchingAsset) {
          const updateAsset = {
            ...matchingAsset,
            ci: assetCi !== "" ? assetCi : matchingAsset.ci, // Update asset CI only if there is a new value
            ent_id: assetEnt !== "" ? assetEnt : matchingAsset.ent_id,
            cond: reason !== "" ? reason : matchingAsset.cond,
            unit_id: assetUt !== "" ? assetUt : matchingAsset.unit_id,
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
                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            });
        }

        if (matchingInv) {
          const updateAsset = {
            ...matchingInv,
            ci: assetCi !== "" ? assetCi : matchingInv.ci, // Update asset CI only if there is a new value
            ent_id: assetEnt !== "" ? assetEnt : matchingInv.ent_id,
            cond: reason !== "" ? reason : matchingAsset.cond,
            unit_id: assetUt !== "" ? assetUt : matchingAsset.unit_id,
          };

          axiosClient
            .put(`/assets/${matchingInv.id}`, updateAsset)
            .then(() => {
              setNotification("Ativo Movimentado com sucesso!");
              navigate("/report");
            })
            .catch((err) => {
              /* console.log("POST Request Error:", err.response); */
              const response = err.response;
              if (response && response.status === 422) {
                /* console.log("Validation Errors:", response.data.errors); */
                setErrors(response.data.errors);
                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            });
        }
      })
      .catch((err) => {
        /*  console.log("POST Request Error:", err.response); */
        const response = err.response;
        if (response && response.status === 422) {
          /*  console.log("Validation Errors:", response.data.errors); */
          setErrors(response.data.errors);
          // Scroll to the top of the page
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          /* console.log("Error Message:", response.data.message); */
          /*     setErrors(response.data.errors); */
          // Scroll to the top of the page
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
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

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();

    // Check if the year is less than 2005, greater than 2040, or has more than four digits
    return year < 2005 || year > 2040 || assetDate.length > 16;
  };

  return (
    <>
      <Modal show={showConfirmModal} onHide={handleCancelSave}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Deseja guardar todas as alterações?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmSave}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={handleCancelSave}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 className="title-page-all">Movimento de Ativo</h1>
      <form onSubmit={handleSubmit} className="assetForm">
        <h1 className="title-page-all-sub">Dados Gerais: </h1>
        <p></p>
        <p></p>
        <p className="camp-obs-mov">*Campo Obrigatório</p>
        <p></p>

        {/* ---------- Allocation Date ----------*/}
        <label className="lb-info">
          <label className="labelofLabel">
            Data:<label className="cmp-obg">*</label>
          </label>
          <input
            className={`form-calendar-asset ${
              errors && errors.allocation_date ? "error" : ""
            }`}
            type="datetime-local"
            value={assetDate}
            onChange={(e) => setAssetDate(e.target.value)}
            placeholder="YYYY-MM-DD HH:MM"
          />
          {validateDate(assetDate) && (
            <div className="error">Data inválida.</div>
          )}
          {errors && errors.allocation_date && (
            <div className="error">{errors.allocation_date[0]}</div>
          )}
        </label>

        <p></p>
        {/* ---------- Num Inv ----------*/}

        <label className="lb-info">
          <label className="labelofLabel">
            Nº de Inventário:<label className="cmp-obg">*</label>
          </label>
          <input
            type="text"
            value={matchingAsset ? matchingAsset.numb_inv : invNumber}
            onChange={(e) => setInvNumber(e.target.value)}
            className={`infoInp ${
              errors && errors.inv_number ? "error-input" : ""
            }`}
          />
          {errors && errors.inv_number && (
            <div className="error">{errors.inv_number[0]}</div>
          )}
        </label>

        {/* ---------- Num Serial ----------*/}
        <label className="lb-info">
          <label className="labelofLabel"> Nº de Série:</label>
          <input
            type="text"
            value={matchingInv ? matchingInv.numb_ser : serNumber}
            onChange={(e) => setSerNumber(e.target.value)}
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
              value={matchingAsset.entity.name}
              readOnly
              className="attrAsset"
            />
          ) : matchingInv ? (
            <input
              type="text"
              value={matchingInv.entity.name}
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
            onChange={(e) => {
              setAssetEnt(e.target.value);
              setAssetUt(""); // Reset the selected unit when changing the entity
            }}
          >
            <option value=""></option>
            {ents.map((ent) => (
              <option key={ent.id} value={ent.id}>
                {ent.name}
              </option>
            ))}
          </select>
        </label>

        {/* If the selected option corresponds to one entity with valid units, then we show the unit select*/}
        {units.some((unt) => unt.ent_id === parseInt(assetEnt)) && (
          <>
            <label className="lb-info"></label>
            <label className="lb-info">
              <label className="labelofLabel"> Unidade: </label>
              <select
                className="infoInp-select"
                name="unit"
                id="unit"
                value={assetUt}
                onChange={(e) => setAssetUt(e.target.value)}
              >
                <option value=""></option>
                {units
                  .filter((unt) => unt.ent_id === parseInt(assetEnt))
                  .map((unt) => (
                    <option key={unt.id} value={unt.id}>
                      {unt.name}
                    </option>
                  ))}
              </select>
            </label>
          </>
        )}

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
            className={`infoInp ${errors && errors.ci ? "error-input" : ""}`}
          />{" "}
          {errors && errors.ci && <div className="error">{errors.ci[0]}</div>}
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
            className={`infoInp-select ${
              errors && errors.reason ? "error-input" : ""
            }`}
            name="motivo"
            id="motivo"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          >
            <option value=""></option>
            <option value="Transferência">Transferência</option>
            <option value="Reparação">Reparação</option>
            <option value="Obsoleto">Obsoleto</option>
          </select>
          {errors && errors.reason && (
            <div className="error">{errors.reason[0]}</div>
          )}
        </label>
        {/* ---------- Obs ----------*/}
        <label className="lb-info">
          <label className="labelofLabel">Observações:</label>
          <textarea
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="obs-mov-e"
          />
        </label>
        <label className="lb-info"> </label>
        <label className="lb-info">
          <input
            type="button"
            onClick={resetFilter}
            value="Limpar"
            className="btn-cleanfilter-asset"
          />
          <button
            type="submit"
            className="btn-adicionar-movAsset"
            onClick={handleSave}
          >
            Guardar
          </button>
        </label>
      </form>
    </>
  );
};

export default AddAssetMovementForm;
