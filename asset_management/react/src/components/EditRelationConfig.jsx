import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditRelationConfig = ({
  rel1,
  rel2,
  handleEditRelation,
  selectedRelationId,
  relations,
  array1,
  array2,
  editedRelation,
  setEditedRelation,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    // You may also consider resetting the editedRelation here to ensure it doesn't show outdated data
  };

  const handleStartEdit = () => {
    const selectedRelation = relations.find(
      (relation) => relation.id === selectedValue
    );
    if (selectedRelation) {
      setEditedRelation(selectedRelation);
      handleEditRelation(selectedRelation); // Pass the selected relation for editing directly to the parent component
    }
  };

  return (
    <div id="container-config-rel-edit">
      <div className="tlt-cats-edit">
        {/* Edit button */}
        <p className="rel-cat">
          {rel1}/{rel2}
        </p>
      </div>

      <p className="sidebar-divider"> </p>
      {/* List of relations */}
      <div id="container-config-rel" className="relations-container">
        <p></p>
        <label htmlFor={"selected-value"} className="lb-cats">
          Lista de {rel1} - {rel2}:
        </label>
        <select
          id={"selected-value"}
          name={"selected-value"}
          className="slc-cat"
          onChange={handleSelect}
          value={selectedValue}
          multiple
        >
          {relations.map((relation) => (
            <option key={relation.id} value={relation.id}>
              {`${
                array1.find((cat) => cat.id === relation.category_id)?.name ||
                "Categoria desconhecida"
              } - ${
                array2.find((brand) => brand.id === relation.brand_id)?.name ||
                "Marca desconhecida"
              }`}
            </option>
          ))}
        </select>

        {selectedValue.length !== 0 && (
          <div>
            <label htmlFor="selected-value" className="lb-cats">
              Editar valor:
            </label>
            <div className="brd-cat-delete">
              <p id="selected-value">{selectedValue}</p>
              <button
                onClick={handleStartEdit} // Now, this button triggers the editing directly without the modal
                disabled={!selectedRelationId}
                className="edit-btn-rel"
              >
                <i
                  className="fa fa-pencil-alt fa-lg"
                  aria-hidden="true"
                  title="Editar"
                ></i>
              </button>
            </div>
          </div>
        )}

        {/* Conditionally render the form fields for editing */}
        {selectedValue.length !== 0 && editedRelation && (
          <div>
            <label htmlFor="category-select" className="lb-cats">
              Editar categoria:
            </label>
            <select
              id="category-select"
              value={editedRelation.category_id}
              onChange={(e) =>
                setEditedRelation({
                  ...editedRelation,
                  category_id: e.target.value,
                })
              }
              className="slc-cats-brds"
            >
              {array1.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="brand-select" className="lb-cats">
              Editar marca:
            </label>
            <select
              id="brand-select"
              value={editedRelation.brand_id}
              onChange={(e) =>
                setEditedRelation({
                  ...editedRelation,
                  brand_id: e.target.value,
                })
              }
              className="slc-cats-brds"
            >
              {/* Options for brands */}
              {array2.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRelationConfig;
