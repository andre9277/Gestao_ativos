import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";

const AssetInfo = () => {
  //Ficamos com o ID
  let { id } = useParams();

  useEffect(() => {
    //Realiza um request access client
    axiosClient.get(`/assets/${id}`).then(({ data }) => {
      setAsset(data);
    });
  }, [id]);
  //Lista de utilizadores:
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

  return (
    <div className="card animated fadeInDown">
      <h1>Informação do Ativo: {asset.numb_inv}</h1>
      <p></p>
      <p></p>
      <div>
        {asset.id ? (
          <div className="container">
            <div className="assetGeneralInfo">
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Marca:</label>{" "}
                <h6 className="attrAsset">{asset.brand.sig}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Modelo:</label>{" "}
                <h6 className="attrAsset">{asset.modelo.model_name}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Categoria:</label>{" "}
                <h6 className="attrAsset">{asset.category.name}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Nº de Inventário:</label>{" "}
                <h6 className="attrAsset"> {asset.numb_inv}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Nº de Série:</label>{" "}
                <h6 className="attrAsset">{asset.numb_ser}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Data de Compra:</label>{" "}
                <h6 className="attrAsset">{asset.date_purch}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Condição:</label>
                <h6 className="attrAsset"> {asset.cond}</h6>
              </li>
              <li className="lb-infoAsset">
                <label className="lb-infoAsset2">Estado:</label>
                <h6 className="attrAsset"> {asset.state}</h6>
              </li>
            </div>
            <h2 className="sub_asset">Localização: </h2>
            <ul>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Entidade:</label>{" "}
                <h6 className="attrAsset">{asset.entity.ent_name}</h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Unidade:</label>{" "}
                <h6 className="attrAsset">
                  {asset.units === null ? "" : asset.units.name}
                </h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Unidade-Contato:</label>

                <h6 className="attrAsset">
                  {asset.units === null ? "" : asset.units.unit_contact}
                </h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Unidade-Morada:</label>

                <h6 className="attrAsset">
                  {asset.units === null ? "" : asset.units.unit_address}
                </h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Piso:</label>{" "}
                <h6 className="attrAsset">{asset.floor}</h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">Ala:</label>{" "}
                <h6 className="attrAsset">{asset.ala}</h6>
              </ol>
              <ol className="lb-infoAsset">
                <label className="lb-infoAsset2">CI:</label>
                <h6 className="attrAsset"> {asset.ci}</h6>
              </ol>
            </ul>
            <h2 className="sub_asset">Fornecedor: </h2>
            <ol className="lb-infoAsset">
              <label className="lb-infoAsset2">Fornecedor-Nome: </label>{" "}
              <h6 className="attrAsset">{asset.suppliers.name} </h6>
            </ol>
            <ol className="lb-infoAsset">
              <label className="lb-infoAsset2">Fornecedor-Email:</label>{" "}
              <h6 className="attrAsset">{asset.suppliers.email}</h6>
            </ol>
            <ol className="lb-infoAsset">
              <label className="lb-infoAsset2">Fornecedor-Contato:</label>{" "}
              <h6 className="attrAsset">{asset.suppliers.phone}</h6>
            </ol>
            <ol className="lb-infoAsset">
              <label className="lb-infoAsset2">Fornecedor-Morada:</label>{" "}
              <h6 className="attrAsset">{asset.suppliers.address}</h6>
            </ol>
          </div>
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
};

export default AssetInfo;
