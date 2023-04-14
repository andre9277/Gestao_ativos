import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

const ReportPage = () => {
  useEffect(() => {
    getAssets();
    getAllocations();
  }, []);

  const [assets, setAssets] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getAllocationData = (assetId) => {
    const allocation = allocations.find((a) => a.assets.id === assetId);
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

  return (
    <div>
      <div className="tb-user">
        <h1>Relatórios</h1>
        <div className="tb-btn-user">
          <button className="btn-add">Download</button>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Ativo</th>
              <th>Local Anterior</th>
              <th>Local Atual</th>
              <th>Utilizador</th>
              <th>Movido em</th>
              <th></th>
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
                    <td>{asset.id}</td>
                    <td>{}</td>
                    <td>
                      {asset.units === null
                        ? asset.entity.ent_name
                        : asset.units.name}
                    </td>
                    <td>{allocationData.user}</td>
                    <td>{allocationData.date}</td>
                    <td></td>
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
