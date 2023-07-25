import React from "react";

const ConfigDropdown = ({
  Title,
  id,
  error,
  successMessage,
  datas,
  tag,
  handleDel,
}) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={tag} className="lb-cats">
          Lista de {Title}:
        </label>
        <select id={tag} name={tag} multiple className="slc-cat">
          {datas.map((data) => (
            <option key={data.name} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>

        <button id="btnRemove" onClick={handleDel}>
          <i
            className="fa fa-trash fa-lg"
            aria-hidden="true"
            title="Apagar"
          ></i>
        </button>
      </form>
      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}
    </div>
  );
};

export default ConfigDropdown;
