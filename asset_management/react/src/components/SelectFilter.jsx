import React from "react";

const SelectFilter = ({ data, handleFunc, selectedF, title }) => {
  let i = 0;
  return (
    <div>
      {" "}
      <label className="titleFiltAsset">{title}</label>
      <select className="filtAsset-tab" onChange={handleFunc} value={selectedF}>
        <option value="">Selecione</option>
        {data.map((dat) => (
          <option key={`${dat}+${i++}`} value={dat.name}>
            {dat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
