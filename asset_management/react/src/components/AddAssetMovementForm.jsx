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

  const { user, setNotification } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    getTotalAssetsEve();
  }, []);

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
    };

    // Perform the POST request using a library like Axios or fetch
    // Example using Axios:
    axiosClient
      .post("/assetMovement", data)
      .then(() => {
        if (matchingAsset) {
          const updateAsset = { ...matchingAsset, ci: assetCi };
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
  return (
    <>
      <h1 className="title-page-all">Movimento de Ativo</h1>

      <div className="card animated fadeInDown">
        <h6>Insira primeiro o número de série do ativo a mover!</h6>
        <form onSubmit={handleSubmit} className="assetForm">
          <button type="submit" className="btn-adicionar">
            Gravar
          </button>
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
          <label className="lb-info">
            Localização:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.entity.ent_name : ""}
            </h6>
          </label>
          <label className="lb-info">
            Nova Localização:
            <input
              value={""}
              onChange={(e) => ""}
              className="attrAsset"
              placeholder="Nova Localização"
            />
          </label>
          <label className="lb-info">
            CI:
            <h6 className="attrAsset">
              {matchingAsset ? matchingAsset.ci : ""}
            </h6>
          </label>

          <label className="lb-info">
            Novo CI:{" "}
            <input
              value={assetCi}
              onChange={(e) => setAssetCi(e.target.value)}
              className="attrAsset"
              placeholder="Novo CI"
            />
          </label>
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
