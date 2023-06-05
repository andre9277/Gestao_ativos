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
import FilterReport from "../components/FilterReport.jsx";
import PaginationFilter from "../components/PaginationFilter.jsx";
import SelectFilter from "../components/SelectFilter.jsx";

//SideBar:-------------Asset movement---------------
const ReportPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [ents, setEnts] = useState([]);
  const [meta, setMeta] = useState({});
  const [cats, setCats] = useState([]);

  const [allocations, setAllocations] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  //keeps checking if there is a filter on or off:
  const [filtered, setFiltered] = useState(false);
  //For the all the asset data:
  const [allDados, setAllDados] = useState([]);
  const [allAssets, setAllAssets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  useEffect(() => {
    getAssetsFilter();
  }, []);

  useEffect(() => {
    Promise.all([axiosClient.get("/reportAll")]).then((responses) => {
      setLoading(false);
      setAllocations(responses[0].data.allocations);
      setUnits(responses[0].data.units);
      setEnts(responses[0].data.ents);
      setCats(responses[0].data.categories);
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

  //Gets all the assets
  useEffect((url) => {
    url = url || "filterValuesNoPag";
    axiosClient.get(url).then(({ data }) => {
      setAllAssets(data.data);
    });
  }, []);

  //-----------------------Category Filter-----------------------------------------

  useEffect(() => {
    const hasFilter = selectedCategory !== "";

    setFiltered(hasFilter);

    if (hasFilter) {
      setAllDados(allAssets);
    }
  }, [selectedCategory]);

  const filteredAllocations = filtered
    ? allDados.filter(
        (row) =>
          selectedCategory === "" || row.category.name === selectedCategory
      )
    : assets;

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  //------------------------------------------------------------------
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

  //----------------------------Download----------------------------
  const downloadCSV = async () => {
    setLoading(true);
    let allData = [];

    if (!filtered) {
      allData = [];
      //No filter, fetch all assets with pagination
      for (let page = 1; page <= meta.last_page; page++) {
        const { data } = await axiosClient.get(`/filterVal?page=${page}`);
        allData.push(...data.data);
      }
    } else {
      allData = [];
      allData = filteredAllocations;
    }

    const csvData = Papa.unparse({
      fields: [
        "Nº Inventário",
        "Nº Série",
        "Categoria",
        "Local(Anterior)",
        "Local(Atual)",
        "CI(Anterior)",
        "CI(Atual)",
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
            asset.numb_ser,
            asset.category.name,
            filtered_units(asset.previous_unit_id) === null
              ? filtered_entities(asset.previous_ent_id)
              : filtered_units(asset.previous_unit_id),
            asset.units === null ? asset.entity.ent_name : asset.units.name,
            asset.previous_ci,
            asset.ci,
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

  //Reset of the filters implemented
  const resetFilter = () => {
    setSelectedCategory("");
  };
  const totalResults = filteredAllocations.length;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div id="content">
      <div className="container-fluid">
        <div className="tb-user">
          <h1>Movimentação de ativos</h1>
          <div className="tb-btn-user">
            <div className="dropdown">
              <button className="btn-filter text-link" onClick={toggleDropdown}>
                Filtro
              </button>
              <div
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                id="filterDropdown"
              >
                <SelectFilter
                  handleFunc={handleCategoryChange}
                  selectedF={selectedCategory}
                  data={cats}
                  title={"Categoria:"}
                />
                {
                  <button
                    onClick={resetFilter}
                    className="btn-cleanfilter text-link-f"
                  >
                    Limpar Filtro
                  </button>
                }
              </div>
            </div>
            <button onClick={downloadCSV} className="btn-dwl">
              Download .csv
            </button>
          </div>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Nº Inventário</th>
              <th>Nº Série</th>
              <th>Categoria</th>
              <th>Local(Anterior)</th>
              <th>Local(Atual)</th>
              <th>CI(Anterior)</th>
              <th>CI(Atual)</th>
              <th>Utilizador</th>
              <th>Movido em</th>
            </tr>
          </thead>
          {loading && (
            <>
              <tbody></tbody>
              <tbody></tbody>

              <tbody>
                <tr>
                  <td colSpan="5" className="lgText">
                    A Carregar...
                  </td>
                </tr>
              </tbody>
            </>
          )}
          {!loading && (
            <tbody>
              {filteredAllocations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="lgTextF">
                    Não existe(m) resultado(s) para o(s) filtro(s)
                    selecionado(s)!
                  </td>
                </tr>
              ) : (
                filteredAllocations
                  .slice(startIndex, endIndex)
                  .map((asset, index) => {
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
                        <td>{asset.numb_ser}</td>
                        <td>{asset.category.name}</td>

                        <td>
                          {filtered_units(asset.previous_unit_id) === null
                            ? filtered_entities(asset.previous_ent_id)
                            : filtered_units(asset.previous_unit_id)}
                        </td>

                        <td>
                          {asset.units === null
                            ? asset.entity.ent_name
                            : asset.units.name}
                        </td>
                        <td>{asset.previous_ci}</td>
                        <td>{asset.ci}</td>

                        <td>{allocationData.user}</td>
                        <td>{allocationData.date}</td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          )}
        </table>

        {filtered === false ? (
          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        ) : filteredAllocations.length === 0 ? (
          ""
        ) : (
          <>
            <PaginationFilter
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              resultsPerPage={resultsPerPage}
              totalResults={totalResults}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
