import React, { useState } from "react";

const ColumnMenuFilter = ({
  titulo,
  data,
  selectedAttribut,
  handleFunc,
  sorting,
  order,
}) => {
  let i = 0;

  const handleSort = () => {
    sorting(titulo);
  };

  return (
    <div>
      <span onClick={handleSort}>
        {titulo}
        {order === "ASC" ? " ▲" : " ▼"}{" "}
      </span>
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
