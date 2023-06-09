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
            <h1 className="title-page-all">
              Informação do Ativo:{" "}
              {asset.numb_inv === null ? asset.numb_ser : asset.numb_inv}
            </h1>
            <p></p>
            <p></p>
          </div>
          <div className="row">
            {asset.id ? (
              <div className="container">
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Categoria:{" "}
                    <h6 className="attrAsset">{asset.category.name}</h6>
                  </label>{" "}
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Nº de Inventário:{" "}
                    <h6 className="attrAsset"> {asset.numb_inv}</h6>
                  </label>{" "}
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Nº de Série: <h6 className="attrAsset">{asset.numb_ser}</h6>
                  </label>{" "}
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Marca:
                    <h6 className="attrAsset">{asset.brand.sig}</h6>
                  </label>{" "}
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Modelo: <h6 className="attrAsset">{asset.modelo.name}</h6>
                  </label>{" "}
                </ul>

                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Data de Compra:{" "}
                    <h6 className="attrAsset">{asset.date_purch}</h6>
                  </label>{" "}
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Condição: <h6 className="attrAsset"> {asset.cond}</h6>
                  </label>
                </ul>
                <ul className="lb-infoAsset">
                  <label className="lb-infoAsset2">
                    Estado:<h6 className="attrAsset"> {asset.state}</h6>
                  </label>
                </ul>

                <p></p>
                {/* -------------Informação ativo - localização------------- */}
                <div className="container">
                  <h2 className="headerInfoAsset">Localização: </h2>
                  <ul>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Entidade:{" "}
                        <h6 className="attrAsset">{asset.entity.ent_name}</h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Unidade:{" "}
                        <h6 className="attrAsset">
                          {asset.units === null ? "" : asset.units.name}
                        </h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Contato:
                        <h6 className="attrAsset">
                          {asset.units === null ? "" : asset.units.unit_contact}
                        </h6>
                      </label>
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Morada:{" "}
                        <h6 className="attrAsset">
                          {asset.units === null ? "" : asset.units.unit_address}
                        </h6>
                      </label>
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Piso: <h6 className="attrAsset">{asset.floor}</h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Ala: <h6 className="attrAsset">{asset.ala}</h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        CI: <h6 className="attrAsset"> {asset.ci}</h6>
                      </label>
                    </ol>
                  </ul>

                  {/* -------------Informação ativo - fornecedor------------- */}

                  <h2 className="headerInfoAsset">Fornecedor: </h2>
                  <ul>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Nome:{" "}
                        <h6 className="attrAsset">{asset.suppliers.name} </h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Email:
                        <h6 className="attrAsset">{asset.suppliers.email}</h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Contato:{" "}
                        <h6 className="attrAsset">{asset.suppliers.phone}</h6>
                      </label>{" "}
                    </ol>
                    <ol className="lb-infoAsset">
                      <label className="lb-infoAsset2">
                        Morada:{" "}
                        <h6 className="attrAsset">{asset.suppliers.address}</h6>
                      </label>{" "}
                      <div></div>
                    </ol>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="lgText">A Carregar...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
