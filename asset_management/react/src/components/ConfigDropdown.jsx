import React from "react";

const ConfigDropdown = ({ Title, datas, tag }) => {
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
      </form>
    </div>
  );
};

export default ConfigDropdown;
