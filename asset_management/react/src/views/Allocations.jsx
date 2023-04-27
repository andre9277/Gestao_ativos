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
import PaginationLinks from "../components/PaginationLinks.jsx";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import Papa from "papaparse";
import { pt } from "date-fns/locale";
import Filter from "../components/Filter.jsx";

//SideBar:-------------Relatório---------------
export default function Allocations() {
  //returns all users (mount hook is called 2x)
  useEffect(() => {
    getAllocations();
    getAssets();
    getUsers();
  }, []);

  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allAllocations, setAllAllocations] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);

  const [selectedInv, setSelectedInv] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const onPageClick = (link) => {
    getAllocations(link.url);
  };

  //Realiza um request access client
  const getAllocations = (url) => {
    url = url || "/allocations";

    //enquanto não acaba o request, aplicamos o loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //quando obtemos um request, loading=false
        setLoading(false);
        console.log(data);
        setAllocations(data.data);
        setAllAllocations(data.data);
        setFilteredAllocations([]);
        /* console.log("dados Mov.:", data.data); */
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //Realiza um request access client
  const getAssets = (url) => {
    url = url || "/assets";

    axiosClient.get(url).then(({ data }) => {
      setAssets(data.data);
    });
  };

  const getUsers = (url) => {
    url = url || "/users";

    axiosClient.get(url).then(({ data }) => {
      setUsers(data.data);
    });
  };
  //Download of the current table displayed
  /*  const downloadCSV = () => {
    const csvData = Papa.unparse({
      fields: ["Utilizador", "Operação", "Nº Inventário", "Data de alteração"],
      data: allocations.map((allocation) => {
        return [
          allocation.users.name,
          allocation.action_type,
          allocation.assets === null
            ? allocation.inv_number
            : allocation.assets.numb_inv,
          allocation.allocation_date,
        ];
      }),
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "relatorioMov.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; */

  const downloadCSV = async () => {
    setLoading(true);

    const allData = [];

    for (let page = 1; page <= meta.last_page; page++) {
      const { data } = await axiosClient.get(`/allocations?page=${page}`);
      allData.push(...data.data);
    }

    const filteredData = allData.filter((allocation) => {
      const invFilter = selectedInv
        ? allocation.assets?.numb_inv === selectedInv
        : true;
      const opFilter = selectedOp
        ? allocation.action_type === selectedOp
        : true;
      const userFilter = selectedUser
        ? allocation.users.name === selectedUser
        : true;
      return invFilter && opFilter && userFilter;
    });

    setLoading(false);

    const csvData = Papa.unparse({
      fields: ["Utilizador", "Operação", "Nº Inventário", "Data de alteração"],
      data: filteredData.map((allocation) => {
        return [
          allocation.users.name,
          allocation.action_type,
          allocation.assets === null
            ? allocation.inv_number
            : allocation.assets.numb_inv,
          allocation.allocation_date,
        ];
      }),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "relatorioMov.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*  const downloadCSV = async () => {
    // Get all the data from the server
    const allData = await fetchAllData();
  
    // Filter the data based on the selected filters
    const filteredData = allData.filter((allocation) => {
      const invFilter = selectedInv ? allocation.assets?.numb_inv === selectedInv : true;
      const opFilter = selectedOp ? allocation.action_type === selectedOp : true;
      const userFilter = selectedUser ? allocation.users.name === selectedUser : true;
      return invFilter && opFilter && userFilter;
    });
  
    // Convert the filtered data to CSV
    const csvData = Papa.unparse({
      fields: ["Utilizador", "Operação", "Nº Inventário", "Data de alteração"],
      data: filteredData.map((allocation) => {
        return [
          allocation.users.name,
          allocation.action_type,
          allocation.assets === null
            ? allocation.inv_number
            : allocation.assets.numb_inv,
          allocation.allocation_date,
        ];
      }),
    }); */

  //For the calendar
  const handleSelect = (date) => {
    let filtered = allAllocations.filter((allocation) => {
      let allocationDate = new Date(allocation["allocation_date"]);

      return (
        allocationDate >= date.selection.startDate &&
        allocationDate <= date.selection.endDate
      );
    });
    //console.log("endDate:", date.selection.endDate);
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setAllocations(filtered);
  };
  //For the calendar range chosen by the user
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const filterInv = (event) => {
    const filterValue = event.target.value;
    setSelectedInv(filterValue);
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

  //Button to reset the filter:
  const resetFilter = () => {
    setAllocations(allAllocations);
  };

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
        <h1>Relatório</h1>
        <div className="tb-btn-user">
          <button onClick={downloadCSV} className="btn-dwl">
            Download CSV
          </button>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <div className="headerFilter">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            locale={pt}
            color={"#459c2c"}
            definedRanges={[]}
          />
          <Filter
            assets={assets}
            users={users}
            filterInv={filterInv}
            resetFilter={resetFilter}
            selectedInv={selectedInv}
            filterOp={filterOp}
            selectedOp={selectedOp}
            filterUser={filterUser}
            selectedUser={selectedUser}
          ></Filter>
        </div>
        <table>
          <thead>
            <tr>
              <th>Utilizador</th>
              <th>Operação</th>
              <th>Nº Inventário</th>
              <th>Data de Alteração</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            )}

            {!loading &&
              (filteredAllocations.length > 0
                ? filteredAllocations.map((allocation, index) => {
                    let date = new Date(allocation["allocation_date"]);
                    return (
                      <tr key={`${allocation.user_id}-${index}`}>
                        <td>{allocation.users.name}</td>
                        <td>{allocation.action_type}</td>
                        <td>
                          {allocation.assets === null
                            ? allocation.inv_number
                            : allocation.assets.numb_inv}
                        </td>
                        {/* <td>{allocation.allocation_date}</td> */}
                        <td>{date.toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                : allocations.map((allocation, index) => {
                    let date = new Date(allocation["allocation_date"]);
                    return (
                      <tr key={`${allocation.user_id}-${index}`}>
                        <td>{allocation.users.name}</td>
                        <td>{allocation.action_type}</td>
                        <td>
                          {allocation.assets === null
                            ? allocation.inv_number
                            : allocation.assets.numb_inv}
                        </td>
                        {/* <td>{allocation.allocation_date}</td> */}
                        <td>{date.toLocaleDateString()}</td>
                      </tr>
                    );
                  }))}
          </tbody>
        </table>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
}
