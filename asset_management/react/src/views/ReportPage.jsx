import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import Papa from "papaparse";

//SideBar:-------------Movimentação de ativos---------------
const ReportPage = () => {
  useEffect(() => {
    getAssets();
    getAllocations();
    getUnits();
  }, []);

  const [assets, setAssets] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);

  const getAssets = (url) => {
    url = url || "/assets";

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

  const getAllocations = (url) => {
    url = url || "/allocations";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setAllocations(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getUnits = (url) => {
    url = url || "/units";

    axiosClient.get(url).then(({ data }) => {
      setUnits(data);
    });
  };

  /*   const getAllocationData = async (assetId) => {
    const allocation = allocations.find((a) => a.asset.id === assetId);
    if (!allocation) {
      return {
        user: "",
        date: "",
        previousUnitName: "",
      };
    } else {
      const { data } = await axiosClient.get(
        `/assets/${assetId}/previous-unit-name`
      );
      return {
        user: allocation.user.name,
        date: allocation.allocation_date,
        previousUnitName: data.unit_name,
      };
    }
  }; */
  const getAllocationData = (assetId) => {
    const allocation = allocations.find((a) => a.assets.id === assetId);
    //console.log("Aqui all:", allocation);
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

  const downloadCSV = () => {
    const csvData = Papa.unparse({
      fields: [
        "Nº Inventário",
        "CI(Anterior)",
        "CI(Atual)",
        "Unidade(Anterior)",
        "Entidade(Anterior)",
        "Local Atual",
        "Utilizador",
        "Movido em",
      ],
      data: assets.map((asset) => {
        const allocationData = getAllocationData(asset.id);
        return [
          asset.numb_inv,
          asset.previous_ci,
          asset.ci,
          asset.previous_unit_id,
          asset.previous_ent_id,
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
    link.setAttribute("download", "relatorio.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="tb-user">
        <h1>Movimentação de ativos</h1>
        <div className="tb-btn-user">
          <button onClick={downloadCSV} className="btn-dwl">
            Download CSV
          </button>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Nº Inventário</th>
              <th>CI(Anterior)</th>
              <th>CI(Atual)</th>
              <th>Unidade(Anterior)</th>
              <th>Entidade(Anterior)</th>
              <th>Local Atual</th>
              <th>Utilizador</th>
              <th>Movido em</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}

          {!loading && (
            <tbody>
              {assets.map((asset, index) => {
                const allocationData = getAllocationData(asset.id);
                return (
                  <tr key={`${asset.id}-${index}`}>
                    <td>{asset.numb_inv}</td>
                    <td>{asset.previous_ci}</td>
                    <td>{asset.ci}</td>

                    <td>
                      {asset.previous_unit_id === null
                        ? " "
                        : asset.previous_unit_id}
                    </td>
                    <td>
                      {asset.previous_ent_id === null
                        ? ""
                        : asset.previous_ent_id}
                    </td>
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
      </div>
    </div>
  );
};

export default ReportPage;
