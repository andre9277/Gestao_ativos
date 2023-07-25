import React from "react";

const ConfigDropMdlAdd = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
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
        <p></p>
        <label className="sub-title">
          {" "}
          Introduza o nome da(o) {Title} que deseja adicionar:
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

        <button id="btnAddd" onClick={handleAdd}>
          <i
            className="fa fa-plus fa-lg"
            aria-hidden="true"
            title="Adicionar"
          ></i>
        </button>
      </form>
    </div>
  );
};

export default ConfigDropMdlAdd;
