import React from "react";

const ColumnMenuFilter = ({ titulo, data, selectedAttribut, handleFunc }) => {
  let i = 0;
  return (
    <div>
      <span>{titulo}</span>
      <select
        className="filtAsset-tab"
        onChange={handleFunc}
        value={selectedAttribut}
      >
        <option value=""></option>
        {data.map((dat) => (
          <option key={`${dat}+${i++}`} value={dat.name}>
            {dat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColumnMenuFilter;
