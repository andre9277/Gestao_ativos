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
  handleUpdateRelation,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    // You may also consider resetting the editedRelation here to ensure it doesn't show outdated data
  };

  return (
    <div id="container-config-rel-edit">
      <div className="tlt-cats-edit">
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
                onClick={handleUpdateRelation}
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
            <form>
              {console.log("editedRelation", editedRelation)}
              <label className="mdl-cats-brds">
                Categoria:
                <select
                  value={editedRelation.category_id}
                  onChange={(e) =>
                    setEditedRelation({
                      ...editedRelation,
                      category_id: e.target.value,
                    })
                  }
                  className="slc-cats-brds"
                >
                  <option value="">Select a category</option>
                  {array1.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mdl-cats-brds">
                Marca:
                <select
                  value={editedRelation.brand_id}
                  onChange={(e) =>
                    setEditedRelation({
                      ...editedRelation,
                      brand_id: e.target.value,
                    })
                  }
                  className="slc-cats-brds"
                >
                  <option value="">Select a brand</option>
                  {array2.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRelationConfig;
