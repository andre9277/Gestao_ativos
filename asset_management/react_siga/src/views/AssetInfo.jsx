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

  //Funtion that handles the print method of the asset information attibutes
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const contentToPrint = document.getElementById("print-content").innerHTML;

    const printStyles = `
      <style>
    body {
      font-size: 18px;
      
    }
    .lb-infoAsset-informat{
      display: inline-block;
    }
    .btn-primary{
      display:none;
    }
  </style>`;

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          ${printStyles}
        </head>
        <body>${contentToPrint}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
                  <h2 className="headerInfoAsset">Dados gerais</h2>
                  <hr className="custom-hr" />

                  {/* ---Category--- */}
                  <ul className="lb-infoAsset-informat">
                    <p></p>
                    <label className="lb-infoAsset2-informat">
                      Categoria:{" "}
                      <h6 className="attrAsset-informat">
                        {asset.category.name}
                      </h6>
                    </label>{" "}
                  </ul>
                  {/* ---Inventory Number--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Nº de Inventário:{" "}
                      <h6 className="attrAsset-informat"> {asset.numb_inv}</h6>
                    </label>{" "}
                  </ul>
                  {/* ---Serial Number--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Nº de Série:{" "}
                      <h6 className="attrAsset-informat">{asset.numb_ser}</h6>
                    </label>{" "}
                  </ul>
                  {/* ---Brand--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Marca:
                      <h6 className="attrAsset-informat">{asset.brand.name}</h6>
                    </label>{" "}
                  </ul>
                  {/* ---Model--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Modelo:{" "}
                      <h6 className="attrAsset-informat">
                        {asset.modelo.name}
                      </h6>
                    </label>{" "}
                  </ul>
                  {/* ---Purchased Date--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Data de Compra:{" "}
                      <h6 className="attrAsset-informat">{asset.date_purch}</h6>
                    </label>{" "}
                  </ul>
                  {/* ---Condition--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Condição:{" "}
                      <h6 className="attrAsset-informat">
                        {" "}
                        {asset.cond === "Transferência" ? "Usado" : asset.cond}
                      </h6>
                    </label>
                  </ul>
                  {/* ---State--- */}
                  <ul className="lb-infoAsset-informat">
                    <label className="lb-infoAsset2-informat">
                      Estado:
                      <h6 className="attrAsset-informat"> {asset.state}</h6>
                    </label>
                  </ul>

                  <div className="space-mov"></div>
                  {/* -------------Asset Information - local------------- */}
                  <div className="containerr">
                    <h2 className="headerInfoAsset">Localização</h2>
                    <hr className="custom-hr" />
                    <p></p>
                    <ul>
                      {/* ---Entity--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Entidade:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.entity.name}
                          </h6>
                        </label>{" "}
                      </ol>
                      {/* ---Unit--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Unidade:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.units === null ? "" : asset.units.name}
                          </h6>
                        </label>{" "}
                      </ol>
                      {/* ---Contact--- */}
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
                      {/* ---Address--- */}
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
                      {/* ---Floor--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Piso:{" "}
                          <h6 className="attrAsset-informat">{asset.floor}</h6>
                        </label>{" "}
                      </ol>
                      {/* ---Ala--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Ala:{" "}
                          <h6 className="attrAsset-informat">{asset.ala}</h6>
                        </label>{" "}
                      </ol>
                      {/* ---CI--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          CI:{" "}
                          <h6 className="attrAsset-informat"> {asset.ci}</h6>
                        </label>
                      </ol>
                    </ul>
                    <div className="space-mov"></div>
                    {/* -------------Asset Information - Supplier------------- */}

                    <h2 className="headerInfoAsset">Fornecedor</h2>
                    <hr className="custom-hr" />
                    <p></p>
                    <ul>
                      {/* ---Supplier Name--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Nome:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.name}{" "}
                          </h6>
                        </label>{" "}
                      </ol>
                      {/* ---Supplier Email--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Email:
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.email}
                          </h6>
                        </label>{" "}
                      </ol>
                      {/* ---Contact Supplier--- */}
                      <ol className="lb-infoAsset-informat">
                        <label className="lb-infoAsset2-informat">
                          Contato:{" "}
                          <h6 className="attrAsset-informat">
                            {asset.suppliers.phone}
                          </h6>
                        </label>{" "}
                      </ol>
                      {/* ---Supplier Address--- */}
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
                    {/* ---Observations--- */}
                    <div className="space-mov"></div>
                    <h2 className="headerInfoAsset">Observações</h2>
                    <hr className="custom-hr" />
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
