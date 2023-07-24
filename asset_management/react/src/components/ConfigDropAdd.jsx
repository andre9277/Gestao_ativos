import React from "react";

const ConfigDropAdd = ({ Title, id, setData, setNewData, handleAdd }) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={id} className="lb-cats">
          {Title}
        </label>
        <input
          type="text"
          value={setData}
          onChange={(e) => setNewData(e.target.value)}
          autoComplete="off"
        />
        <button id="btnAdd" onClick={handleAdd}>
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default ConfigDropAdd;
