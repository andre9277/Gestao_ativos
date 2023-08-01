import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteRelationConfig = ({
  rel1,
  rel2,
  handleShowModal,
  relations,
  selectedRelations,
  handleCheckbox,
  array1,
  array2,
  error,
  successMessage,
  showModal,
  handleCloseModal,
  handleRemoveSelectedRelations,
}) => {
  return (
    <div id="container-config">
      <form>
        <p></p>
        {/* List of relations */}
        <div id="container-config-rel" className="relations-container">
          <div className="tlt-cats-del">
            <p className="rel-cat">{rel1}</p>
            <p className="rel-cat">-</p>
            <p className="rel-cat">{rel2}</p>
            <button
              type="button"
              onClick={handleShowModal}
              className="btn-rel-br"
            >
              <i
                className="fa fa-trash fa-lg"
                aria-hidden="true"
                title="Apagar"
              ></i>
            </button>
          </div>
          <p></p>
          <ul className="relations-list">
            {relations.map((relation) => (
              <li key={relation.id}>
                <label className="lbs-cats-brs">
                  <input
                    type="checkbox"
                    checked={selectedRelations.includes(relation.id)}
                    onChange={(e) => handleCheckbox(e, relation.id)}
                    className="check-cats-br"
                  />
                  {`${
                    array1.find((cat) => cat.id === relation.category_id)
                      ?.name || "Categoria desconhecida"
                  } - ${
                    array2.find((brand) => brand.id === relation.brand_id)
                      ?.name || "Marca desconhecida"
                  }`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </form>
      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Tem a certeza que pretende eliminar Categoria/Marca?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => handleRemoveSelectedRelations(e)}
          >
            Confirmar
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteRelationConfig;
