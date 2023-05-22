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
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import Papa from "papaparse";
import PaginationLinks from "../components/PaginationLinks.jsx";

//SideBar:-------------Asset movement---------------
const ReportPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [ents, setEnts] = useState([]);
  const [meta, setMeta] = useState({});

  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    getAssetsFilter();
  }, []);

  useEffect(() => {
    Promise.all([axiosClient.get("/reportAll")]).then((responses) => {
      setLoading(false);
      setAllocations(responses[0].data.allocations);
      setUnits(responses[0].data.units);
      setEnts(responses[0].data.ents);
    });
  }, []);

  const getAssetsFilter = (url) => {
    url = url || "/filterVal";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setAssets(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onPageClick = (link) => {
    getAssetsFilter(link.url);
  };

  const getAllocationData = (assetId) => {
    const allocation = allocations.find((a) =>
      a.assets === null ? "" : a.assets.id === assetId
    );

    if (!allocation) {
      return {
        user: "",
        date: "",
      };
    }

    return {
      user: allocation.users.name,
      date: allocation.allocation_date,
    };
  };

  //------------------------Download-------
  const downloadCSV = async () => {
    setLoading(true);
    const allData = [];

    for (let page = 1; page <= meta.last_page; page++) {
      const { data } = await axiosClient.get(`/filterVal?page=${page}`);
      allData.push(...data.data);
    }
    const csvData = Papa.unparse({
      fields: [
        "Nº Inventário",
        "Unidade(Anterior)",
        "Entidade(Anterior)",
        "CI(Anterior)",
        "CI(Atual)",
        "Local Atual",
        "Utilizador",
        "Movido em",
      ],
      data: allData
        .filter((asset) => {
          return (
            asset.previous_ci || asset.previous_unit_id || asset.previous_ent_id
          ); // only include data where at least one of the three fields has a value
        })
        .map((asset) => {
          const allocationData = getAllocationData(asset.id);

          return [
            asset.numb_inv,
            filtered_units(asset.previous_unit_id),
            filtered_entities(asset.previous_ent_id),
            asset.previous_ci,
            asset.ci,
            asset.units === null ? asset.entity.ent_name : asset.units.name,
            allocationData.user,
            allocationData.date,
          ];
        }),
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mov_ativos.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  //Filter entities by the value that receives
  const filtered_entities = (value) => {
    let numb = parseInt(value);
    const filtered = ents.filter((ent) => ent.id === numb);
    return filtered.length > 0 ? filtered[0].ent_name : "";
  };

  //Filter units by the value that receives
  const filtered_units = (value) => {
    let numb = parseInt(value);
    const filtered = units.filter((unit) => unit.id === numb);
    return filtered.length > 0 ? filtered[0].name : "";
  };

  return (
    <div id="content">
      <div className="container-fluid">
        <div className="tb-user">
          <h1>Movimentação de ativos</h1>
          <div className="tb-btn-user">
            <button onClick={downloadCSV} className="btn-dwl">
              Download CSV
            </button>
          </div>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Nº Inventário</th>

              <th>Unidade(Anterior)</th>
              <th>Entidade(Anterior)</th>
              <th>CI(Anterior)</th>
              <th>CI(Atual)</th>
              <th>Local(Atual)</th>
              <th>Utilizador</th>
              <th>Movido em</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="lgText">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {assets.map((asset, index) => {
                if (
                  !asset.previous_ci &&
                  !asset.previous_ent_id &&
                  !asset.previous_unit_id
                ) {
                  return null; // skip rendering if previous_ci is null
                }

                const allocationData = getAllocationData(asset.id);

                return (
                  <tr key={`${asset.id}-${index}`}>
                    <td>{asset.numb_inv}</td>

                    <td>{filtered_units(asset.previous_unit_id)}</td>

                    <td>{filtered_entities(asset.previous_ent_id)}</td>
                    <td>{asset.previous_ci}</td>
                    <td>{asset.ci}</td>
                    <td>
                      {asset.units === null
                        ? asset.entity.ent_name
                        : asset.units.name}
                    </td>

                    <td>{allocationData.user}</td>
                    <td>{allocationData.date}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
};

export default ReportPage;
