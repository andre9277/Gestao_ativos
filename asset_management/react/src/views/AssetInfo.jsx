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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div id="print-content">
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="title-page-all">
                Informação do Ativo:{" "}
                {asset.numb_inv === null ? asset.numb_ser : asset.numb_inv}
              </h1>
              <button className="btn btn-primary" onClick={handlePrint}>
                Imprimir
              </button>
            </div>
            <div className="row-info-asset">
              {asset.id ? (
                <div className="container">
                  <h2 className="headerInfoAsset">Dados gerais: </h2>
                  <p></p>
                  <ul className="lb-infoAsset-informat">
                    <p></p>
                    <label className="lb-infoAsset2-informat">
                      Categoria:{" "}
                      <h6 className="attrAsset-informat">
                        {asset.category.name}
                      </h6>
                    </label>{" "}
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Nº de Inventário:{" "}
                      <h6 className="attrAsset-informat"> {asset.numb_inv}</h6>
                    </label>{" "}
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Nº de Série:{" "}
                      <h6 className="attrAsset-informat">{asset.numb_ser}</h6>
                    </label>{" "}
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Marca:
                      <h6 className="attrAsset-informat">{asset.brand.name}</h6>
                    </label>{" "}
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Modelo:{" "}
                      <h6 className="attrAsset-informat">
                        {asset.modelo.name}
                      </h6>
                    </label>{" "}
                  </ul>

                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Data de Compra:{" "}
                      <h6 className="attrAsset-informat">{asset.date_purch}</h6>
                    </label>{" "}
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Condição:{" "}
                      <h6 className="attrAsset-informat"> {asset.cond}</h6>
                    </label>
                  </ul>
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Estado:
                      <h6 className="attrAsset-informat"> {asset.state}</h6>
                    </label>
                  </ul>

                  <div className="space-mov"></div>
                  {/* -------------Informação ativo - localização------------- */}
                  <div className="containerr">
                    <h2 className="headerInfoAsset">Localização: </h2>
                    <p></p>
                    <ul>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Entidade:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.entity.ent_name}
                          </h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Unidade:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.units === null ? "" : asset.units.name}
                          </h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Contato:
                          <h6 className="attrAsset-informat">
                            {asset.units === null
                              ? ""
                              : asset.units.unit_contact}
                          </h6>
                        </label>
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Morada:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.units === null
                              ? ""
                              : asset.units.unit_address}
                          </h6>
                        </label>
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Piso:{" "}
                          <h6 className="attrAsset-informat">{asset.floor}</h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Ala:{" "}
                          <h6 className="attrAsset-informat">{asset.ala}</h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          CI:{" "}
                          <h6 className="attrAsset-informat"> {asset.ci}</h6>
                        </label>
                      </ol>
                    </ul>
                    <div className="space-mov"></div>
                    {/* -------------Informação ativo - fornecedor------------- */}

                    <h2 className="headerInfoAsset">Fornecedor: </h2>
                    <p></p>
                    <ul>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Nome:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.name}{" "}
                          </h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Email:
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.email}
                          </h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Contato:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.phone}
                          </h6>
                        </label>{" "}
                      </ol>
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Morada:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.address}
                          </h6>
                        </label>{" "}
                        <div></div>
                      </ol>
                    </ul>

                    <div className="space-mov"></div>
                    <h2 className="headerInfoAsset">Observações:</h2>
                    <p></p>
                    <ol className="lb-infoAsset-informat">
                      <label className="lb-infoAsset2-informat">
                        <h6 className="attrAsset-informat">
                          {asset.obs === null ? "" : asset.obs}
                        </h6>
                      </label>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="lgText-assetInfo">A carregar...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
