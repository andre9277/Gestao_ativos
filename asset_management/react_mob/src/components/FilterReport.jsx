import React from "react";
import "../styles/styles.css";

const FilterReport = ({ data, handleFunc, selectedAtt }) => {
  return (
    <div>
      <span>Categoria</span>
      <select
        className="filtAsset-tab"
        onChange={handleFunc}
        value={selectedAtt}
      >
        <option value="">Selecione</option>
        {data.map((dat) => (
          <option key={dat.id} value={dat.name}>
            {dat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterReport;
