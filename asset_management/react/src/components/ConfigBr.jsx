import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfigBr = ({
  Title,
  id,
  setData,
  setNewData,
  error,
  successMessage,
  rel1,
  selectedAttri,
  setSelectedAttri,
  array1,
  handleAdd,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    // Show the modal only if a category is selected
    if (selectedAttri) {
      setShowModal(true);
    } else {
      // Display an error message if no category is selected
      setError("Atenção! Necessita de selecionar um valor da Categoria.");
      clearErrorAfterTimeout(5000);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
    handleAdd(selectedAttri); // Trigger the handleAdd function with the selected category ID
    handleCloseModal(); // Close the modal after saving data
  };

  return (
    <div id="container-config">
      <form className="frm-cats">
        {/* Category*/}
        <label className="lb-cats">{rel1}:</label>
        <p></p>
        <label className="sub-title">Selecione um(a) {rel1}:</label>
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

        <label htmlFor={id} className="lb-cats">
          {Title}
        </label>
        <p></p>
        <label className="sub-title">
          Introduza o nome da(o) {Title} que deseja adicionar:
        </label>
        <div className="addLbBtn">
          <input
            type="text"
            value={setData}
            onChange={(e) => setNewData(e.target.value)}
            autoComplete="off"
            className="inpt-configs"
          />
          <button id="btnAdd" type="button" onClick={handleShowModal}>
            {/* Open the modal when the user clicks this button */}
            <i
              className="fa fa-plus fa-lg"
              aria-hidden="true"
              title="Adicionar"
            ></i>
          </button>
        </div>
        {error && <p className="alert">{error}</p>}
        {successMessage && <p className="good">{successMessage}</p>}
      </form>
      {/* The Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content inside the modal here */}
          {/* For example, you can display some information related to the Title */}
          <p> Tem a certeza que pretende adicionar a(o) {Title} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleFormSubmit(e)}>
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

export default ConfigBr;
