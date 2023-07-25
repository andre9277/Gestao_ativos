import React from "react";

const ConfigDropAdd = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
  error,
  successMessage,
}) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={id} className="lb-cats">
          {Title}
        </label>
        <p></p>
        <label className="sub-title">
          Introduza o nome da(o) {Title} que deseja adicionar:
        </label>
        <div className="addLbBtn">
          <input
            type="text"
            value={setData}
            onChange={(e) => setNewData(e.target.value)}
            autoComplete="off"
            className="inpt-configs"
          />
          <button id="btnAdd" onClick={handleAdd}>
            <i
              className="fa fa-plus fa-lg"
              aria-hidden="true"
              title="Adicionar"
            ></i>
          </button>
        </div>
      </form>
      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}
    </div>
  );
};

export default ConfigDropAdd;
