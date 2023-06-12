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
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  console.log("ents", ents);
  console.log(matchingAsset);
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
              className="attrAsset"
              placeholder="Número de Série"
            />
          </label>
          {/* ---------- Localização ----------*/}
          <label className="lb-info">
            Localização:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.entity.ent_name : ""}
            </h6>
          </label>
          {/* ---------- CI ----------*/}
          <label className="lb-info">
            CI:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.ci : ""}
            </h6>
          </label>
          {/* ----------Entidade ----------*/}

          <label htmlFor="entity" className="lb-info">
            Entidade:
            <select
              className="form-select"
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

          {/* ---------- Novo CI ----------*/}
          <label className="lb-info">
            Novo CI:{" "}
            <input
              value={assetCi}
              onChange={(e) => setAssetCi(e.target.value)}
              className="attrAsset"
              placeholder="Novo CI"
            />
          </label>
          {/* ---------- Motivo ----------*/}
          <label className="lb-info">
            Motivo:
            <select
              className="form-select"
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
          {/* ---------- Observações ----------*/}
          <label className="lb-info">
            Observações:
            <textarea
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Escreva aqui..."
              className="attrAsset"
            />
          </label>
        </form>
      </div>
    </>
  );
};

export default AddAssetMovementForm;
