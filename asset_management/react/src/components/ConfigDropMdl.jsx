import React from "react";

const ConfigDropMdl = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
  datas,
  tag,
  handleDel,
  brands, // Array of brands
  selectedBrand, // Currently selected brand
  handleBrandChange, // Function to handle brand selection
  maintb,
}) => {
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
        {/* Brand selection dropdown */}
        <label htmlFor="brandSelect" className="lb-cats">
          Selecione {maintb}:
        </label>

        <select
          id="brandSelect"
          name="brandSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="configSelect"
        >
          <option value=""></option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {/* End of Brand selection dropdown */}
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
        <button id="btnAddd" onClick={handleAdd}>
          Adicionar
        </button>
        <button id="btnRemove-rel" onClick={handleDel}>
          Remover
        </button>
      </form>
    </div>
  );
};

export default ConfigDropMdl;
