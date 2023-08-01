import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddRelationConfig = ({
  rel1,
  rel2,
  selectedAttri,
  setSelectedAttri,
  array1,
  selectedAttriSec,
  setSelectedAttriSec,
  array2,
  handleShowModal,
  error,
  successMessage,
  showModal,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <div id="container-config">
      <form>
        <h4 className="titleconfig">
          Adicionar relação {rel1}/{rel2}:
        </h4>

        {/* Category*/}
        <label className="configlb">{rel1}:</label>
        <select
          name="category"
          id="category"
          value={selectedAttri}
          className="configSelect"
          onChange={(e) => setSelectedAttri(e.target.value)}
        >
          <option value=""></option>
          {array1.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Brand*/}
        <label className="configlb">Marca:</label>
        <select
          name="brand"
          id="brand"
          value={selectedAttriSec}
          className="configSelect"
          onChange={(e) => setSelectedAttriSec(e.target.value)}
        >
          <option value=""></option>
          {array2.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <button type="button" className="addConfig" onClick={handleShowModal}>
          <i
            className="fa fa-plus fa-lg"
            aria-hidden="true"
            title="Adicionar"
          ></i>
        </button>
      </form>

      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            Tem a certeza que pretende adicionar {rel1}/{rel2}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
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

export default AddRelationConfig;
