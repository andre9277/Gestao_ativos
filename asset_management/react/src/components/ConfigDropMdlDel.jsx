import React from "react";

const ConfigDropMdlDel = ({
  Title,
  id,
  datas,
  tag,
  handleDel,
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default ConfigDropMdlDel;
