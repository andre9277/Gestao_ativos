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
import axiosClient from "../axios-client.js";
import PaginationLinks from "../components/PaginationLinks.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";

const AssetObs = () => {
  const [assets, setAssets] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  //Gets the data from the current logged in user and the activeOption for the sidebar
  const { setActiveOption } = useStateContext();

  useEffect(() => {
    getAssets();
    setActiveOption("assets"); //To manage state of the sidebar highlight
  }, []);

  const getAssets = (url) => {
    url = url || "/assetsObso";

    axiosClient
      .get(url)
      .then(({ data }) => {
        // When the request is successful, loading=false
        setAssets(data.data);
        setMeta(data.meta);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false); // Set loading to false when the API call is completed, either success or failure
      });
  };

  const onPageClick = (link) => {
    getAssets(link.url);
  };

  return (
    <div id="content">
      <h1 className="title-page-all">Listagem de Ativos - Obsoletos</h1>
      <div
        className="card animated fadeInDown"
        style={{
          alignItems: "center",
        }}
      >
        <>
          {loading ? (
            <p className="lgText-asset">A carregar...</p>
          ) : assets.filter((a) => a.cond === "Obsoleto").length === 0 ? (
            <p className="lgTextF-asset">Não existem ativos obsoletos</p>
          ) : (
            <div className="asset-table">
              <div className="asset-table-container">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th className="header-tb">Categoria</th>
                        <th className="header-tb">Marca</th>
                        <th className="header-tb">Modelo</th>
                        <th className="header-tb">Nº Inventário</th>
                        <th className="header-tb">Nº Série</th>
                        <th className="header-tb">Localização</th>
                        <th className="header-tb">Unidade</th>
                        <th className="header-tb">Piso</th>
                        <th className="header-tb">Ala</th>
                        <th className="header-tb">CI</th>
                        <th className="header-tb">Estado</th>
                        <th className="header-tb">Adicionado em </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((a) =>
                        a.cond === "Obsoleto" ? (
                          <tr key={a.id}>
                            <td className="table-words-l">{a.category.name}</td>
                            <td className="table-words-l">{a.brand.name}</td>
                            <td className="table-words-l">{a.modelo.name}</td>
                            <td className="tb-normal">{a.numb_inv}</td>
                            <td className="table-words-l">{a.numb_ser}</td>
                            <td className="table-words-l">{a.entity.name}</td>
                            <td className="table-words-l">
                              {a.units === null ? "" : a.units.name}
                            </td>
                            <td>{a.floor}</td>
                            <td>{a.ala}</td>
                            <td className="table-words-l">{a.ci}</td>
                            <td>
                              {a.state === "Ativo" ? (
                                <div className="circle active"></div>
                              ) : (
                                <div className="circle inactive"></div>
                              )}
                            </td>
                            <td className="table-numb-r">{a.created_at}</td>
                          </tr>
                        ) : null
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pagination-container">
                <PaginationLinks meta={meta} onPageClick={onPageClick} />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AssetObs;
