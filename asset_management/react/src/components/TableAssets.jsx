import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";

const TableAssets = ({
  assets,
  toggleCheck,
  selectedCategory,
  selectedFloor,
  selectedBrand,
  selectedModel,
}) => {
  const { user } = useStateContext();
  //aqui.........
  const [filteredAssets, setFilteredAssets] = useState(assets);

  useEffect(() => {
    const filtered = assets.filter(
      (row) =>
        (selectedCategory === "" || row.category.name === selectedCategory) &&
        (selectedFloor === "" || row.floor === selectedFloor) &&
        (selectedBrand === "" || row.brand.name === selectedBrand) &&
        (selectedModel === "" || row.modelo.model_name === selectedModel)
    );
    setFilteredAssets(filtered);
  }, [assets, selectedCategory, selectedFloor, selectedBrand, selectedModel]);

  return (
    <tbody>
      {console.log(filteredAssets)}
      {/* Iteration between all assets */}
      {filteredAssets.map((a) => (
        <tr key={a.id}>
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
      ))}
    </tbody>
  );
};

export default TableAssets;
