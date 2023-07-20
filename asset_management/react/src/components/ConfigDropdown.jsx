import React from "react";

const ConfigDropdown = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
  datas,
  tag,
  handleDel,
}) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={id}>{Title}</label>
        <input
          type="text"
          value={setData}
          onChange={(e) => setNewData(e.target.value)}
          autoComplete="off"
        />
        <button id="btnAdd" onClick={handleAdd}>
          Adicionar
        </button>

        <label htmlFor={tag}>Lista de {id}:</label>
        <select id={tag} name={tag} multiple>
          {datas.map((data) => (
            <option key={data.name} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>

        <button id="btnRemove" onClick={handleDel}>
          Remover {id} selecionada
        </button>
      </form>
    </div>
  );
};

export default ConfigDropdown;
