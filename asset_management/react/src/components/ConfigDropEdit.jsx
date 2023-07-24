import React from "react";

const ConfigDropEdit = ({
  Title,
  tag,
  datas,
  selectedData, // Data object that is currently selected for editing
  handleDataSelection, // Function to handle the selection of data for editing
  editedValue, // The edited value in the input field
  setEditedValue, // Function to update the edited value
  handleDataUpdate, // Function to handle the data update on the server
}) => {
  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={tag} className="lb-cats">
          Lista de {Title}:
        </label>
        <select
          id={tag}
          name={tag}
          multiple
          className="slc-cat"
          onChange={handleDataSelection} // Make sure the event handler is correctly set
        >
          {datas.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        {selectedData && (
          <div>
            <label htmlFor="editValue">Editar valor:</label>
            <input
              type="text"
              id="editValue"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
            <button onClick={() => handleDataUpdate}>Salvar</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ConfigDropEdit;
