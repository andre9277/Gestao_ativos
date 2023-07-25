import React from "react";
import "../styles/Config.css";

const ConfigDropEdit = ({
  Title,
  tag,
  datas,
  selectedData, // Data object that is currently selected for editing
  handleDataSelection, // Function to handle the selection of data for editing
  editedValue, // The edited value in the input field
  setEditedValue, // Function to update the edited value
  handleDataUpdate, // Function to handle the data update on the server
  error,
  successMessage,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleDataUpdate(); // Call the handleDataUpdate function on form submission
  };

  return (
    <div id="container-config">
      <form className="frm-cats-edit" onSubmit={handleSubmit}>
        <label htmlFor={tag} className="lb-cats">
          Lista de {Title}:
        </label>
        <p></p>
        <label className="sub-title">
          Selecione um(a) {Title} para editar:
        </label>
        <select
          id={tag}
          name={tag}
          multiple
          className="slc-cat"
          onChange={handleDataSelection}
        >
          {datas.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        {selectedData && (
          <div>
            <label htmlFor="editValue" className="lb-cats-edit">
              Editar valor:
            </label>
            <div className="addLbBtn">
              <input
                type="text"
                id="editValue"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="slc-cat-edit"
              />
              <button type="submit" id="btnAdd">
                <i
                  className="fa fa-plus fa-lg"
                  aria-hidden="true"
                  title="Adicionar"
                ></i>
              </button>
            </div>
          </div>
        )}
      </form>
      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}
    </div>
  );
};

export default ConfigDropEdit;
