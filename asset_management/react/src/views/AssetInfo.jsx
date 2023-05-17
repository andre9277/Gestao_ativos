import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";

const AssetInfo = () => {
  //We take the ID
  let { id } = useParams();

  useEffect(() => {
    //Performs a client access request
    axiosClient.get(`/assets/${id}`).then(({ data }) => {
      setAsset(data);
    });
  }, [id]);
  //Lists the assets:
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
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Informação do Ativo: {asset.numb_inv}
            </h1>
            <p></p>
            <p></p>
          </div>
          <div className="row">
            {asset.id ? (
              <div className="container">
                <div className="row">
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Marca:</label>{" "}
                    <h6 className="attrAsset">{asset.brand.sig}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Modelo:</label>{" "}
                    <h6 className="attrAsset">{asset.modelo.model_name}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Categoria:</label>{" "}
                    <h6 className="attrAsset">{asset.category.name}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Nº de Inventário:</label>{" "}
                    <h6 className="attrAsset"> {asset.numb_inv}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Nº de Série:</label>{" "}
                    <h6 className="attrAsset">{asset.numb_ser}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Data de Compra:</label>{" "}
                    <h6 className="attrAsset">{asset.date_purch}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Condição:</label>
                    <h6 className="attrAsset"> {asset.cond}</h6>
                  </ul>
                  <ul className="lb-infoAsset">
                    <label className="lb-infoAsset2">Estado:</label>
                    <h6 className="attrAsset"> {asset.state}</h6>
                  </ul>
                </div>
                <p></p>
                <div className="row">
                  <div className="locInfo">
                    <h2 className="headerInfoAsset">Localização: </h2>
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
                        <label className="lb-infoAsset2">
                          Unidade-Contato:
                        </label>

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
                  </div>
                  <div className="row">
                    <h2 className="headerInfoAsset">Fornecedor: </h2>
                    <ul>
                      <ol className="lb-infoAsset">
                        <label className="lb-infoAsset2">
                          Fornecedor-Nome:{" "}
                        </label>{" "}
                        <h6 className="attrAsset">{asset.suppliers.name} </h6>
                      </ol>
                      <ol className="lb-infoAsset">
                        <label className="lb-infoAsset2">
                          Fornecedor-Email:
                        </label>{" "}
                        <h6 className="attrAsset">{asset.suppliers.email}</h6>
                      </ol>
                      <ol className="lb-infoAsset">
                        <label className="lb-infoAsset2">
                          Fornecedor-Contato:
                        </label>{" "}
                        <h6 className="attrAsset">{asset.suppliers.phone}</h6>
                      </ol>
                      <ol className="lb-infoAsset">
                        <label className="lb-infoAsset2">
                          Fornecedor-Morada:
                        </label>{" "}
                        <h6 className="attrAsset">{asset.suppliers.address}</h6>
                      </ol>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lgText">Carregando...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
