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
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [ents, setEnts] = useState([]);
  const [meta, setMeta] = useState({});
  const [cats, setCats] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useStateContext();

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

  const [allAllocations, setAllAllocations] = useState([]);

  //For all the asset data:
  const [allDados, setAllDados] = useState([]); //All the data from an asset (not the user)
  const [allAssets, setAllAssets] = useState([]); //All the data from an asset (not the user)

  const [filteredAllocations, setFilteredAllocations] = useState([]);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //For the pagination:
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  useEffect(() => {
    getAssetsFilter();
    getUsers();
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

  useEffect((url) => {
    url = url || "/allocationAll";
    axiosClient.get(url).then(({ data }) => {
      setAllAllocations(data.data);
    });
  }, []);
  /* console.log(allAllocations); */

  function joinArrays(array1, array2) {
    // Create an empty array to store the joined data
    const joinedArray = [];

    // Iterate over the first array
    for (let i = 0; i < array1.length; i++) {
      const item1 = array1[i];
      const commonNumber = item1.numb_ser;

      // Find matching items in the second array based on the common number
      const matchingItems = array2.filter(
        (item2) =>
          item2.assets.numb_ser === commonNumber &&
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
  const filterAllocations = () => {
    setIsButtonClicked(false);
    const updatedAllocations = joinedArray.filter((row) => {
      console.log(joinedArray);
      const rowDate = row.allocation_date.split(" ")[0];
      if (
        filtered &&
        filteredUser &&
        filteredEnt &&
        filteredDataFrom &&
        filteredDataTo &&
        (selectedCategory === "" ||
          row.category.name !== selectedCategory ||
          row.user !== selectedUser ||
          row.entity.ent_name !== selectedEnt ||
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
        row.entity.ent_name !== selectedEnt
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

    setFilteredAllocations(updatedAllocations); // Update the filteredAllocations state
    setIsButtonClicked(true);
    setDropdownOpen(false);
  };
  //----------Handles Category Change------------------------
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedUser(selectedUser);
  };

  const handleLocalChange = (event) => {
    const selectedEnt = event.target.value;
    setSelectedEnt(selectedEnt);
  };

  const handleDataChangeFrom = (event) => {
    const selectDateFrom = event.target.value;

    if (selectedDateFrom > selectedDateTo) {
      setError(true);
      setErrorMsg("Intervalo de Datas inválido!");
      setSelectedDateFrom("");
      return;
    }

    setSelectedDateFrom(selectDateFrom);
    setError(false);
    setErrorMsg("");
  };

  const handleDataChangeTo = (event) => {
    const selectDataTo = event.target.value;

    if (selectDataTo < selectedDateFrom) {
      setError(true);
      setErrorMsg("Intervalo de Datas Inválido!");
      setSelectedDateTo("");

      return;
    }

    setSelectedDateTo(selectDataTo);
    setError(false);
    setErrorMsg("");
  };
  //----------------------------------------------------------
  const onPageClick = (link) => {
    getAssetsFilter(link.url);
  };

  //Gets data of data allocation
  const getAllocationData = (assetId) => {
    const allocation = allocations.find((a) =>
      a.assets === null
        ? ""
        : a.assets.id === assetId &&
          (a.action_type === "Atualiza" || a.action_type === "Pesquisa")
    );
    /*  console.log("allcoation", allocation); */

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
            asset.numb_ser,
            asset.category.name,
            asset.previous_unit_id === null
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

  const totalResults = filteredAllocations.length;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleDropdownToggle = (assetId) => {
    setSelectedAsset(assetId === selectedAsset ? null : assetId);
    setShowDropdown(!showDropdown);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onAddClick = () => {
    const url = "/addAssetMovement";
    navigate(url);
  };

  return (
    <div id="content">
      <div className="container-fluid">
        <div className="tb-user">
          <h1 className="title-page-all">Movimentação de ativos</h1>
          <div>
            <>
              <div className="dropdown">
                {/* ---------------Button Filter --------------- */}
                <button
                  className="btn-filter text-link"
                  onClick={toggleDropdown}
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
                    ></i>
                  </button>
                )}

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
                  <SelectFilter
                    handleFunc={handleUserChange}
                    selectedF={selectedUser}
                    data={users}
                    title={"Utilizadores:"}
                  />
                  <SelectFilter
                    handleFunc={handleLocalChange}
                    selectedF={selectedEnt}
                    data={ents}
                    title={"Localização:"}
                  />
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
                      />
                    </form>
                  </div>
                  {error && <p className="error-msg-rep">{errorMsg}</p>}
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
              <button onClick={downloadCSV} className="btn-dwl">
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
              <th>Nº Inventário</th>
              <th>Nº Série</th>
              <th>Categoria</th>
              <th>Local(Anterior)</th>
              <th>Local(Atual)</th>
              <th>CI(Anterior)</th>
              <th>CI(Atual)</th>
              <th>Utilizador</th>
              <th>Movido em</th>
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
                assets.map((asset, index) => {
                  const allocationData = getAllocationData(asset.id);
                  const filteredTogJoin = togJoin.filter(
                    (assetJoin) => assetJoin.asset_id === asset.id
                  );
                  /* console.log(filteredTogJoin); */

                  const firstOtherInfo =
                    filteredTogJoin.length > 0
                      ? filteredTogJoin[0].other
                      : null;

                  /*  const dateAsset =
                    filteredTogJoin.length > 0
                      ? filteredTogJoin[1].allocation_date
                      : null; */
                  return (
                    <tr key={`${asset.id}-${index}`}>
                      <td>{asset.numb_inv}</td>
                      <td>{asset.numb_ser}</td>
                      <td>{asset.category.name}</td>

                      <td>
                        {asset.previous_unit_id === null
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

                      <td>
                        {asset.user === undefined
                          ? allocationData.user
                          : asset.user}
                      </td>
                      <td>
                        {asset.allocation_date === undefined
                          ? allocationData.date
                          : asset.allocation_date}
                      </td>

                      <td>
                        {firstOtherInfo === null ? (
                          ""
                        ) : (
                          <>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                              onClick={() => handleDropdownToggle(asset.id)}
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
                    const filteredTogJoin = togJoin.filter(
                      (assetJoin) => assetJoin.asset_id === asset.id
                    );
                    const firstOtherInfo =
                      filteredTogJoin.length > 0
                        ? filteredTogJoin[0].other
                        : null;

                    const allocationData = getAllocationData(asset.id);
                    return (
                      <tr key={`${asset.id}-${index}`}>
                        <td>{asset.numb_inv}</td>
                        <td>{asset.numb_ser}</td>
                        <td>{asset.category.name}</td>

                        <td>
                          {asset.previous_unit_id === null
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

                        <td>
                          {asset.user === null
                            ? allocationData.user
                            : asset.user}
                        </td>
                        <td>{allocationData.date}</td>
                        <td>
                          <i
                            className="fa fa-info-circle"
                            aria-hidden="true"
                            onClick={() => handleDropdownToggle(asset.id)}
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
                              <p className="obs-mov-asset"> {firstOtherInfo}</p>
                            </div>
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
        {filtered === false && !loading ? (
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
