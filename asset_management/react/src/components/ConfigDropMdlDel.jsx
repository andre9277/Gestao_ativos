import React from "react";

const ConfigDropMdlDel = ({ Title, id, datas, tag, handleDel }) => {
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
        <button id="btnRemove-rel" onClick={handleDel}>
          Remover
        </button>
      </form>
    </div>
  );
};

export default ConfigDropMdlDel;
