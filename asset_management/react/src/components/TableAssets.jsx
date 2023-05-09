import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

const TableAssets = ({
  assets,
  toggleCheck,
  selectedCategory,
  selectedFloor,
  selectedBrand,
  selectedModel,
  meta,
}) => {
  const { user } = useStateContext();

  //keeps checking if there is a filter on or off:
  const [filtered, setFiltered] = useState(false);
  //For the all the asset data:
  const [allData, setAllData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasFilter =
      selectedCategory !== "" ||
      selectedFloor !== "" ||
      selectedBrand !== "" ||
      selectedModel !== "";

    setFiltered(hasFilter);
    //if hasFilter = true then it gets all the assets from all the pages:
    if (hasFilter) {
      const fetchData = async () => {
        const result = [];
        setLoading(true);
        for (let page = 1; page <= meta.last_page; page++) {
          const { data } = await axiosClient.get(`/assets?page=${page}`);
          result.push(...data.data);
          setLoading(false);
        }
        setAllData(result);
      };
      fetchData();
    }
  }, [selectedCategory, selectedFloor, selectedBrand, selectedModel, meta]);

  //use allData when filtered = true and when its false its equal to the assets object
  const filteredAssets = filtered
    ? allData.filter(
        (row) =>
          (selectedCategory === "" || row.category.name === selectedCategory) &&
          (selectedFloor === "" || row.floor === selectedFloor) &&
          (selectedBrand === "" || row.brand.sig === selectedBrand) &&
          (selectedModel === "" || row.modelo.model_name === selectedModel)
      )
    : assets;

  return (
    <tbody>
      {/* Iteration between all assets */}
      {loading && (
        <tr>
          <td colSpan="5" className="lgText">
            Carregando...
          </td>
        </tr>
      )}

      {!loading && filteredAssets.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan="5" className="lgText">
              Não existem resultados para os filtros selecionados!
            </td>
          </tr>
        </tbody>
      ) : (
        !loading &&
        filteredAssets.map((a) => (
          <tr key={a.id}>
            {/*  {console.log(filteredAssets)} */}
            <td>{a.category.name}</td>
            <td>{a.brand.sig}</td>
            <td>{a.modelo.model_name}</td>
            <td>{a.numb_inv}</td>
            <td>{a.numb_ser}</td>
            <td>{a.entity.ent_name}</td>
            <td>{a.units === null ? "" : a.units.name}</td>
            <td>{a.floor}</td>
            <td>{a.ala}</td>
            <td>{a.ci}</td>
            <td>
              {a.state === "Ativo" ? (
                <div className="circle active"></div>
              ) : (
                <div className="circle inactive"></div>
              )}
            </td>
            <td>{a.created_at}</td>

            {user.role_id === 3 ? null : (
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleCheck(a.id)}
                  value={a.checked}
                />
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableAssets;
