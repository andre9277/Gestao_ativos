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
/* import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file */
import Papa from "papaparse"; //library to export in .csv
import Filter from "../components/Filter.jsx";

//SideBar:-------------Reports---------------
export default function Allocations() {
  //returns all users (mount hook is called 2x)
  useEffect(() => {
    const abortController = new AbortController();
    getAllocations(abortController.signal);
    getAssets(abortController.signal);
    getUsers(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allocations, setAllocations] = useState([]);
  const [meta, setMeta] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allAllocations, setAllAllocations] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);

  const [selectedSer, setSelectedSer] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Performs a client access request
  const getAllocations = (signal, url) => {
    setLoading(true);
    url = url || "/allocations";

    axiosClient
      .get(url, { signal })
      .then(({ data }) => {
        setAllocations(data.data);
        setAllAllocations(data.data);
        setFilteredAllocations([]);
        /* console.log("Mov. data.:", data.data); */
        setMeta(data.meta);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //Performs a client access request
  const getAssets = (signal, url) => {
    url = url || "/allAssets";

    axiosClient.get(url, { signal }).then(({ data }) => {
      setAssets(data.data);
    });
  };

  //Performs a client access request
  const getUsers = (signal, url) => {
    url = url || "/userAllo";

    axiosClient.get(url, { signal }).then(({ data }) => {
      setUsers(data);
    });
  };

  //-----------Download---------------
  const downloadCSV = async () => {
    setLoading(true);
    const allData = [];

    const { data } = await axiosClient.get("/allocationAll");
    allData.push(...data.data);
    const filteredData = allData.filter((allocation) => {
      const allocationDate = new Date(allocation.allocation_date);

      const serFilter = selectedSer
        ? allocation.assets?.numb_ser === selectedSer
        : true;
      const opFilter = selectedOp
        ? allocation.action_type === selectedOp
        : true;
      const userFilter = selectedUser
        ? allocation.users.name === selectedUser
        : true;
      const dateFilter =
        allocationDate >= startDate && allocationDate <= endDate;

      return serFilter && opFilter && userFilter && dateFilter;
    });

    /* console.log(filteredData); */
    const csvData = Papa.unparse({
      fields: ["Utilizador", "Operação", "Nº Série", "Data de alteração"],
      data: filteredData.map((allocation) => {
        return [
          allocation.users.name,
          allocation.action_type,
          allocation.assets === null
            ? allocation.inv_number
            : allocation.assets.numb_ser,
          allocation.allocation_date,
        ];
      }),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dwlMov.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  //------------For the Calendar---------------
  const handleSelect = () => {
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    };

    if (startDate > endDate) {
      setError(true);
      setErrorMsg("Intervalo de Datas inválido!");
      setAllocations([]);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    let filtered = allAllocations.filter((allocation) => {
      const allocationDate = new Date(allocation.allocation_date);
      allocationDate.setHours(0, 0, 0, 0);

      return (
        allocationDate >= selectionRange.startDate &&
        allocationDate <= selectionRange.endDate
      );
    });

    setAllocations(filtered);
    /*  console.log("startDate", selectionRange.startDate);
    console.log("endDate", selectionRange.endDate); */
    setError(false);
    setErrorMsg("");
  };

  //--------------Filters---------------
  const filterSer = (event) => {
    const filterValue = event.target.value;
    setSelectedSer(filterValue);
    if (!filterValue) {
      setAllocations(allAllocations);
    } else {
      const filteredAllocations = allAllocations.filter((allocation) => {
        return (
          allocation.assets !== null &&
          allocation.assets.numb_ser === filterValue
        );
      });

      setAllocations(filteredAllocations);
    }
  };

  /*---------------- Filter By operation ----------------*/
  const filterOp = (event) => {
    const filterValue = event.target.value;
    setSelectedOp(filterValue);
    if (!filterValue) {
      setAllocations(allAllocations);
    } else {
      const filteredAllocations = allAllocations.filter((allocation) => {
        return allocation.action_type === filterValue;
      });

      setAllocations(filteredAllocations);
    }
  };
  /*---------------- Filter By user ----------------*/
  const filterUser = (event) => {
    const filterValue = event.target.value;
    setSelectedUser(filterValue);
    if (!filterValue) {
      setAllocations(allAllocations);
    } else {
      const filteredAllocations = allAllocations.filter((allocation) => {
        return allocation.users.name === filterValue;
      });

      setAllocations(filteredAllocations);
    }
  };

  //-----------Button to reset the filter:----
  const resetFilter = () => {
    setAllocations(allAllocations);
    setSelectedSer("");
    setSelectedOp("");
    setSelectedUser("");
    setStartDate(null);
    setEndDate(null);

    setError(false);
    setErrorMsg("");
  };

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  return (
    <div id="content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="container-fluid"
      >
        <h1 className="title-page-all">Download de Ativos</h1>
      </div>
      {loading && <div className="caprr-re">A carregar...</div>}

      {!loading && (
        <div className="card animated fadeInDown">
          <p></p>
          <p className="camp-obs">*Campo Obrigatório</p>
          <p></p>
          <div className="headerFilter">
            <div className="data-allocations">
              <label className="lb-allo-dt">
                Data início:<label className="cmp-obg">*</label>
              </label>
              <input
                type="date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  if (isValidDate(selectedDate)) {
                    setStartDate(selectedDate);
                    handleSelect();
                  } else {
                    // Handle the error when an invalid date is selected
                    console.error("Data início inválida!");
                  }
                }}
                min="YYYY-MM-DD"
                max="YYYY-MM-DD"
                className="dt-inpt-allo"
              />

              <p></p>

              <label className="lb-allo-dt">
                Data fim:<label className="cmp-obg">*</label>
              </label>

              <input
                type="date"
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  if (isValidDate(selectedDate)) {
                    selectedDate.setHours(23, 59, 0, 0);
                    setEndDate(selectedDate);
                    handleSelect();
                  } else {
                    // Handle the error when an invalid date is selected
                    console.error("Data fim inválida!");
                  }
                }}
                min={startDate ? startDate.toISOString().split("T")[0] : ""}
                max="YYYY-MM-DD"
                className="dt-inpt-allo"
              />

              {error && startDate > endDate && (
                <p className="err-allo-dt">{errorMsg}</p>
              )}
            </div>

            <Filter
              assets={assets}
              users={users}
              filterSer={filterSer}
              resetFilter={resetFilter}
              selectedSer={selectedSer}
              filterOp={filterOp}
              selectedOp={selectedOp}
              filterUser={filterUser}
              selectedUser={selectedUser}
              handleDwl={downloadCSV}
            ></Filter>
          </div>
        </div>
      )}
    </div>
  );
}
