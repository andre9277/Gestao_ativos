import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditRelationConfig = ({
  rel1,
  rel2,
  handleEditRelation,
  selectedRelationId,
  relations,
  handleCheckbox,
  array1,
  array2,
  editedRelation,
  showModal,
  handleCloseModal,
  setEditedRelation,
  handleUpdateRelation,
}) => {
  return (
    <div id="container-config-rel-edit">
      <div className="tlt-cats-edit">
        {/* Edit button */}
        <p className="rel-cat">
          {rel1}/{rel2}
        </p>
        <button
          onClick={handleEditRelation}
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

      <p className="sidebar-divider"> </p>
      {/* List of relations */}
      <ul className="relations-list">
        {relations.map((relation) => (
          <li key={relation.id}>
            <label className="lbs-cats-brs">
              <input
                type="checkbox"
                checked={selectedRelationId === relation.id}
                onChange={(e) => handleCheckbox(e, relation.id)}
                className="check-cats-br"
              />
              {/* Your relation display */}
              {`${
                array1.find((cat) => cat.id === relation.category_id)?.name ||
                "Categoria desconhecida"
              } - ${
                array2.find((brand) => brand.id === relation.brand_id)?.name ||
                "Marca desconhecida"
              }`}
            </label>
          </li>
        ))}
      </ul>

      {/* Modal for editing the selected relation */}
      {editedRelation && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Relação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
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
                  {/* Options for brands */}
                  {array2.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUpdateRelation}>
              Atualizar
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EditRelationConfig;
