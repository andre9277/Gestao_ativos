import React from "react";

const ColumnMenuFilter = ({ titulo, data, selectedAttribut, handleFunc }) => {
  return (
    <>
      {titulo === "Piso" ? (
        <div>
          <span>{titulo}</span>
          <select
            className="filtAsset-tab"
            onChange={handleFunc}
            value={selectedAttribut}
          >
            <option value="">Valor</option>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      ) : (
        <div>
          <span>{titulo}</span>
          <select
            className="filtAsset-tab"
            onChange={handleFunc}
            value={selectedAttribut}
          >
            <option value="">Valor</option>
            {data.map((dat) => (
              <option key={dat.id} value={dat.name}>
                {" "}
                {dat.name === undefined ? dat.model_name : dat.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default ColumnMenuFilter;
