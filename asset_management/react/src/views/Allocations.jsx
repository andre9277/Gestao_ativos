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

  //to handle the error of Data input
  const [showError, setShowError] = useState(false);

  //to handle loading of the table
  const [loading, setLoading] = useState(false);
  //
  const [allocations, setAllocations] = useState([]);

  //Input of the startDate and EndDate
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //All allocations
  const [allAllocations, setAllAllocations] = useState([]);

  //All assets
  const [assets, setAssets] = useState([]);

  //All users
  const [users, setUsers] = useState([]);

  const [selectedSer, setSelectedSer] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Monitor changes in startDate and endDate to check for invalid date range
    if (startDate && endDate && startDate > endDate) {
      setError(true);
      setErrorMsg("Intervalo de Datas inválido!");
    } else {
      setError(false);
      setErrorMsg("");
    }
  }, [startDate, endDate]);

  //Performs a client access request
  const getAllocations = (signal, url) => {
    setLoading(true);
    url = url || "/allocations";

    axiosClient
      .get(url, { signal })
      .then(({ data }) => {
        setAllocations(data.data);
        setAllAllocations(data.data);
        /* console.log("Mov. data.:", data.data); */
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

  //Function to download CSV file according to filter selected by the user
  const downloadCSV = async () => {
    //Loading close
    setLoading(true);

    //array to store all data filtered
    const allData = [];

    //Gets all allocation with no pagination
    const { data } = await axiosClient.get("/allocationAll");
    allData.push(...data.data);

    //Filters the data by the filters selected by the user
    const filteredData = allData.filter((allocation) => {
      const allocationDate = new Date(allocation.allocation_date);

      //Filter of inventory number
      const serFilter = selectedSer
        ? allocation.assets?.numb_inv === selectedSer
        : true;

      //Filter of action/operation
      const opFilter = selectedOp
        ? allocation.action_type === selectedOp
        : true;

      //Filter by the user name
      const userFilter = selectedUser
        ? allocation.users.name === selectedUser
        : true;

      //Filter by the data (start and end)
      const dateFilter =
        allocationDate >= startDate && allocationDate <= endDate;

      return serFilter && opFilter && userFilter && dateFilter;
    });

    //Message to display an error message, it must have the startDate and endDate
    if (!startDate || !endDate) {
      const message = "Atenção! Selecione uma data início e data fim!";
      setMessage(message);
      setLoading(false);
      return;
    }

    //Header and data of the download file
    const csvData = Papa.unparse({
      fields: [
        "Utilizador",
        "Operação",
        "Nº Inventário",
        "Motivo",
        "Data de alteração",
      ],

      data: filteredData.map((allocation) => {
        console.log("allocationn:", allocation);
        return [
          allocation.user_id,
          allocation.action_type,
          allocation.assets === null
            ? allocation.inv_number
            : allocation.assets.numb_inv,
          allocation.reason,
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

  //Message to display the error message of the data select options
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  //------------For the Calendar---------------
  //handles the select of the start and end Date of the user
  const handleSelect = () => {
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    };

    //Checks if startDate is higher than the endDate
    if (startDate && endDate && startDate > endDate) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      //Filter allAllocations
      let filtered = allAllocations.filter((allocation) => {
        const allocationDate = new Date(allocation.allocation_date);
        allocationDate.setHours(0, 0, 0, 0);

        return (
          allocationDate >= selectionRange.startDate &&
          allocationDate <= selectionRange.endDate
        );
      });

      setAllocations(filtered);

      setError(false);
      //error message set to empty
      setErrorMsg("");
    }
  };

  //--------------Filters---------------
  //Handles the filters the inventory number
  const filterSer = (event) => {
    const filterValue = event.target.value;
    setSelectedSer(filterValue);
    if (!filterValue) {
      setAllocations(allAllocations);
    } else {
      const filteredAllocations = allAllocations.filter((allocation) => {
        return (
          allocation.assets !== null &&
          allocation.assets.numb_inv === filterValue
        );
      });

      setAllocations(filteredAllocations);
    }
  };

  /*---------------- Filter By operation ----------------*/
  //Handles the filters the inventory number
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

  //checks if the date values are of type date
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
        <h1 className="title-page-all">Relatório de Ativos</h1>
      </div>
      {loading && <div className="caprr-re">A carregar...</div>}

      {!loading && (
        <div className="card animated fadeInDown">
          {message && <div className="alert">{message}</div>}
          <p></p>
          <p className="camp-obs">*Campo Obrigatório</p>
          <p></p>
          <div className="headerFilter">
            <div className="data-allocations">
              <h2 className="subTit">Data:</h2>
              <p></p>
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
                    setErrorMsg("Data início inválida!");
                  }
                }}
                min="YYYY-MM-DD"
                max="YYYY-MM-DD"
                className="dt-inpt-allo"
                onKeyDown={(e) => e.preventDefault()}
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
                    setErrorMsg("Data fim inválida!");
                  }
                }}
                min={startDate ? startDate.toISOString().split("T")[0] : ""}
                max="YYYY-MM-DD"
                className="dt-inpt-allo"
                onKeyDown={(e) => e.preventDefault()}
              />

              {error && startDate > endDate && (
                <p className="alert">{errorMsg}</p>
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
