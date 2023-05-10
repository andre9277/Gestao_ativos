import React, { useState } from "react";

const ColumnMenuFilter = ({
  titulo,
  data,
  selectedAttribut,
  handleFunc,
  assets,
  setAssets,
}) => {
  let i = 0;

  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...assets].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setAssets(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...assets].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setAssets(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div>
      <span onClick={() => sorting({ titulo })}>{titulo}</span>
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
