import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import PaginationLinks from "../components/PaginationLinks.jsx";

const AssetRep = () => {
  const [assets, setAssets] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = (url) => {
    url = url || "/assets";

    axiosClient
      .get(url)
      .then(({ data }) => {
        // When the request is successful, loading=false

        setAssets(data.data);
        setMeta(data.meta);
      })
      .catch(() => {});
  };

  const onPageClick = (link) => {
    getAssets(link.url);
  };

  return (
    <div id="content">
      <h1 className="title-page-all">Listagem de Ativos - Reparação</h1>
      <div
        className="card animated fadeInDown"
        style={{
          alignItems: "center",
        }}
      >
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {assets.map((a) =>
              a.cond === "Reparação" ? (
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
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetRep;
