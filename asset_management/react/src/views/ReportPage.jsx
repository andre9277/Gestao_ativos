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
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import Papa from "papaparse";
import PaginationLinks from "../components/PaginationLinks.jsx";
import PaginationFilter from "../components/PaginationFilter.jsx";
import SelectFilter from "../components/SelectFilter.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";

//SideBar:-------------Asset movement---------------
const ReportPage = () => {
  const navigate = useNavigate();

  //All the data from an asset (not the user) - Filtered!
  //Array to save assets
  const [assets, setAssets] = useState([]);

  //To display loading option when waiting for the requested data from the server
  const [loading, setLoading] = useState(false);

  //Array to save units
  const [units, setUnits] = useState([]);
  //Array to save entitys
  const [ents, setEnts] = useState([]);
  //Array to save pagination status
  const [meta, setMeta] = useState({});
  //Array to save categorys
  const [cats, setCats] = useState([]);
  //Array to save users
  const [users, setUsers] = useState([]);

  //Gets the data from the current logged in user and the activeOption for the sidebar
  const { user, setActiveOption } = useStateContext();

  //To manage state of the sidebar highlight
  useEffect(() => {
    setActiveOption("report");
  }, []);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  //All the asset allocation:
  const [allocations, setAllocations] = useState([]);

  //For the filter Category
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEnt, setSelectedEnt] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");

  //keeps checking if there is a filter on or off:
  const [filtered, setFiltered] = useState(false);
  const [filteredUser, setFilteredUser] = useState(false);
  const [filteredEnt, setFilteredEnt] = useState(false);
  const [filteredDataFrom, setFilteredDataFrom] = useState(false);
  const [filteredDataTo, setFilteredDataTo] = useState(false);

  //For all the asset data:
  const [allDados, setAllDados] = useState([]); //All the data from an asset (not the user)
  const [allAssets, setAllAssets] = useState([]); //All the data from an asset (not the user)

  const [filteredAllocations, setFilteredAllocations] = useState([]);

  //Displays errors messages
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //For the pagination:
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  //Gets data with pagination and users
  useEffect(() => {
    getAssetsFilter();
    getUsers();
  }, []);

  //Gets data from Allocations, units, entity and categories
  useEffect(() => {
    Promise.all([axiosClient.get("/reportAll")]).then((responses) => {
      setLoading(false);
      setAllocations(responses[0].data.allocations);
      setUnits(responses[0].data.units);
      setEnts(responses[0].data.ents);
      setCats(responses[0].data.categories);
    });
  }, []);

  useEffect(() => {
    // Monitor changes in selectedDateFrom and selectedDateTo to check for invalid date range
    if (
      selectedDateFrom &&
      selectedDateTo &&
      selectedDateFrom > selectedDateTo
    ) {
      setError(true);
      setErrorMsg("Intervalo de Datas inválido!");
    } else {
      setError(false);
      setErrorMsg("");
    }
  }, [selectedDateFrom, selectedDateTo]);

  //Gets assets data with pagination
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

  //Gets all the users
  const getUsers = (url) => {
    url = url || "/userAllo";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //Gets all the assets with no pagination
  useEffect((url) => {
    url = url || "filterValuesNoPag";
    axiosClient.get(url).then(({ data }) => {
      setAllAssets(data.data);
    });
  }, []);

  //Function that allows to create one array with an input of two arrays
  function joinArrays(array1, array2) {
    // Create an empty array to store the joined data
    const joinedArray = [];

    // Iterate over the first array
    for (let i = 0; i < array1.length; i++) {
      const item1 = array1[i];
      const commonNumber = item1.numb_ser;
      /* console.log(array2); */
      // Find matching items in the second array based on the common number
      const matchingItems = array2.filter((item2) =>
        item2.assets === null
          ? ""
          : item2.assets.numb_ser === commonNumber &&
            item2.action_type === "Atualiza"
      );

      // If matching items are found, join the data
      if (matchingItems.length > 0) {
        for (let j = 0; j < matchingItems.length; j++) {
          const joinedItem = {
            ...item1,
            ...matchingItems[j],
          };
          joinedArray.push(joinedItem);
        }
      }
    }

    return joinedArray;
  }

  //Joins two arrays, the assets and allocations into one array
  const togJoin = joinArrays(assets, allocations);
  /*  console.log(togJoin); */

  //-----------------------Category Filter-----------------------------------------
  useEffect(() => {
    let errorTimer;

    if (error) {
      // Set a timer to clear the error message after 3 seconds (adjust as needed)
      errorTimer = setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 3000);
    }

    // Clean up the timer when the component unmounts or when error state changes
    return () => clearTimeout(errorTimer);
  }, [error]);

  //Updates the values when the filter of Category, user, entity or data from/to changes
  useEffect(() => {
    const hasFilter = selectedCategory !== "";
    const hasFilterUser = selectedUser !== "";
    const hasFilterEnt = selectedEnt !== "";
    const hasFilterDateFrom = selectedDateFrom !== "";
    const hasFilterDateTo = selectedDateTo !== "";

    setFiltered(hasFilter);
    setFilteredUser(hasFilterUser);
    setFilteredEnt(hasFilterEnt);
    setFilteredDataFrom(hasFilterDateFrom);
    setFilteredDataTo(hasFilterDateTo);

    if (hasFilter) {
      setAllDados(allAssets);
    }
    if (hasFilterUser) {
      setAllDados(allAssets);
    }
    if (hasFilterEnt) {
      setAllDados(allAssets);
    }
    if (hasFilterDateFrom) {
      setAllDados(allAssets);
    }
    if (hasFilterDateTo) {
      setAllDados(allAssets);
    }
  }, [
    selectedCategory,
    selectedUser,
    selectedEnt,
    selectedDateFrom,
    selectedDateTo,
  ]);

  //-------Filters the category by user input
  const joinedArray = allDados.map((dados) => {
    const allocation = allocations.find(
      (alloc) => alloc.asset_id === dados.id && alloc.action_type === "Atualiza"
    );
    const user = allocation
      ? users.find((usr) => usr.id === allocation.user_id)
      : null;
    const userName = user ? user.name : null;
    const allocationDate = allocation ? allocation.allocation_date : null;
    return { ...dados, user: userName, allocation_date: allocationDate };
  });
  /*  console.log("joinedArray", joinedArray);
   */

  //Includes rows of the filter data
  const filterAllocations = () => {
    setIsButtonClicked(false);
    const updatedAllocations = joinedArray.filter((row) => {
      /* console.log(joinedArray); */
      const rowDate = row.allocation_date.split(" ")[0];
      //Checks every option
      if (
        filtered &&
        filteredUser &&
        filteredEnt &&
        filteredDataFrom &&
        filteredDataTo &&
        (selectedCategory === "" ||
          row.category.name !== selectedCategory ||
          row.user !== selectedUser ||
          row.entity.name !== selectedEnt ||
          rowDate < selectedDateFrom ||
          rowDate > selectedDateTo)
      ) {
        return false; // Exclude rows that don't match both filters
      }

      if (
        filtered &&
        selectedCategory !== "" &&
        row.category.name !== selectedCategory
      ) {
        return false; // Exclude rows that don't match the category filter
      }

      if (filteredUser && selectedUser !== "" && row.user !== selectedUser) {
        return false; // Exclude rows that don't match the user filter
      }

      if (
        filteredEnt &&
        selectedEnt !== "" &&
        row.entity.name !== selectedEnt
      ) {
        return false;
      }

      if (
        filteredDataFrom &&
        filteredDataTo &&
        selectedDateFrom !== "" &&
        selectedDateTo !== "" &&
        (rowDate < selectedDateFrom || rowDate > selectedDateTo)
      ) {
        return false;
      }
      return true; // Include rows that match both filters or don't have any filters
    });

    // Update the filteredAllocations state
    setFilteredAllocations(updatedAllocations);

    setIsButtonClicked(true);

    setDropdownOpen(false);
  };
  //Handles Category Change on the filter menu
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  //Function that saves the user chosen from the filter menu, by the user
  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedUser(selectedUser);
  };

  //Function that saves the entity chosen from the filter menu, by the user
  const handleLocalChange = (event) => {
    const selectedEnt = event.target.value;
    setSelectedEnt(selectedEnt);
  };
  const handleDataChangeFrom = (event) => {
    const selectDateFrom = event.target.value;

    if (selectedDateTo && selectDateFrom > selectedDateTo) {
      setError(true);
      setErrorMsg("Intervalo de Datas inválido!");
      /*    setSelectedDateFrom(""); */
      return;
    }

    setSelectedDateFrom(selectDateFrom);
    setError(false);
    setErrorMsg("");
  };

  //Handles the final data on the filter menu
  const handleDataChangeTo = (event) => {
    const selectDataTo = event.target.value;

    if (selectedDateFrom && selectDataTo < selectedDateFrom) {
      setError(true);
      setErrorMsg("Intervalo de Datas Inválido!");
      /* setSelectedDateTo(""); */
      return;
    }

    setSelectedDateTo(selectDataTo);
    setError(false);
    setErrorMsg("");
  };
  //----------------------------------------------------------
  //For the pagination without filters chosen
  const onPageClick = (link) => {
    getAssetsFilter(link.url);
  };

  //Gets data of data allocation
  const getAllocationData = (assetId) => {
    const sortedAllocations = allocations
      .filter(
        (a) =>
          a.assets !== null &&
          a.action_type === "Atualiza" &&
          a.assets.id === assetId
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (sortedAllocations.length === 0) {
      return {
        user: "",
        date: "",
      };
    }

    const latestAllocation = sortedAllocations[0];
    /*  console.log("allocation", latestAllocation); */
    return {
      user: latestAllocation.users.name,
      date: latestAllocation.allocation_date,
    };
  };

  //----------------------------Download----------------------
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
            //`'${asset.numb_inv}`, // Add a single quote before the value
            asset.numb_ser,
            asset.category.name,
            asset.previous_unit_id === null
              ? filtered_entities(asset.previous_ent_id)
              : filtered_units(asset.previous_unit_id),
            asset.units === null ? asset.entity.name : asset.units.name,
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
    return filtered.length > 0 ? filtered[0].name : "";
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
    setSelectedUser("");
    setSelectedDateFrom("");
    setSelectedDateTo("");
    setSelectedEnt("");
    setFilteredAllocations([]);
    setIsButtonClicked(false);
    setDropdownOpen(false);
  };

  //Total results for the pagination with filters chosen
  const totalResults = filteredAllocations.length;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  //Dropdown for the observation icon of every asset movement. (it only appears when there is one observation)
  const handleDropdownToggle = (assetId) => {
    setSelectedAsset(assetId === selectedAsset ? null : assetId);
    setShowDropdown(!showDropdown);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  //Dropdown for the filter button
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  //Redirects the user to the Add Asset Movement page
  const onAddClick = () => {
    const url = "/addAssetMovement";
    navigate(url);
  };

  return (
    <div id="content">
      <div className="container-fluid">
        <div className="tb-user">
          <h1 className="title-page-all">Movimentos de ativos</h1>
          <div>
            <>
              <div className="dropdown">
                {/* ---------------Button Filter --------------- */}
                <button
                  className="btn-filter text-link"
                  onClick={toggleDropdown}
                  title="Filtro"
                >
                  <i className="fa fa-filter fa-lg" aria-hidden="true"></i>
                </button>
                {user.role_id === 3 ? null : (
                  /*------------ Button Trade ------------*/
                  <button
                    className="btn-add text-link"
                    onClick={(ev) => onAddClick()}
                  >
                    <i
                      className="fa fa-exchange-alt fa-lg"
                      aria-hidden="true"
                      title="Movimento de um ativo"
                    ></i>
                  </button>
                )}

                <div
                  className={`dropdown-menuu ${dropdownOpen ? "show" : ""}`}
                  id="filterDropdown"
                >
                  {/* ------------Filter for the category------------ */}
                  <SelectFilter
                    handleFunc={handleCategoryChange}
                    selectedF={selectedCategory}
                    data={cats}
                    title={"Categoria:"}
                  />
                  {/* ------------Filter for the user------------ */}
                  <SelectFilter
                    handleFunc={handleUserChange}
                    selectedF={selectedUser}
                    data={users}
                    title={"Utilizador:"}
                  />
                  {/* ------------Filter for the entity------------ */}
                  <SelectFilter
                    handleFunc={handleLocalChange}
                    selectedF={selectedEnt}
                    data={ents}
                    title={"Localização:"}
                  />
                  {/* ------------Data layout------------ */}
                  <div className="data-filter-container">
                    <label className="titleFiltDataMov">Data:</label>

                    <form className="form-filt">
                      <label htmlFor="from-date" className="dat-filt">
                        Início:
                      </label>
                      <input
                        type="date"
                        id="from-date"
                        name="from-date"
                        value={selectedDateFrom}
                        onChange={handleDataChangeFrom}
                        className="cal-filt"
                        required
                        onKeyDown={(e) => e.preventDefault()}
                      />

                      <label htmlFor="to-date" className="dat-filt">
                        Fim:
                      </label>
                      <input
                        type="date"
                        id="to-date"
                        name="to-date"
                        required
                        value={selectedDateTo}
                        /* className="cal-filt" */
                        onChange={handleDataChangeTo}
                        className="cal-filt"
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </form>
                  </div>
                  {error && <p className="error-msg-rep">{errorMsg}</p>}
                  {/* ------------Button for the filter------------ */}
                  {
                    <button
                      onClick={resetFilter}
                      className="btn-cleanfilter text-link-f"
                    >
                      Limpar
                    </button>
                  }
                  {
                    <button
                      onClick={filterAllocations}
                      className="btn-cleanfilter text-link-ff"
                    >
                      Aplicar
                    </button>
                  }
                </div>
              </div>
              {/* ------------Button download------------ */}
              <button
                onClick={downloadCSV}
                className="btn-dwl"
                alt="Download CSV"
                title="Download CSV"
              >
                <i className="fa fa-download fa-lg" aria-hidden="true"></i>
              </button>
            </>
          </div>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th className="header-tb">Nº Inventário</th>
              <th className="header-tb">Nº Série</th>
              <th className="header-tb">Categoria</th>
              <th className="header-tb">Local (Anterior)</th>
              <th className="header-tb">Local (Atual)</th>
              <th className="header-tb">CI (Anterior)</th>
              <th className="header-tb">CI (Atual)</th>
              <th className="header-tb">Utilizador</th>
              <th className="header-tb">Movido em</th>
              <th></th>
            </tr>
          </thead>
          {loading && (
            <>
              <tbody></tbody>
              <tbody></tbody>

              <tbody>
                <tr>
                  <td colSpan="5" className="lgText">
                    A carregar...
                  </td>
                </tr>
              </tbody>
            </>
          )}
          {/* {console.log(assets)} */}

          {!loading && (
            <tbody>
              {!isButtonClicked && filteredAllocations.length === 0 ? (
                /*Asset Movements */
                assets.map((asset, index) => {
                  const allocationData = getAllocationData(asset.id);
                  const filteredTogJoin = togJoin
                    .filter((assetJoin) => assetJoin.asset_id === asset.id)
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                  /* console.log(filteredTogJoin); */

                  const firstOtherInfo =
                    filteredTogJoin.length > 0
                      ? filteredTogJoin[0].other
                      : null;

                  return (
                    <tr key={`${asset.id}-${index}`}>
                      <td>{asset.numb_inv}</td>
                      <td className="table-words-l">{asset.numb_ser}</td>
                      <td className="table-words-l">{asset.category.name}</td>

                      <td className="table-words-l">
                        {asset.previous_unit_id === null
                          ? filtered_entities(asset.previous_ent_id)
                          : filtered_units(asset.previous_unit_id)}
                      </td>

                      <td className="table-words-l">
                        {asset.units === null
                          ? asset.entity.name
                          : asset.units.name}
                      </td>
                      <td className="table-words-l">{asset.previous_ci}</td>
                      <td className="table-words-l">{asset.ci}</td>

                      <td className="table-words-l">
                        {asset.user === undefined
                          ? allocationData.user
                          : asset.user}
                      </td>
                      <td className="table-numb-r">
                        {asset.allocation_date === undefined
                          ? allocationData.date
                          : asset.allocation_date}
                      </td>
                      {/* {console.log(asset)} */}
                      <td>
                        {firstOtherInfo === null ? (
                          ""
                        ) : (
                          <>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                              onClick={() => handleDropdownToggle(asset.id)}
                              title="Observação"
                            ></i>
                            {selectedAsset === asset.id && showDropdown && (
                              <div
                                className={`dropdown-info-mov ${
                                  showDropdown ? "show" : ""
                                }`}
                              >
                                {/* Dropdown content */}
                                {/* This will be shown when the user clicks the icon */}
                                <h6 className="titl-obs-mov">Observações</h6>
                                <p className="obs-mov-asset">
                                  {" "}
                                  {firstOtherInfo}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : filteredAllocations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="lgTextF-asset-mov">
                    Não existe(m) resultado(s) para o(s) filtro(s)
                    selecionado(s)!
                  </td>
                </tr>
              ) : (
                /*Filtered Asset Movements */
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
                    const filteredTogJoin = togJoin
                      .filter((assetJoin) => assetJoin.asset_id === asset.id)
                      .sort(
                        (a, b) =>
                          new Date(b.created_at) - new Date(a.created_at)
                      );

                    const firstOtherInfo =
                      filteredTogJoin.length > 0
                        ? filteredTogJoin[0].other
                        : null;

                    const allocationData = getAllocationData(asset.id);
                    return (
                      <tr key={`${asset.id}-${index}`}>
                        <td>{asset.numb_inv}</td>
                        <td className="table-words-l">{asset.numb_ser}</td>
                        <td className="table-words-l">{asset.category.name}</td>

                        <td className="table-words-l">
                          {asset.previous_unit_id === null
                            ? filtered_entities(asset.previous_ent_id)
                            : filtered_units(asset.previous_unit_id)}
                        </td>

                        <td className="table-words-l">
                          {asset.units === null
                            ? asset.entity.name
                            : asset.units.name}
                        </td>
                        <td className="table-words-l">{asset.previous_ci}</td>
                        <td className="table-words-l">{asset.ci}</td>

                        <td className="table-words-l">
                          {asset.user === null
                            ? allocationData.user
                            : asset.user}
                        </td>
                        <td className="table-numb-r">{allocationData.date}</td>

                        <td>
                          {firstOtherInfo === null ? (
                            " "
                          ) : (
                            <>
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                                onClick={() => handleDropdownToggle(asset.id)}
                                title="Observação"
                              ></i>
                              {selectedAsset === asset.id && showDropdown && (
                                <div
                                  className={`dropdown-info-mov ${
                                    showDropdown ? "show" : ""
                                  }`}
                                >
                                  {/* Dropdown content */}
                                  {/* This will be shown when the user clicks the icon */}
                                  <h6 className="titl-obs-mov">Observações</h6>
                                  <p className="obs-mov-asset">
                                    {" "}
                                    {firstOtherInfo}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </td>
                        {/*  <td>{console.log(asset)}</td> */}
                      </tr>
                    );
                  })
              )}
            </tbody>
          )}
        </table>
        <p> </p>
        <p> </p>
        {console.log("filteredAllocations.length", filteredAllocations.length)}
        {/*Pagination without filters*/}
        {filtered === false && !loading ? (
          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        ) : filteredAllocations.length === 0 ? (
          ""
        ) : (
          <>
            {/*Pagination with filters*/}
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
