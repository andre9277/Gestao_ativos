import React from "react";
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

  return (
    <tbody>
      {/* Iteration between all assets */}
      {assets
        .filter(
          (row) =>
            selectedCategory === "" || row.category.name === selectedCategory
        )
        .filter((row) => selectedFloor === "" || row.floor === selectedFloor)
        .filter(
          (row) => selectedBrand === "" || row.brand.name === selectedBrand
        )
        .filter(
          (row) =>
            selectedModel === "" || row.modelo.model_name === selectedModel
        )
        .map((a) => (
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
